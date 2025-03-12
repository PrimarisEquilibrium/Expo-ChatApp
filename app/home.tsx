import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { DocumentData } from "firebase/firestore";
import { User } from "@firebase/auth";
import { getUserProfile } from "@/utils/firebaseUtils";

const chatData = [
  {
    id: "1",
    name: "Caroline Johnson",
    message: "Hi! How are you?",
    time: "15:32",
    unread: 7,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Daniel Thompson",
    message: "Oh! Thanks you!",
    time: "13:25",
    unread: 3,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Elisabeth McDonell",
    message: "See you soon!",
    time: "12:14",
    unread: 0,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Jolene Thomas",
    message: "Sent you a sticker",
    time: "12:02",
    unread: 1,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Stephanie Blyton",
    message: "Yeah! Good luck!",
    time: "10:41",
    unread: 0,
    image: "https://via.placeholder.com/150",
  },
];

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
            setProfile(profile);
          }
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <View className="flex-1 bg-[#121212] px-5 pt-12 mt-4 mx-2">
      <View className="flex-row items-center mb-4">
        {profile?.profilePictureUrl && (
          <Image
            style={styles.profileImage}
            source={{ uri: profile.profilePictureUrl }}
            contentFit="cover"
            transition={1000}
          />
        )}
        <Text className="text-4xl font-bold text-[#BB86FC] ml-4">
          Messenger
        </Text>
      </View>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center px-1 py-6 border-b border-gray-700">
            <Image
              source={{ uri: item.image }}
              style={styles.messageImage}
              contentFit="cover"
            />
            <View className="flex-1">
              <Text className="text-white text-lg font-medium">
                {item.name}
              </Text>
              <Text className="text-gray-400 text-sm" numberOfLines={1}>
                {item.message}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-400 text-xs mb-1">{item.time}</Text>
              {item.unread > 0 && (
                <View className="bg-[#BB86FC] w-6 h-6 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0553",
  },
  messageImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0553",
    marginRight: 12,
  },
});
