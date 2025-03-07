import axios from "axios";

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
