// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import React, { createContext, useEffect, useState } from "react";
// import useAxioPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
// import { app } from "../firebase/firebase.init";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const googleProvider = new GoogleAuthProvider();
//   const axiosPublic = useAxioPublic();

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };
//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };
//   const updateProfileURL = (name, photoURL) => {
//     setLoading(true);
//     return updateProfile(auth, name, photoURL);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//       if (currentUser) {
//         const userInfo = { email: currentUser.email };
//         axiosPublic.post("/jwt", userInfo).then((res) => {
//           const user = res.data;
//           if (user.token) {
//             localStorage.setItem("access-token", user.token);
//           }
//         });
//       } else {
//         localStorage.removeItem("access-token");
//       }
//       console.log("currentUser: ", currentUser);
//     });
//     return () => {
//       return unsubscribe;
//     };
//   }, [axiosPublic]);
//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     logOut,
//     updateProfileURL,
//     googleSignIn,
//   };
//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { jwtDecode } from "jwt-decode";
// import React, { createContext, useEffect, useState } from "react";

// import useAxioPublic from "../../hooks/useAxiosPublic";
// import { app } from "./firebase.init";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const googleProvider = new GoogleAuthProvider();
//   const axiosPublic = useAxioPublic();

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const logOut = () => {
//     setLoading(true);
//     localStorage.removeItem("access-token"); // Ensure the token is removed on logout
//     return signOut(auth);
//   };
//   const forgetPassword = (email) => {
//     setLoading(true);
//     return sendPasswordResetEmail(auth, email);
//   };
//   const updateProfileURL = (name, photoURL) => {
//     setLoading(true);
//     return updateProfile(auth, name, photoURL);
//   };

//   const setAutoLogout = (token) => {
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Current time in seconds
//       const timeLeft = decodedToken.exp - currentTime;

//       if (timeLeft > 0) {
//         // Set a timer to log out the user when the token expires
//         setTimeout(() => {
//           logOut(); // Automatically log out the user
//           // alert("Session expired. Please log in again.");
//           window.location.href = "/login"; // Redirect to login page
//           // navigate("/login");
//         }, timeLeft * 1000); // Convert to milliseconds
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//       if (currentUser) {
//         const userInfo = { email: currentUser.email };
//         axiosPublic.post("/jwt", userInfo).then((res) => {
//           const user = res.data;
//           if (user.token) {
//             localStorage.setItem("access-token", user.token);
//             setAutoLogout(user.token); // Call setAutoLogout to manage token expiration
//           }
//         });
//       } else {
//         localStorage.removeItem("access-token");
//       }
//       console.log("currentUser: ", currentUser);
//     });
//     return () => {
//       return unsubscribe;
//     };
//   }, [axiosPublic]);

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     forgetPassword,
//     logOut,
//     updateProfileURL,
//     googleSignIn,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;



import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { jwtDecode } from "jwt-decode"; // Correct the import
import React, { createContext, useEffect, useState } from "react";
import useAxioPublic from "../../hooks/useAxiosPublic";
import { app } from "./firebase.init";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxioPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token"); // Remove the token on logout
    return signOut(auth);
  };

  const forgetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const updateProfileURL = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth, name, photoURL);
  };

  const setAutoLogout = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      const timeLeft = decodedToken.exp - currentTime;

      if (timeLeft > 0) {
        // Set a timer to log out the user when the token expires
        setTimeout(() => {
          logOut(); // Automatically log out the user
          window.location.href = "/login"; // Redirect to login page
        }, timeLeft * 1000); // Convert to milliseconds
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          const user = res.data;
          if (user.token) {
            localStorage.setItem("access-token", user.token);
            setAutoLogout(user.token); // Call setAutoLogout to manage token expiration
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      console.log("currentUser: ", currentUser);
    });
    return () => {
      return unsubscribe;
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    forgetPassword,
    logOut,
    updateProfileURL,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

