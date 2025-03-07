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
        <View className="bg-[#e3a76a] h-[140px] w-[268px] m-auto rounded-[10px]">
          <Text className="font-serif text-lg font-bold m-12 text-center">
            Thank you for signing up
          </Text>
          <Pressable onPress={() => router.push("/sign-in")} className="absolute right-0 bottom-0 rounded-[6px] bg-[#c4574f40] p-1 m-2">
            <Text className="font-serif font-bold">Sign in</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
