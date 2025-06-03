import { requireNativeModule } from "expo-modules-core";

type BackgroundUploaderType = {
  startUpload(params: string): void;
};

export default requireNativeModule<BackgroundUploaderType>(
  "BackgroundUploader"
);
