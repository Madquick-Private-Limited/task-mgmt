import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/userSlice";
import { login, logout } from "@/features/authSlice";
import { bouncy } from "ldrs";

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    bouncy.register();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/check-auth`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    dispatch(login());
                    dispatch(setUser(response.data));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    if (loading) {
        // @ts-ignore
        return <l-bouncy size="55" speed="1.8" color="#6B75FF"></l-bouncy>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
