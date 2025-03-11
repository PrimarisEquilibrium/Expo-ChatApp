import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AvatarPicker = ({ file, setFile }: any) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  return (
    <>
      <View className="flex items-center justify-center mb-5">
        <TouchableOpacity
          onPress={pickImage}
          className="relative w-[120px] h-[120px] rounded-full bg-[#1E1E1E] overflow-hidden"
        >
          {file?.uri ? (
            <Image
              source={{ uri: file.uri }}
              className="w-full h-full object-cover"
            />
          ) : (
            <Ionicons name="person-circle" size={120} color="#BB86FC" />
          )}
        </TouchableOpacity>
        <Text className="text-center text-[#BB86FC] mt-3">
          Tap to change your avatar
        </Text>
      </View>
    </>
  );
};

export default AvatarPicker;
