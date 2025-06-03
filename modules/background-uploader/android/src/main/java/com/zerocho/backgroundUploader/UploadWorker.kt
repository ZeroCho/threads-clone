package com.zerocho.backgroundUploader

import android.content.Context
import android.util.Log
import expo.modules.kotlin.modules.Module.*
import androidx.work.Worker
import androidx.work.WorkerParameters
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import org.json.JSONArray
import java.io.File
import java.io.IOException
import android.content.Intent

class UploadWorker(appContext: Context, workerParams: WorkerParameters) :
    Worker(appContext, workerParams) {

    private val client = OkHttpClient()

    override fun doWork(): Result {
        val threadId = inputData.getString("threadId") ?: return Result.failure()
        val text = inputData.getString("text") ?: ""
        val hashtag = inputData.getString("hashtag") ?: ""
        val latitude = inputData.getDouble("latitude", Double.NaN)
        val longitude = inputData.getDouble("longitude", Double.NaN)
        val filePathsJson = inputData.getString("filePaths") ?: return Result.failure()

        val filePaths = try {
            JSONArray(filePathsJson)
        } catch (e: Exception) {
            Log.e("UploadWorker", "Invalid filePaths JSON", e)
            return Result.failure()
        }

        val requestBodyBuilder = MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("threadId", threadId)
            .addFormDataPart("text", text)
            .addFormDataPart("hashtag", hashtag)

        if (!latitude.isNaN() && !longitude.isNaN()) {
            requestBodyBuilder.addFormDataPart("latitude", latitude.toString())
            requestBodyBuilder.addFormDataPart("longitude", longitude.toString())
        }

        for (i in 0 until filePaths.length()) {
            val rawPath = filePaths.optString(i)
            val path = rawPath.removePrefix("file://")
            val file = File(path)
            if (!file.exists()) {
                Log.e("UploadWorker", "File does not exist: $path")
                continue
            }

            val mediaType = guessMimeType(path)?.toMediaType() ?: "application/octet-stream".toMediaType()
            requestBodyBuilder.addFormDataPart(
                "files",  // Note: Use "files" or server-side expected name
                file.name,
                RequestBody.create(mediaType, file)
            )

            Log.d("UploadWorker", "Prepared file for upload: $path")
        }

        val requestBody = requestBodyBuilder.build()

        val request = Request.Builder()
            .url("https://threads.zerocho.com")  // Replace with actual upload endpoint
            .post(requestBody)
            .build()

        return try {
            val response = client.newCall(request).execute()
            if (response.isSuccessful) {
                sendUploadEvent(true, threadId)
                Log.d("UploadWorker", "Upload successful for thread: $threadId")
                Result.success()
            } else {
                sendUploadEvent(false, threadId)
                Log.e("UploadWorker", "Upload failed: ${response.code}")
                Result.retry()
            }
        } catch (e: IOException) {
            sendUploadEvent(false, threadId)
            Log.e("UploadWorker", "Upload error", e)
            Result.retry()
        }
    }

    private fun guessMimeType(path: String): String? {
        return when {
            path.endsWith(".jpg", true) || path.endsWith(".jpeg", true) -> "image/jpeg"
            path.endsWith(".png", true) -> "image/png"
            path.endsWith(".gif", true) -> "image/gif"
            path.endsWith(".mp4", true) -> "video/mp4"
            else -> null
        }
    }

    private fun sendUploadEvent(
        success: Boolean,
        threadId: String,
    ) {
        val intent = Intent("com.zerocho.backgroundUploader.UPLOAD_FINISHED").apply {
            setPackage(applicationContext.packageName)
            putExtra("success", success)
            putExtra("threadId", threadId)
        }
        applicationContext.sendBroadcast(intent)
    }
}