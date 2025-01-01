import { createBrowserRouter } from "react-router";
import Mainlayout from "../../layout/Mainlayout/Mainlayout";
import ForgotPassword from "../Authentication/Forgetpassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import VerifyEmail from "../Authentication/VerifyEmail";
import Home from "../HomePages/Home";
import ProfileUpdate from "../ProfileUpdatePages/ProfileUpdate";

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
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/update-profile",
        element: <ProfileUpdate />,
      },
    ],
  },
]);
