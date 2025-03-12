import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ID } from "react-native-appwrite";
import { bucketId, storage } from "@/AppwriteConfig";

/**
 * Stores the profile picture image in an Appwrite bucket.
 * @param file The image extracted from expo image picker.
 * @returns The profile picture url created in the Appwrite bucket.
 */
const createProfilePicture = async (
  file: ImagePicker.ImagePickerAsset | null
) => {
  let profilePictureUrl = null;

  if (file) {
    const fileInfo = await FileSystem.getInfoAsync(file.uri);

    // If the file has width and height, calculate the size based on that
    let fileSize = file.width * file.height;

    // If the file exists, override the size with the actual file size from the file system
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
