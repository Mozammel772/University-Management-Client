// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import useAuth from "../../hooks/useAuth";

// const ForgotPassword = () => {
//   const [loading, setLoading] = useState(false);
//   const { forgetPassword } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm({
//     mode: "onChange", // Trigger validation on input change
//   });

//   const onSubmit = ({ email }) => {
//     setLoading(true);
//     forgetPassword(email)
//       .then(() => {
//         toast.success("Check your inbox for the password reset link.", {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         // reset(); // Clear the email field
//       })
//       .catch((error) => {
//         let errorMessage = "An error occurred. Please try again.";
//         console.error("Error code:", error.code); // Log the error code
//         console.error("Error message:", error.message); // Log the error message
//         if (error.code === "auth/invalid-email") {
//           errorMessage = "Invalid email address.";
//         } else if (error.code === "auth/user-not-found") {
//           errorMessage = "No account found with this email.";
//         }
//         toast.error(errorMessage, {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="hero bg-base-200 min-h-screen">
//       <div className="flex flex-col justify-center items-center">
//         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//           <div className="card-body">
//             <h1 className="text-3xl font-bold text-center mb-4">
//               Forgot Password
//             </h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-control">
//                 <label className="label" htmlFor="email">
//                   <span className="label-text text-lg font-semibold">
//                     Email:
//                   </span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//               <div className="form-control mt-4">
//                 <button
//                   type="submit"
//                   className="btn btn-secondary text-xl"
//                   disabled={loading || !isValid} // Disable button if loading or form is invalid
//                 >
//                   {loading ? "Sending..." : "Send Reset Link"}
//                 </button>
//               </div>
//             </form>
//             <p className="mt-4 text-center">
//               Remembered your password?{" "}
//               <Link to="/login" className="text-blue-500 font-bold">
//                 Login Now
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Import Firebase authentication methods
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset, // To reset form fields
  } = useForm({
    mode: "onChange", // Trigger validation on input change
  });

  const onSubmit = ({ email }) => {
    setLoading(true);
    const auth = getAuth(); // Firebase authentication instance

    // Check if the email is registered with Firebase
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Success: Email sent for password reset
        toast.success("Check your inbox for the password reset link.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset(); // Reset the email field after successful submission
      })
      .catch((error) => {
        console.log("An error occurred",error)
        let errorMessage = "An error occurred. Please try again.";
        // Handle different Firebase error codes
        if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        }
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-4">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text text-lg font-semibold">
                    Email:
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-4">
                <button
                  type="submit"
                  className="btn btn-secondary text-xl"
                  disabled={loading || !isValid} // Disable button if loading or form is invalid
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-center">
              Remembered your password?{" "}
              <Link to="/login" className="text-blue-500 font-bold">
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
