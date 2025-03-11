import { Client, Storage } from "react-native-appwrite";

const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const bucketId = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;

if (!projectId || !endpoint || !bucketId) {
  throw new Error("Appwrite project ID, endpoint, or bucket ID is missing!");
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);

const storage = new Storage(client);

export { bucketId, storage };
