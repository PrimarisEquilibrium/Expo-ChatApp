import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Text, View, TextInput } from "react-native";

const FormInput = ({
  label,
  name,
  control,
  rules,
  error,
  className = "bg-[#1E1E1E] text-white p-3 rounded-lg border-2 border-[#BB86FC] mb-2",
  multiline = false,
  isPassword = false,
}: any) => {
  return (
    <>
      <View className="mb-5">
        <Text className="text-lg text-[#E0E0E0] mb-2">{label}</Text>
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={className}
              placeholder={label}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPassword}
              multiline={multiline}
              autoCapitalize="none"
            />
          )}
          name={name}
        />
        {error && (
          <View className="flex-row items-center mt-1">
            <Ionicons
              name="warning"
              size={16}
              color="#FF7F50"
              className="mr-2"
            />
            <Text className="text-sm text-[#FF7F50]">{error.message}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default FormInput;
