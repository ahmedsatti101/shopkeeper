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
