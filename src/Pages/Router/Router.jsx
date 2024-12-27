import { createBrowserRouter } from "react-router";
import Mainlayout from "../../layout/Mainlayout/Mainlayout";
import ForgotPassword from "../Authentication/Forgetpassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Home from "../HomePages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
