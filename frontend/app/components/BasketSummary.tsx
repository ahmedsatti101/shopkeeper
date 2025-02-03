import { View, Text } from "react-native";
import Button from "./SubmitButton";

type Props = {
  quantity: number;
  price: any;
};

export default function BasketSummary({ quantity, price }: Props) {
  return (
    <View className="bg-[#c4574f40] p-4 m-4">
      <Text className="font-serif text-2xl font-bold">Basket Summary</Text>
      <View className="flex-row justify-between mt-2 pt-5">
        <View>
          <Text className="font-serif text-xl font-bold">Total</Text>
          <Text className="font-serif text-xl font-bold">Total items</Text>
        </View>
        <View className="pr-0 items-end">
          <Text className="font-serif text-xl font-bold">£{price}</Text>
          <Text className="font-serif text-xl font-bold">{quantity}</Text>
        </View>
      </View>
      <Button text="Checkout" />
    </View>
  );
}
