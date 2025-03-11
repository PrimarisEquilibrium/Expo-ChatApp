import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Structure of DatePicker prop
interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker: FC<Props> = ({ date, setDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (date) {
      setDate(date);
    }
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity
        onPress={showDatePicker}
        className="bg-[#1E1E1E] flex-row items-center p-3 rounded-lg border-2 border-[#BB86FC]"
      >
        <Ionicons name="calendar" size={20} color="#BB86FC" className="mr-2" />
        <Text className="text-white">
          {date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        display="inline"
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePicker;
