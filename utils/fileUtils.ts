import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ID } from "react-native-appwrite";
import { bucketId, storage } from "@/AppwriteConfig";

const createProfilePicture = async (
  file: ImagePicker.ImagePickerAsset | null
) => {
  let profilePictureUrl = null;

  if (file) {
    const fileInfo = await FileSystem.getInfoAsync(file.uri);

    let fileSize = file.width * file.height;
    if (fileInfo.exists) {
      fileSize = fileInfo.size;
    }
    const fileToUpload = {
      uri: file.uri,
      type: file.type || "image/jpeg",
      name: file.uri.split("/").pop() || "image.jpg",
      size: fileSize,
    };

    const fileId = ID.unique();
    await storage.createFile(bucketId, fileId, fileToUpload);
    const fileViewUrl = storage.getFileView(bucketId, fileId);

    profilePictureUrl = fileViewUrl.toString();
  }
  return profilePictureUrl;
};

export { createProfilePicture };
