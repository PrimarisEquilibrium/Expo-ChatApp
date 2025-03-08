import { auth } from "@/FirebaseConfig";
import { getAuth } from "@firebase/auth";
import { router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function Index() {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/(auth)/login");
  });

  return (
    <View className="mx-4">
      <View className="bg-gray-800 rounded-md mt-8 p-4">
        <TouchableOpacity onPress={() => auth.signOut()}>
          <Text className="text-white text-center">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
