import { Pressable, Text } from "react-native";

const Button = ({ text, onPress }: any) => {
  return (
    <Pressable
      className="bg-[#c4574f40] items-center justify-center rounded-[10px] py-[12px] mt-[20px]"
      onPress={onPress}
      accessibilityLabel="Form submit button"
    >
      <Text className="text-black text-base font-serif font-bold">{text}</Text>
    </Pressable>
  );
};
export default Button;
