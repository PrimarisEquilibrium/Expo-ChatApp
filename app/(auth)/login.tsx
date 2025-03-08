import { auth } from "@/FirebaseConfig";
import { globalStyles } from "@/styles/global";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: Inputs) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (user) router.replace("/");
    } catch (error: any) {
      console.log("error");
      alert("Sign in failed: " + error.message);
    }
  };

  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Login</Text>

      <View className="mb-2">
        <Text style={globalStyles.label}>Email:</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={globalStyles.textInput}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text className="text-red-200 mt-2">This is required.</Text>
        )}
      </View>

      <View>
        <Text style={globalStyles.label}>Password:</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={globalStyles.textInput}
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
          <Text className="text-red-200 mt-2">This is required.</Text>
        )}
      </View>

      <View className="bg-gray-800 rounded-md mt-8">
        <Button color="white" title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>

      <View className="mt-6">
        <TouchableOpacity onPress={() => router.replace("/(auth)/register")}>
          <Text style={globalStyles.text}>
            Don't have an account? Register!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
