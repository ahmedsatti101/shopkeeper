import "../gesture-handler";
import "../global.css";

import { StatusBar } from "react-native";
import AppDrawer from "./components/Drawer";

export default function Index() {
    return (
        <>
            <StatusBar backgroundColor="#000" />
            <AppDrawer />
        </>
    );
}
