import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import FormInput from "@/components/FormInput";
import { createGroup, getUserUidFromEmail } from "@/utils/firebaseUtils";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";

type Inputs = {
  email: string;
  message: string;
};

export default function AddMessage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      message: "Hello! I'd like to connect.",
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const receiverUid = await getUserUidFromEmail(data.email);
      const receiverRef = doc(db, "profiles", receiverUid);

      if (!receiverUid) {
        console.log("No user found with this email");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        console.log("No authenticated user");
        return;
      }

      const senderUid = user.uid;
      const senderRef = doc(db, "profiles", senderUid);

      // Create group
      const group = await createGroup(db, senderUid, receiverUid);
      const groupId = group.id;

      // Send message
      try {
        const messageRef = await addDoc(
          collection(db, "groups", groupId, "messages"),
          {
            messageText: data.message,
            sentAt: serverTimestamp(),
            sentBy: senderUid,
          }
        );

        // Update recent message in group
        await updateDoc(doc(db, "groups", groupId), {
          recentMessage: {
            messageId: messageRef.id,
            text: data.message,
            sentBy: senderUid,
            sentAt: serverTimestamp(),
          },
        });
      } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message. Please try again later.");
      }

      // Update sender's and receiver's profiles
      await Promise.all([
        updateDoc(senderRef, { groups: arrayUnion(groupId) }),
        updateDoc(receiverRef, { groups: arrayUnion(groupId) }),
      ]);

      router.dismiss();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginTop: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView className="p-5 mx-4">
          <FormInput
            label="Email:"
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            error={errors.email}
          />

          <FormInput
            label="Message:"
            name="message"
            control={control}
            rules={{ required: "Message cannot be empty." }}
            error={errors.message}
            className="bg-[#1E1E1E] text-white p-3 rounded-lg border-2 border-[#BB86FC] mb-2 h-[calc(42px*2)]"
            multiline={true}
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.7}
            className="bg-[#BB86FC] rounded-lg p-3 items-center mt-4"
          >
            <Text className="text-white text-lg font-semibold">Send</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
