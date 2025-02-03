import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
    value: number;
    label: string;
};

interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
}

export default function Dropdown({
    data,
    onChange,
    placeholder,
}: DropDownProps) {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(1);
    const buttonRef = useRef<View>(null);
    const [top, setTop] = useState(0);

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item.value);
        setExpanded(false);
    }, []);

    const onButtonLayout = (event: any) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
            topOffset + heightOfComponent + (Platform.OS === "android" ? 0 : 0);

        setTop(finalValue);
    };

    return (
        <View ref={buttonRef} onLayout={onButtonLayout} testID="quantity-dropdownmenu">
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <Text style={styles.text}>{value || placeholder}</Text>
                <AntDesign name={expanded ? "caretup" : "caretdown"} />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View style={styles.backdrop}>
                            <View style={[styles.options, { top }]}>
                                <FlatList
                                    style={{maxHeight: 200}}
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.optionItem}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    optionItem: {
        height: 40,
        justifyContent: "center",
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
    },
    options: {
        backgroundColor: "#fff",
        width: 200,
        padding: 10,
        borderRadius: 6,
        position: "absolute",
    },
    text: {
        fontSize: 15,
        opacity: 0.8,
    },
    button: {
        height: 40,
        justifyContent: "space-between",
        backgroundColor: "transparent",
        flexDirection: "row",
        width: 90,
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 7,
        borderWidth: 1,
    },
});
