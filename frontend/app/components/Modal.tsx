import { Modal, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

type Props = {
    show: boolean;
    onClose: () => void;
};

export default function FormModal({ show, onClose }: Props) {
    return (
        <>
            <Modal
                transparent={true}
                visible={show}
                onRequestClose={() => {
                    show = !show;
                }}
                testID="form-modal"
            >
                <View className="bg-[#e3a76a] h-140 w-268 m-2">
                    <Text className="font-serif text-sm font-bold">
                        Thank you for signing up
                    </Text>
                    <Link href="/sign-in" asChild>
                        <Pressable onPress={onClose}>
                            <Text className="font-serif text-sm font-bold">Sign in</Text>
                        </Pressable>
                    </Link>
                </View>
            </Modal>
        </>
    );
}
