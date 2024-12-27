import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxioPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxioPublic();
  const navigate = useNavigate(); // UseNavigate hook from React Router DOM
  const location = useLocation(); // UseLocation hook from React Router DOM
  const from = location.state?.from?.pathname || "/"; // Get the redirect path from the login page

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      const userInfo = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      };
      axiosPublic.post("/register-users", userInfo).then((res) => {
       const user = res.data      
      });
      navigate(from, { replace: true }); // Redirect to the original page after successful login with Google
    });
  };

  return (
    <div className="my-6 text-center ">
      <button
        onClick={handleGoogleSignIn}
        className="btn w-5/6 text-xl bg-orange-500 font-semibold text-white hover:bg-orange-600 rounded-lg shadow py-2 px-4"
      >
        <FaGoogle></FaGoogle>Google
      </button>
    </div>
  );
};

export default GoogleLogin;
