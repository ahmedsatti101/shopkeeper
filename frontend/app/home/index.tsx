import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { getItems } from "../api";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

interface Item {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getItems()
            .then((res) => setItems(res))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <View className="bg-[#e0b688] flex-1 justify-center flex-row">
                <ActivityIndicator color="#000" size="large" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View className="bg-[#e0b688] flex-1">
                {items.map((item: Item) => {
                    return (
                        <View className="bg-[#cc986185] m-5" key={item.id}>
                            <Image
                                source={{uri: `https://shopkeeper-e1dz.onrender.com${item.image}`}}
                                style={{ width: "100%", height: 200 }}
                                alt={`Image of ${item.name}`}
                            />
                            <View className="p-2">
                                <Text className="font-bold font-serif text-xl">
                                    {item.name}
                                </Text>
                                <Text
                                    className={`font-bold ${item.quantity > 0 ? "text-[#13ca20]" : "text-[#ff0000]"} font-serif`}
                                >
                                    {item.quantity > 0 ? "In stock" : "Out of stock"}
                                </Text>
                                <View className="flex-row justify-between items-center mt-2">
                                    <Text className="text-xl font-bold font-serif">
                                        £{item.price}
                                    </Text>
                                    <Pressable
                                        className="bg-[#cc9861] items-center justify-center rounded-md h-10 p-2"
                                        onPress={() => console.log("basket")}
                                        accessibilityLabel="Add to basket button"
                                    >
                                        <Text className="text-black text-[16px] font-serif font-bold">
                                            Add to basket
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}
