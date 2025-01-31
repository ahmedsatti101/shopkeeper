import { Image, Pressable, Text, View } from "react-native";
const image = require("../../assets/images/download.jpeg");
const trash = require("../../assets/images/trash.png");

interface Props {
    title: string;
    price: any;
}

export default function BasketItem({title, price}: Props) {
  return (
    <>
      <View className="bg-[#cc9861] flex-row shadow-[0px_0px_30px_0px_rgba(0,0,0,0.40)] items-center m-4">
        <Image alt="Image" source={image} style={{ width: 120, height: 133 }} />
        <View className="px-4 pb-20">
          <Text className="font-serif font-bold text-lg">{title}</Text>
          <Text className="font-serif text-lg">£{price}</Text>
        </View>
        <Pressable onPress={() => console.log("trash")} className="right-0 bottom-0 absolute">
          <Image
            source={trash}
            style={{
              width: 30,
              height: 40,
            }}
          />
        </Pressable>
      </View>
    </>
  );
}
