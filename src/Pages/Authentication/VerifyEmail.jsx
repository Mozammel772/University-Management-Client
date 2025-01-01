// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import useAuth from "../../hooks/useAuth";

// const VerifyEmail = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Ensure `user` is correctly destructured

//   const handleRefresh = async () => {
//     // Ensure the user exists
//     if (!user) {
//       toast.error("User not found. Please log in again.", {
//         position: "top-center",
//         autoClose: 5000,
//       });
//       return;
//     }

//     try {
//       // Firebase-specific reload method
//       await user.reload(); // Reload the user's data
//       if (user.emailVerified) {
//         toast.success("Email verified! You can now proceed.", {
//           position: "top-center",
//           autoClose: 5000,
//         });
//         navigate("/dashboard");
//       } else {
//         // If email is not verified
//         toast.error("Your email is not verified yet. Please check your inbox.", {
//           position: "top-center",
//           autoClose: 5000,
//         });
//       }
//     } catch (err) {
//       console.error("Error during email verification:", err.message);
//       toast.error("An error occurred. Please try again later.", {
//         position: "top-center",
//         autoClose: 5000,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
//       <p className="text-center mb-6">
//         A verification email has been sent to your email address. Please check
//         your inbox and verify your email to proceed.
//       </p>
//       <button
//         onClick={handleRefresh}
//         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//       >
//         I have verified my email
//       </button>
//     </div>
//   );
// };

// export default VerifyEmail;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Ensure `user` is correctly destructured
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (!user) {
        toast.error("User not found. Please log in again.", {
          position: "top-center",
          autoClose: 5000,
        });
        navigate("/login");
        return;
      }

      try {
        setIsChecking(true); // Start the check
        await user.reload(); // Reload the user's data from Firebase
        if (user.emailVerified) {
          toast.success("Email verified! Redirecting to dashboard...", {
            position: "top-center",
            autoClose: 3000,
          });
          navigate("/"); // Redirect to the dashboard
        } else {
          setIsChecking(false); // Stop the check if not verified
        }
      } catch (err) {
        console.error("Error during email verification check:", err.message);
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    // Polling every 5 seconds to check for email verification
    const interval = setInterval(checkEmailVerification,5000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [user, navigate]);

  const handleRefresh = async () => {
    if (!user) {
      toast.error("User not found. Please log in again.", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    try {
      await user.reload(); // Reload the user's data
      if (user.emailVerified) {
        toast.success("Email verified! Redirecting to dashboard...", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      } else {
        toast.error("Your email is not verified yet. Please check your inbox.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error("Error during email verification:", err.message);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-center mb-6">
        A verification email has been sent to your email address. Please check
        your inbox and verify your email to proceed.
      </p>
      {isChecking ? (
        <p className="text-blue-500">Checking for email verification...</p>
      ) : (
        <button
          onClick={handleRefresh}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          I have verified my email
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
