import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#121212] p-5 mx-4 justify-center">
      <Text className="text-4xl font-bold text-[#BB86FC] text-center mb-8">
        Welcome to ChatApp
      </Text>
      <Text className="text-lg text-[#E0E0E0] text-center mb-8">
        Built with React Native, Expo, Firebase, and Appwrite
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/register")}
        activeOpacity={0.7}
        className="bg-[#BB86FC] rounded-lg p-3 mb-3 items-center"
      >
        <Text className="text-white text-lg font-semibold">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        activeOpacity={0.7}
        className="bg-[#BB86FC] rounded-lg p-3 mb-3 items-center"
      >
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
