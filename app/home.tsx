import { auth, db } from "@/FirebaseConfig";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { DocumentData } from "firebase/firestore";
import { User } from "@firebase/auth";
import { getUserProfile } from "@/utils/firebaseUtils";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DocumentData | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/");
      } else {
        setUser(user);
        getUserProfile(user.uid).then((profile) => {
          if (profile) {
            console.log(profile.profilePictureUrl);
            setProfile(profile);
          }
        });
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <View className="flex-1 bg-[#121212] p-5 mx-4 justify-center">
      {profile?.profilePictureUrl && (
        <View className="w-12 h-12">
          <Image
            style={styles.image}
            source={{ uri: profile.profilePictureUrl }}
            contentFit="cover"
            transition={1000}
          />
        </View>
      )}
      <Text className="text-4xl font-bold text-[#BB86FC] text-center mb-8">
        Home Page
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: "50%",
    backgroundColor: "#0553",
  },
});
