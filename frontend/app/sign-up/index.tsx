import { FlatList, Text, TextInput, View } from "react-native";
import Button from "../components/SubmitButton";

const DATA = [
    "Password can't be too similar to your other personal information",
    "Password must contain at least 8 characters",
    "Password can't be a commonly used password",
    "Password can't be entirely numeric",
];

export default function SignUpForm() {
    return (
        <View className="flex-1 bg-[#e0b688] px-[20px] pt-[40px]">
            <Text className="text-center font-serif text-3xl font-bold mb-[10px]">
                Sign up
            </Text>
            <Text className="text-center font-serif text-base font-bold text-[#787171] mb-[20px]">
                Create an account to add items to your basket
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
                <Text className="font-serif text-sm text-[#787171] mb-[5px] font-bold">
                    Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
                </Text>

                <Text className="font-serif text-[21px] font-bold mb-[5px]">
                    Password
                </Text>
                <TextInput
                    accessibilityLabel="Password input"
                    className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
                    secureTextEntry
                    inputMode="text"
                />
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <Text className="font-serif text-sm text-[#787171] mb-[5px] font-bold">
                            {item}
                        </Text>
                    )}
                    testID="password-requirements"
                />
            </View>

            <Button text="Sign up"/>
            <Text className="text-center font-serif text-base font-bold mt-[20px]">
                Already a customer? Sign in
            </Text>
        </View>
    );
}
