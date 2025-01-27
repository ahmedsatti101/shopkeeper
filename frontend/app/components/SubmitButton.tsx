import { Pressable, Text } from "react-native";

const Button = ({ text }: any) => {
    const handlePress = () => {
        console.log("Pressed");
    };
    const handleRelease = () => {
        console.log("Released");
    };

    return (
        <Pressable
            className="bg-[#c4574f40] items-center justify-center rounded-[10px] py-[12px] mt-[20px]"
            onPressIn={handlePress}
            onPressOut={handleRelease}
            accessibilityLabel="Form submit button"
        >
            <Text className="text-black text-base font-serif font-bold">{text}</Text>
        </Pressable>
    );
};
export default Button;
