import { useQuery } from "@tanstack/react-query";
import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxioPublic from "../../hooks/useAxiosPublic";

const Navbar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [activeLink, setActiveLink] = useState(""); // For managing active link
  const navigate = useNavigate();
  const userEmail = user?.email;
  const axiosPublic = useAxioPublic();
  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/profile/${userEmail}`);
      return res.data;
    },

    enabled: !!userEmail, // Only run the query if the email exists
  });

  
  const toggleDashboardMenu = () => {
    setIsDashboardOpen((prev) => !prev);
    setIsProfileOpen(false); // Close Profile Menu
    setIsUserMenuOpen(false); // Close User Menu
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev);
    setIsDashboardOpen(false); // Close Dashboard Menu
    setIsUserMenuOpen(false); // Close User Menu
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // Handle logout error (optional)
      });
  };
  // Function to handle active link
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Set active link
    setIsProfileOpen(false); // Close profile menu on click
    setIsUserMenuOpen(false); // Close user menu on click
    setIsDashboardOpen(false); // Close dashboard menu on click
  };

  return (
    <div className="h-20 w-full fixed top-0 left-0 z-50 bg-[#001f45]">
      <div className="max-w-screen-xl mx-auto px-3 h-full flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          University Management
        </h2>

        {!user && (
          <div className="hidden md:flex gap-x-6 uppercase text-xs lg:text-sm font-medium text-white ml-auto ">
            <Link
              to="/"
              className={`hover:text-orange-400 duration-200 ${
                activeLink === "home" ? "text-orange-400" : ""
              }`}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`hover:text-orange-400 duration-200 ${
                activeLink === "login" ? "text-orange-400" : ""
              }`}
              onClick={() => handleLinkClick("login")}
            >
              Login
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* User Menu */}
          {!user && (
            <div className="relative lg:hidden md:hidden">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className=" text-white"
              >
                <Hamburger />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-4 lg:mt-2 w-80 bg-white rounded-lg shadow-lg p-4 px-10 z-10">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold text-xl">User Menu</span>
                  </div>
                  <ul className="mt-3 text-[18px] font-semibold">
                    <li className="py-2 hover:bg-gray-100 px-5 rounded-md">
                      <Link
                        to="/"
                        onClick={() => handleLinkClick("home")}
                        className={`${
                          activeLink === "home" ? "text-orange-400" : ""
                        }`}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100  px-5 rounded-md">
                      <Link
                        to="/login"
                        onClick={() => handleLinkClick("login")}
                        className={`${
                          activeLink === "login" ? "text-orange-400" : ""
                        }`}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100  px-5 rounded-md">
                      <Link
                        to="/register"
                        onClick={() => handleLinkClick("register")}
                        className={`${
                          activeLink === "register" ? "text-orange-400" : ""
                        }`}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {user?.emailVerified === true && (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="btn btn-ghost btn-circle avatar"
              >
                {/* <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 font-bold">
                  {user.image ? (
                    <img
                      alt="Profile Avatar"
                      src={userData.imgUrl}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div> */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 font-bold">
                  <img
                    alt="Profile Avatar"
                    src={ userData?.imgUrl}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 lg:mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-10 px-10">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold text-xl">Profile Menu</span>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="btn btn-accent"
                      aria-label="Close Profile Menu"
                    >
                      X
                    </button>
                  </div>
                  <ul className="mt-3 text-[18px] font-semibold">
                    <li className="py-2 hover:bg-gray-100 rounded-md px-4">
                      <Link
                        to="/update-profile"
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLinkClick("update-profile");
                        }}
                        className={`${
                          activeLink === "update-profile"
                            ? "text-orange-400"
                            : ""
                        }`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100 rounded-md px-4">
                      <Link
                        to="/settings"
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLinkClick("settings");
                        }}
                        className={`${
                          activeLink === "settings" ? "text-orange-400" : ""
                        }`}
                      >
                        Settings
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100 rounded-md px-4">
                      <Link
                        to="/changepassword"
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLinkClick("changepassword");
                        }}
                        className={`${
                          activeLink === "changepassword"
                            ? "text-orange-400"
                            : ""
                        }`}
                      >
                        Change Password
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100 rounded-md px-4">
                      <span
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 hover:text-red-800"
                      >
                        LogOut
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Dashboard Menu */}
          {user?.emailVerified === true && (
            <div className="relative">
              <button onClick={toggleDashboardMenu} className=" text-white">
                <MdDashboard size={30} />
              </button>
              {isDashboardOpen && (
                <div className="absolute right-0 mt-4 lg:mt-2 w-80  bg-white rounded-lg shadow-lg p-4 z-10 px-10">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold text-xl">
                      {" "}
                      Dashboard Menu
                    </span>
                    <button
                      onClick={() => setIsDashboardOpen(false)}
                      className="btn btn-accent"
                      aria-label="Close Profile Menu"
                    >
                      X
                    </button>
                  </div>
                  <ul className="mt-3 text-[18px] font-semibold ">
                    <li className="py-2 hover:bg-gray-100 rounded-md px-5 ">
                      <Link
                        to="/"
                        onClick={() => {
                          setIsDashboardOpen(false);
                          handleLinkClick("home");
                        }}
                        className={`${
                          activeLink === "home" ? "text-orange-400" : ""
                        }`}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100 rounded-md px-5 ">
                      <Link
                        to="/Overview"
                        onClick={() => {
                          setIsDashboardOpen(false);
                          handleLinkClick("Overview");
                        }}
                        className={`${
                          activeLink === "Overview" ? "text-orange-400" : ""
                        }`}
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// import Hamburger from "hamburger-react";
// import React, { useState } from "react";
// import { MdDashboard } from "react-icons/md";
// import { Link } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// const Navbar = () => {
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { user, logOut } = useAuth();
//   const [activeLink, setActiveLink] = useState(""); // For managing active link

//   const toggleDashboardMenu = () => {
//     setIsDashboardOpen((prev) => !prev);
//     setIsProfileOpen(false); // Close Profile Menu
//     setIsUserMenuOpen(false); // Close User Menu
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileOpen((prev) => !prev);
//     setIsDashboardOpen(false); // Close Dashboard Menu
//     setIsUserMenuOpen(false); // Close User Menu
//   };

//   // const toggleUserMenu = () => {
//   //   setIsUserMenuOpen((prev) => !prev);
//   //   setIsDashboardOpen(false); // Close Dashboard Menu
//   //   setIsProfileOpen(false); // Close Profile Menu
//   // };

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         // Handle successful logout (optional)
//       })
//       .catch((error) => {
//         // Handle logout error (optional)
//       });
//   };
//   // Function to handle active link
//   const handleLinkClick = (linkName) => {
//     setActiveLink(linkName); // Set active link
//     setIsProfileOpen(false); // Close profile menu on click
//     setIsUserMenuOpen(false); // Close user menu on click
//     setIsDashboardOpen(false); // Close dashboard menu on click
//   };

//   return (
//     <div className="h-20 w-full fixed top-0 left-0 z-50 bg-[#001f45]">
//       <div className="max-w-screen-xl mx-auto px-3 h-full flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-white">
//           University Management
//         </h2>

//         {!user && (
//           <div className="hidden md:flex gap-x-6 uppercase text-xs lg:text-sm font-medium text-white ml-auto ">
//             <Link
//               to="/"
//               className={`hover:text-orange-400 duration-200 ${
//                 activeLink === "home" ? "text-orange-400" : ""
//               }`}
//               onClick={() => handleLinkClick("home")}
//             >
//               Home
//             </Link>
//             <Link
//               to="/login"
//               className={`hover:text-orange-400 duration-200 ${
//                 activeLink === "login" ? "text-orange-400" : ""
//               }`}
//               onClick={() => handleLinkClick("login")}
//             >
//               Login
//             </Link>
//           </div>
//         )}

//         <div className="flex items-center gap-4">
//           {/* User Menu */}
//           {!user && (
//             <div className="relative lg:hidden md:hidden">
//               <button
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                 className=" text-white"
//               >
//                 <Hamburger />
//               </button>
//               {isUserMenuOpen && (
//                 <div className="fixed lg:absolute right-0 mt-4 lg:mt-2 w-screen lg:w-80 bg-white rounded-lg shadow-lg p-4 px-10 z-10">
//                   <div className="flex justify-between items-center pb-2 border-b">
//                     <span className="font-semibold text-xl">User Menu</span>
//                   </div>
//                   <ul className="mt-3 text-[18px] font-semibold">
//                     <li className="py-2 hover:bg-gray-100 px-5 rounded-md">
//                       <Link
//                         to="/"
//                         onClick={() => handleLinkClick("home")}
//                         className={`${
//                           activeLink === "home" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Home
//                       </Link>
//                     </li>
//                     <li className="py-2 hover:bg-gray-100  px-5 rounded-md">
//                       <Link
//                         to="/login"
//                         onClick={() => handleLinkClick("login")}
//                         className={`${
//                           activeLink === "login" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Login
//                       </Link>
//                     </li>
//                     <li className="py-2 hover:bg-gray-100  px-5 rounded-md">
//                       <Link
//                         to="/register"
//                         onClick={() => handleLinkClick("register")}
//                         className={`${
//                           activeLink === "register" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Register
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//           {user && (
//             <div className="relative">
//               <button
//                 onClick={toggleProfileMenu}
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 font-bold">
//                   {user.image ? (
//                     <img
//                       alt="Profile Avatar"
//                       src={user.image}
//                       className="w-10 h-10 rounded-full"
//                     />
//                   ) : (
//                     <span className="text-2xl font-bold">
//                       {user.displayName?.charAt(0).toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//               </button>
//               {isProfileOpen && (
//                 <div className="fixed lg:absolute right-0 mt-4 lg:mt-2 w-screen lg:w-80 bg-white rounded-lg shadow-lg p-4 z-10 px-10">
//                   <div className="flex justify-between items-center pb-2 border-b">
//                     <span className="font-semibold text-xl">Profile Menu</span>
//                     <button
//                       onClick={() => setIsProfileOpen(false)}
//                       className="btn btn-accent"
//                       aria-label="Close Profile Menu"
//                     >
//                       X
//                     </button>
//                   </div>
//                   <ul className="mt-3 text-[18px] font-semibold">
//                     <li className="py-2 hover:bg-gray-100 rounded-md px-4">
//                       <Link
//                         to="/profile"
//                         onClick={() => {
//                           setIsProfileOpen(false);
//                           handleLinkClick("profile");
//                         }}
//                         className={`${
//                           activeLink === "profile" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li className="py-2 hover:bg-gray-100 rounded-md px-4">
//                       <Link
//                         to="/settings"
//                         onClick={() => {
//                           setIsProfileOpen(false);
//                           handleLinkClick("settings");
//                         }}
//                         className={`${
//                           activeLink === "settings" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Settings
//                       </Link>
//                     </li>
//                     <li className="py-2 hover:bg-gray-100 rounded-md px-4">
//                       <span
//                         onClick={handleLogout}
//                         className="cursor-pointer text-red-600 hover:text-red-800"
//                       >
//                         LogOut
//                       </span>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Dashboard Menu */}
//           {user && (
//             <div className="relative">
//               <button onClick={toggleDashboardMenu} className=" text-white">
//                 <MdDashboard size={30} />
//               </button>
//               {isDashboardOpen && (
//                 <div className="fixed lg:absolute right-0 mt-4 lg:mt-2 w-screen lg:w-80 bg-white rounded-lg shadow-lg p-4 z-10 px-10">
//                   <div className="flex justify-between items-center pb-2 border-b">
//                     <span className="font-semibold text-xl">
//                       {" "}
//                       Dashboard Menu
//                     </span>
//                     <button
//                       onClick={() => setIsDashboardOpen(false)}
//                       className="btn btn-accent"
//                       aria-label="Close Profile Menu"
//                     >
//                       X
//                     </button>
//                   </div>
//                   <ul className="mt-3 text-[18px] font-semibold ">
//                     <li className="py-2 hover:bg-gray-100 rounded-md px-5 ">
//                       <Link
//                         to="/"
//                         onClick={() => {
//                           setIsDashboardOpen(false);
//                           handleLinkClick("home");
//                         }}
//                         className={`${
//                           activeLink === "home" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Home
//                       </Link>
//                     </li>
//                     <li className="py-2 hover:bg-gray-100 rounded-md px-5 ">
//                       <Link
//                         to="/Overview"
//                         onClick={() => {
//                           setIsDashboardOpen(false);
//                           handleLinkClick("Overview");
//                         }}
//                         className={`${
//                           activeLink === "Overview" ? "text-orange-400" : ""
//                         }`}
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
