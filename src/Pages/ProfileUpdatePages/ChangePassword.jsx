
import { getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [oldShowPassword, setOldShowPassword] = useState(false);
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosPublic = useAxiosSecure();

  

  const onSubmit = async (data) => {
    const { oldPassword, newPassword } = data;
    const auth = getAuth();
    const firebaseUser = auth.currentUser;
    
    try {
      // Step 1: Reauthenticate the user
      const credential = EmailAuthProvider.credential(firebaseUser.email, oldPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
  
      // Step 2: Update password in Firebase
      await updatePassword(firebaseUser, newPassword);
      
      // Step 3: Update password in the backend database
      const apiUpdateResult = await axiosPublic.patch(
        `/update-password/${userEmail}`,
        { oldPassword, newPassword }
      );
      
      if (apiUpdateResult.status !== 200) {
        // If the backend password update fails, rollback Firebase password change
        await updatePassword(firebaseUser, oldPassword);
        throw new Error("Failed to update password in the database.");
      }
      
      // Success
      toast.success("Password updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
  
    } catch (error) {
      // Handle specific error types
      if (error.code === "auth/requires-recent-login") {
        toast.error("You need to re-login to update your password. Please sign in again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.code === "auth/network-request-failed") {
        toast.error("Network error occurred. Please check your internet connection.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to update password. Please check your inputs.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="flex flex-col justify-center items-center w-full max-w-md">
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <h1 className="text-3xl font-bold text-center mt-5 text-black">
              Change Your Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* Old Password Field */}
              <div className="form-control">
                <label className="label" htmlFor="oldPassword">
                  <span className="label-text text-lg font-semibold">
                    Current Password:
                  </span>
                </label>
                <div className="relative">
                  <Controller
                    name="oldPassword"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Current Password is required" }}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          id="oldPassword"
                          type={oldShowPassword ? "text" : "password"}
                          className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                            fieldState.error
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter Current Password"
                        />
                        <span
                          onClick={() => setOldShowPassword(!oldShowPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                          {oldShowPassword ? (
                            <AiFillEyeInvisible size={20} color="orange" />
                          ) : (
                            <AiFillEye size={20} color="orange" />
                          )}
                        </span>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div className="form-control">
                <label className="label" htmlFor="newPassword">
                  <span className="label-text text-lg font-semibold">
                    New Password:
                  </span>
                </label>
                <div className="relative">
                  <Controller
                    name="newPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "New Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                        message:
                          "Password must include uppercase, lowercase, and a number, and be at least 8 characters long",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                            fieldState.error
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter New Password"
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                          {showPassword ? (
                            <AiFillEyeInvisible size={20} color="orange" />
                          ) : (
                            <AiFillEye size={20} color="orange" />
                          )}
                        </span>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text text-lg font-semibold">
                    Confirm Password:
                  </span>
                </label>
                <div className="relative">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                            fieldState.error
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter Confirm Password"
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                          {showPassword ? (
                            <AiFillEyeInvisible size={20} color="orange" />
                          ) : (
                            <AiFillEye size={20} color="orange" />
                          )}
                        </span>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`mt-4 w-full bg-orange-500 text-xl font-semibold text-white py-3 px-4 rounded-lg shadow hover:bg-orange-600 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
