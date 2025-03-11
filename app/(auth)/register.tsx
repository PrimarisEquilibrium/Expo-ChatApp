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
import AvatarPicker from "@/components/AvatarPicker";
import { createProfilePicture } from "@/utils/fileUtils";

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

      const profilePictureUrl = await createProfilePicture(file);

      const profileRef = doc(db, "profiles", user.uid);
      try {
        await setDoc(profileRef, {
          username: data.username,
          profilePictureUrl: profilePictureUrl,
          dateOfBirth: Timestamp.fromDate(date),
        });
      } catch (error) {
        alert("Error creating/updating profile: " + error);
        console.log(error);
      }

      if (user) router.replace("/");
    } catch (error: any) {
      alert("Sign up failed: " + error.message);
      console.log(error);
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
          <AvatarPicker file={file} setFile={setFile} />

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
