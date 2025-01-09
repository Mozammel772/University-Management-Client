import { createBrowserRouter } from "react-router";
import Mainlayout from "../../layout/Mainlayout/Mainlayout";
import ForgotPassword from "../Authentication/Forgetpassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import VerifyEmail from "../Authentication/VerifyEmail";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../HomePages/Home";
import ChangePassword from "../ProfileUpdatePages/ChangePassword";
import Profile from "../ProfileUpdatePages/Profile";
import PrivateRouter from "./PrivateRouter";

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
        element: (
          <PrivateRouter>
            {" "}
            <Profile />
          </PrivateRouter>
        ),
      },
      {
        path: "/changepassword",
        element: (
          <PrivateRouter>
            <ChangePassword />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
