import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function Home() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <View className="flex-1 bg-[#121212] p-5 mx-4 justify-center">
      <Text className="text-4xl font-bold text-[#BB86FC] text-center mb-8">
        Home Page
      </Text>
    </View>
  );
}
