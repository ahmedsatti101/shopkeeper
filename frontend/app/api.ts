import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItems = () => {
    return axios
        .get("https://shopkeeper-e1dz.onrender.com/api/items/")
        .then((res) => {
            return res.data.items;
        })
        .catch((err) => {
            return err;
        });
};

export const createAccount = (username: string, password: string) => {
    return axios
        .post("https://shopkeeper-e1dz.onrender.com/api/user/register/", { username, password })
        .then((response) => {
            console.log(response.status)
        })
        .catch(err => console.log(err))
};

export const signInUser = async (username: string, password: string) => {
    try {
        const response = await axios
            .post("https://shopkeeper-e1dz.onrender.com/api/token/", { username, password });
        if (response.status === 200) {
            await AsyncStorage.setItem("access", response.data.access);
            await AsyncStorage.setItem("refresh", response.data.refresh);
        }
    } catch (err) {
        return console.log(err);
    }
}
