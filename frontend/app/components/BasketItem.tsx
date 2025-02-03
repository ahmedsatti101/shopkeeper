import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Dropdown from "./Dropdown";
import BasketSummary from "./BasketSummary";
const image = require("../../assets/images/download.jpeg");
const trash = require("../../assets/images/trash.png");

interface Props {
  title: string;
  price: any;
}

const DATA = Array.from({ length: 20 }, (_, index) => ({
  label: `${index + 1}`,
  value: index + 1,
}));

export default function BasketItem({ title, price }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <View className="bg-[#cc9861] flex-row shadow-[0px_0px_30px_0px_rgba(0,0,0,0.40)] items-center m-4">
        <Image alt="Image" source={image} style={{ width: 120, height: 133 }} testID="basket-item-image"/>
        <View className="px-4 pb-15">
          <Text className="font-serif font-bold text-lg" testID="basket-item-name">{title}</Text>
          <Text className="font-serif text-lg" testID="basket-item-price">£{price}</Text>
          <Dropdown
            data={DATA}
            placeholder="1"
            onChange={(item) => setQuantity(item.value)}
          />
        </View>

        <Pressable
          onPress={() => console.log("trash")}
          className="right-0 bottom-0 absolute"
        >
          <Image
            source={trash}
            style={{
              width: 30,
              height: 40,
            }}
            testID="Remove item from basket icon"
          />
        </Pressable>
      </View>
      <BasketSummary price="3.20" quantity={quantity} />
    </>
  );
}
