import { View } from "react-native";
import BasketItem from "../components/BasketItem";

export default function Basket() {
    return (
        <View className="bg-[#e0b688] flex-1">
            <BasketItem name="Apple" price="1.80"/>
        </View>
    );
}
