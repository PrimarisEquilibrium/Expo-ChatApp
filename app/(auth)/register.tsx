import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (user) router.replace("/");
    } catch (error: any) {
      console.log("error");
      alert("Sign up failed: " + error.message);
    }
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-5 mx-4 justify-center">
      <Text className="text-4xl font-bold text-[#BB86FC] text-center mb-8">
        Register
      </Text>

      <View className="mb-5">
        <Text className="text-lg text-[#E0E0E0] mb-2">Email:</Text>
        <Controller
          control={control}
          rules={{ required: "Email is required." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border-2 border-[#BB86FC] mb-2"
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <View className="flex-row items-center mt-1">
            <Ionicons
              name="warning"
              size={16}
              color="#FF7F50"
              className="mr-2"
            />
            <Text className="text-sm text-[#FF7F50]">
              {errors.email.message}
            </Text>
          </View>
        )}
      </View>

      <View className="mb-5">
        <Text className="text-lg text-[#E0E0E0] mb-2">Password:</Text>
        <Controller
          control={control}
          rules={{ required: "Password is required." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border-2 border-[#BB86FC] mb-2"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && (
          <View className="flex-row items-center mt-1">
            <Ionicons
              name="warning"
              size={16}
              color="#FF7F50"
              className="mr-2"
            />
            <Text className="text-sm text-[#FF7F50]">
              {errors.password.message}
            </Text>
          </View>
        )}
      </View>

      <View className="mb-5">
        <Text className="text-lg text-[#E0E0E0] mb-2">Confirm Password:</Text>
        <Controller
          control={control}
          rules={{ required: "Confirm Password is required." }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border-2 border-[#BB86FC] mb-2"
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <View className="flex-row items-center mt-1">
            <Ionicons
              name="warning"
              size={16}
              color="#FF7F50"
              className="mr-2"
            />
            <Text className="text-sm text-[#FF7F50]">
              {errors.confirmPassword.message}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.7}
        className="bg-[#BB86FC] rounded-lg p-3 mb-5 items-center"
      >
        <Text className="text-white text-lg font-semibold">Submit</Text>
      </TouchableOpacity>

      <View className="mt-5">
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text className="text-[#BB86FC] text-center text-lg">
            Already have an account? Login!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
