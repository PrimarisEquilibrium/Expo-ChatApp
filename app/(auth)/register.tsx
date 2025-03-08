import { globalStyles } from "@/styles/global";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: Inputs) => console.log(data);

  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Register</Text>

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

      <View className="mb-4">
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

      <Text style={globalStyles.label}>Confirm Password:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={globalStyles.textInput}
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text className="text-red-200 mt-2">This is required.</Text>
      )}

      <View className="bg-gray-800 rounded-md mt-8">
        <Button color="white" title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>

      <View className="mt-6">
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text style={globalStyles.text}>Already have an account? Login!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
