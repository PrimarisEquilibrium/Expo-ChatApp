import { auth } from "@/FirebaseConfig";
import { globalStyles } from "@/styles/global";
import { getAuth } from "@firebase/auth";
import { router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function Index() {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/(auth)/login");
  });

  return (
    <View style={globalStyles.container}>
      <View className="bg-gray-800 rounded-md mt-8 p-4">
        <TouchableOpacity onPress={() => auth.signOut()}>
          <Text style={globalStyles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
