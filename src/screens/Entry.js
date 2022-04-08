import { useCallback, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Master from "./Master";
import dayjs from "dayjs";
import { fetchNewToken } from "../services/authService";

const Entry = () => {
    const location = useLocation();
    const timerRef = useRef(null);

    const fetchAuthToken = useCallback(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        const expiresIn = localStorage.getItem("expiresIn");
        const expiryDateTime = dayjs(expiresIn);

        if (expiryDateTime.diff(dayjs(), "minutes") <= 13) {
            fetchNewToken(refreshToken)
                .then((response) => {
                    const { authToken, refreshToken, expiresIn } =
                        response.data;
                    localStorage.setItem("authToken", authToken);
                    localStorage.setItem("expiresIn", expiresIn);
                    localStorage.setItem("refreshToken", refreshToken);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [location.pathname]);

    useEffect(() => {
        if (
            !["/logout", "/login", "/"].includes(location.pathname) &&
            !timerRef.current
        ) {
            timerRef.current = setInterval(fetchAuthToken, 1000 * 1);
        }
        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [location.pathname, fetchAuthToken]);

    return (
        <Master>
            <Outlet />
        </Master>
    );
};

export default Entry;
