import { Image, Pressable, Text, View } from "react-native";
const image = require("../../assets/images/react-logo.png");
const trash = require("../../assets/images/trash.png");

export default function BasketItem() {
    return (
        <>
            <View className="bg-[#cc9861] flex-row p-4 shadow-lg items-center">
                <Image
                    alt="Image"
                    source={image}
                    style={{ width: 110, height: 133, borderRadius: 8 }}
                />
                <View className="px-7">
                    <Text className="font-serif font-bold text-lg">Apples</Text>
                    <Text className="font-serif text-lg font-semibold">£3.60</Text>
                </View>
            </View>
            <Pressable onPress={() => console.log("trash")}>
                <Image
                    source={trash}
                    style={{
                        width: 30,
                        height: 35,
                        position: "absolute",
                        bottom: 10,
                        right: 5,
                        padding: 10,
                    }}
                />
            </Pressable>
        </>
    );
}
