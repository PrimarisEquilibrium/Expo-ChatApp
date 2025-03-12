import { auth, db } from "@/FirebaseConfig";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { User } from "@firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DocumentData | null>(null);

  /**
   * Retrieves the user's profile from Firestore.
   * @param uid The users unique identifier.
   * @returns The user's profile if it exists; otherwise null.
   */
  const getUserProfile = async (uid: string) => {
    const profileRef = doc(db, "profiles", uid);
    try {
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        return profileSnap.data();
      } else {
        console.log("Profile not found");
        return null;
      }
    } catch (error) {
      // Typically a connection error
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

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
