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

  const onSubmit = (data: Inputs) => {
    console.log("Message Sent:", data);
    router.push("/home");
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
