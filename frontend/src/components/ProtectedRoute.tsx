import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import React, { useState, useEffect } from "react";

function ProtectedRoute({children}: any) {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    });

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (err) {
            console.log(err);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const tokenExp = decodedToken.exp;
        const now = Date.now() / 1000;

        if (tokenExp && tokenExp < now) await refreshToken();
        else setIsAuthorized(true);
    };

    if (isAuthorized === false) return <div>Loading...</div>

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;
