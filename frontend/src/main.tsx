import "./index.css";
import Axios from 'axios';
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Auth from "./components/Auth.tsx";
import Home from "./components/Home.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

Axios.defaults.withCredentials = true;


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/auth",
                element: <Auth />,
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    }
                ]
            }
        ]
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);