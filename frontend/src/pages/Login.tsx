import React, { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: any) => {
        e.preventDefault();
        const res = api.post(process.env.REACT_APP_URL + "/api/token/", {username, password});
        
        res.then(data => {
            localStorage.setItem(ACCESS_TOKEN, data.data.access);
            localStorage.setItem(REFRESH_TOKEN, data.data.refresh);
        })
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>

                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Log in</button>
            </form>
        </>
    );
};
