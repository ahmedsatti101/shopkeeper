import { Modal, Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  show: boolean;
};

export default function FormModal({ show }: Props) {
  const router = useRouter();

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
          <Pressable onPress={() => router.push("/sign-in")}>
            <Text className="font-serif text-sm font-bold">Sign in</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
