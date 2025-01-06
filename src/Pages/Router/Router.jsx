import { createBrowserRouter } from "react-router";
import Mainlayout from "../../layout/Mainlayout/Mainlayout";
import ForgotPassword from "../Authentication/Forgetpassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import VerifyEmail from "../Authentication/VerifyEmail";
import Home from "../HomePages/Home";
import ChangePassword from "../ProfileUpdatePages/ChangePassword";
import EditProfile from "../ProfileUpdatePages/EditProfile";
import Profile from "../ProfileUpdatePages/Profile";
import Dashboard from "../Dashboard/Dashboard";

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
<<<<<<< HEAD
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/changepassword",
        element: <ChangePassword />,
=======
        element: <Profile />
      },
      {
        path: "/dashboard",
        element: <Dashboard />

>>>>>>> 47c1c742ecaf01f76fa32a34bcbb75b81b1dae01
      },
    ],
  },
]);
