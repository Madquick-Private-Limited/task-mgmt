import "./index.css";
import Axios from 'axios';
import {createRoot} from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import Home from "./components/Home.tsx";

Axios.defaults.withCredentials = true;


const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      children: [
          {
              path: "/register",
              element: <Register />,
          },
          {
              path: "/login",
              element: <Login />,
          },
          {
              path: "/",
              element: <Home />,
          }
      ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);