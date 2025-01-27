import { Text, View, TextInput } from "react-native";
import Button from "../components/SubmitButton";

export default function SignInForm() {
    return (
        <View className="flex-1 bg-[#e0b688] px-[20px] pt-[40px]">
            <Text className="text-center font-serif text-3xl font-bold mb-[10px]">
                Sign in
            </Text>
            <View className="mb-[20px]">
                <Text className="font-serif text-[21px] font-bold mb-[5px]">
                    Username
                </Text>
                <TextInput
                    accessibilityLabel="Username text input"
                    className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
                    inputMode="text"
                />
                <Text className="font-serif text-[21px] font-bold mb-[5px]">
                    Password
                </Text>
                <TextInput
                    accessibilityLabel="Password input"
                    className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
                    secureTextEntry
                    inputMode="text"
                />
                <Button text="Sign in"/>
                <Text className="text-center font-serif text-base font-bold mt-[20px]">
                    Need to create an account? Sign up
                </Text>
            </View>
        </View>
    );
}
