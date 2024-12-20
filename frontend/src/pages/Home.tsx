import React from "react";
import api from "../api";

export default function Home() {
    const getAllItems = api.get(process.env.REACT_APP_URL + "/api/items/");
    getAllItems.then(data => console.log(data.data))
    return <p>Home page</p>
}
