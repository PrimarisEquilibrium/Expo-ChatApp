import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import FormInput from "@/components/FormInput";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Client, ID, Storage } from "react-native-appwrite";
import { doc, setDoc, Timestamp } from "firebase/firestore";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  // Date Picker state
  const [date, setDate] = useState<Date>(new Date());

  // Image Picker state
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
  const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
  const bucketId = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID;

  if (!projectId || !endpoint || !bucketId) {
    throw new Error("Appwrite project ID, endpoint, or bucket ID is missing!");
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  const storage = new Storage(client);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const { user: user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

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

        console.log(fileViewUrl);

        profilePictureUrl = fileViewUrl.toString();
      }

      const profileRef = doc(db, "profiles", user.uid);
      try {
        await setDoc(profileRef, {
          username: data.username,
          profilePictureUrl: profilePictureUrl,
          dateOfBirth: Timestamp.fromDate(date),
        });
        console.log("Profile created/updated successfully!");
      } catch (error) {
        console.error("Error creating/updating profile:", error);
      }

      if (user) router.replace("/");
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    }
  };

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="absolute top-16 w-full z-20">
        <Text className="text-4xl font-bold text-[#BB86FC] text-center mb-8">
          Register
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/")}
        className="absolute left-4 top-16 z-50"
      >
        <Ionicons name="arrow-back" size={30} color="#BB86FC" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginTop: 12 }}
        keyboardShouldPersistTaps="handled"
        className="mt-32"
      >
        <SafeAreaView className="p-5 mx-4">
          <View className="flex items-center justify-center mb-5">
            <TouchableOpacity
              onPress={pickImage}
              className="relative w-[120px] h-[120px] rounded-full bg-[#1E1E1E] overflow-hidden"
            >
              {file?.uri ? (
                <Image
                  source={{ uri: file.uri }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Ionicons name="person-circle" size={120} color="#BB86FC" />
              )}
            </TouchableOpacity>
            <Text className="text-center text-[#BB86FC] mt-3">
              Tap to change your avatar
            </Text>
          </View>

          <FormInput
            label="Username:"
            name="username"
            control={control}
            rules={{ required: "Username is required." }}
            errors={errors}
          />

          <View className="mb-5">
            <Text className="text-lg text-[#E0E0E0] mb-2">Date of Birth:</Text>
            <DatePicker date={date} setDate={setDate} />
          </View>

          <FormInput
            label="Email:"
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            errors={errors}
          />

          <FormInput
            label="Password:"
            name="password"
            control={control}
            rules={{ required: "Password is required." }}
            errors={errors}
            isPassword={true}
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.7}
            className="bg-[#BB86FC] rounded-lg p-3 items-center mt-4"
          >
            <Text className="text-white text-lg font-semibold">Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
