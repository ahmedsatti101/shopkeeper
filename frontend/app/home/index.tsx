import { Image, Pressable, Text, View } from "react-native";

const image = require("../../assets/images/download.jpeg");

const num = 10;

export default function Home() {
  return (
    <View className="bg-[#e0b688] flex-1">
      <View className="bg-[#cc9861] m-5">
        <Image source={image} style={{ width: "100%" }} />
        <View className="p-2">
          <Text className="font-bold font-serif text-xl">Apple</Text>
          <Text
            className={`font-bold ${num > 0 ? "text-[#13ca20]" : "text-[#ff0000]"} font-serif`}
          >
            {num > 0 ? "In stock" : "Out of stock"}
          </Text>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-xl font-bold font-serif">£0.80</Text>
            <Pressable
              className="bg-[#c4574f50] items-center justify-center rounded-md h-10 p-2"
              onPress={() => console.log("basket")}
            >
              <Text className="text-black text-[16px] font-serif font-bold">
                Add to basket
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
