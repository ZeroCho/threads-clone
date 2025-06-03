package com.zerocho.backgroundUploader

import androidx.work.*
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONArray
import org.json.JSONObject
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.util.Log

class BackgroundUploaderModule : Module() {
  private var receiverRegistered = false

  override fun definition() = ModuleDefinition {
    Name("BackgroundUploader")

    Function("startUpload") { threadsJson: String ->
      val context = appContext.reactContext ?: return@Function

      val threads = parseThreads(threadsJson)
      if (!receiverRegistered) {
        val filter = IntentFilter("com.zerocho.backgroundUploader.UPLOAD_FINISHED")
        context.registerReceiver(eventReceiver, filter)
        receiverRegistered = true
      }

      for (thread in threads) {
        val imageArray = JSONArray()
        for (imagePath in thread.imageUrls) {
          imageArray.put(imagePath)
        }

        val data = workDataOf(
          "threadId" to thread.id,
          "text" to thread.text,
          "hashtag" to thread.hashtag,
          "latitude" to thread.location?.first,
          "longitude" to thread.location?.second,
          "filePaths" to imageArray.toString()
        )

        val uploadWork = OneTimeWorkRequestBuilder<UploadWorker>()
          .setInputData(data)
          .build()

        WorkManager.getInstance(context).enqueue(uploadWork)
      }
    }
  }

  private fun parseThreads(jsonStr: String): List<ThreadData> {
    val jsonArray = JSONArray(jsonStr)
    val threads = mutableListOf<ThreadData>()

    for (i in 0 until jsonArray.length()) {
      val obj = jsonArray.getJSONObject(i)

      val id = obj.getString("id")
      val text = obj.getString("text")
      val hashtag = if (obj.has("hashtag")) obj.getString("hashtag") else null

      val location = if (obj.has("location")) {
        val locArray = obj.getJSONArray("location")
        Pair(locArray.getDouble(0), locArray.getDouble(1))
      } else {
        null
      }

      val imageUrls = mutableListOf<String>()
      val imagesArray = obj.getJSONArray("imageUrls")
      for (j in 0 until imagesArray.length()) {
        imageUrls.add(imagesArray.getString(j))
      }

      threads.add(ThreadData(id, text, hashtag, location, imageUrls))
    }

    return threads
  }

  private val eventReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      if (intent?.action == "com.zerocho.backgroundUploader.UPLOAD_FINISHED") {
        val success = intent.getBooleanExtra("success", false)
        val threadId = intent.getStringExtra("threadId") ?: ""
        Log.i("success?", "threadId: $threadId = $success")
        sendEvent("uploadFinished", mapOf(
          "success" to success,
          "threadId" to threadId,
        ))
      }
    }
  }
}

data class ThreadData(
  val id: String,
  val text: String,
  val hashtag: String?,
  val location: Pair<Double, Double>?,
  val imageUrls: List<String>
)