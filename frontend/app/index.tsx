import { StatusBar } from "react-native";
import SignUpForm from "./sign-up/index";

export default function Index() {
    return (
        <>
            <StatusBar backgroundColor="#000" />
            <SignUpForm />
        </>
    );
}
