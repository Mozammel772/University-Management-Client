import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxioPublic from "../../hooks/useAxiosPublic";

const ProfileUpdate = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
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
    // enabled: !!userEmail, // Only run the query if the email exists
  });
  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle the state
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
 

  const handleProfileUpdate = async (data) => {
    console.log(data)
    try {
      setLoading(true);

      const updatedData = {
        name: data.name || userData.name,
        email: userData.email,
        image: image,
      };
      const res = await axiosSecure.patch(
        `/profile/${userData._id}`,
        updatedData
      );
      const updatedUser = res.data;
      console.log("Updated Data:", updatedUser);
      alert("Profile updated successfully!");
      setValue("name", updatedUser.name || "");
      setImage(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 min-h-screen">
        <div className="loader border-t-4 border-blue-500 w-10 h-10 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-red-500">
          Failed to load data. Please try again later.
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="bg-white p-8
       rounded-lg shadow-lg w-[80%]"
      >
        <div className="sticky top-0 bg-white z-10 ">
          {" "}
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>{" "}
            <button
              onClick={handleEditClick}
              className={`text-2xl font-semibold text-center mb-4 ${
                isEditing ? "text-orange-500" : "text-gray-500"
              }`}
            >
              <FaEdit />
            </button>
          </div>
        </div>

        <div className="divider"></div>

        {isEditing ? (
          <>
            {" "}
            <form
              onSubmit={handleSubmit(handleProfileUpdate)}
              className="space-y-4"
            >
              {/* Profile Image */}
              <div className="relative mb-4">
                <img
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer"
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  Upload Image
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {/* Name Field */}
                <div className="form-control">
                  <label className="label" htmlFor="name">
                    <span className="label-text text-lg font-semibold">
                      Name :
                    </span>
                  </label>
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={userData?.name || "unknown"}
                      rules={{
                        required: "Name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message: "Name can only contain letters and spaces",
                        },
                      }}
                      render={({ field, fieldState }) => {
                        const { error } = fieldState;
                        return (
                          <div className="relative">
                            <input
                              {...field}
                              id="name"
                              className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                                error
                                  ? "border-red-500"
                                  : field.value
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter Your Name"
                              aria-invalid={!!error}
                              aria-describedby="name-feedback"
                            />
                            {error ? (
                              <p
                                id="name-feedback"
                                className="text-red-500 text-sm mt-1"
                              >
                                {error.message}
                              </p>
                            ) : field.value ? (
                              <p
                                id="name-feedback"
                                className="text-green-500 text-sm mt-1"
                              >
                                Name is valid!
                              </p>
                            ) : null}
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text text-lg font-semibold">
                      Email :
                    </span>
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={userData?.email || userEmail || ""}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          id="email"
                          className="w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200"
                          readOnly
                        />
                      </div>
                    )}
                  />
                </div>
                {/* Address Field */}
                <div className="form-control">
                  <label className="label" htmlFor="address">
                    <span className="label-text text-lg font-semibold">
                      Address :
                    </span>
                  </label>
                  <div>
                    <Controller
                      name="address"
                      control={control}
                      defaultValue={userData?.address || ""}
                      rules={{
                        required: "Address is required",
                      }}
                      render={({ field, fieldState }) => {
                        const { error } = fieldState;
                        return (
                          <div className="relative">
                            <input
                              {...field}
                              id="address"
                              className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                                error
                                  ? "border-red-500"
                                  : field.value
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter Your Address"
                              aria-invalid={!!error}
                              aria-describedby="address-feedback"
                            />
                            {error ? (
                              <p
                                id="address-feedback"
                                className="text-red-500 text-sm mt-1"
                              >
                                {error.message}
                              </p>
                            ) : field.value ? (
                              <p
                                id="address-feedback"
                                className="text-green-500 text-sm mt-1"
                              >
                                Address is valid!
                              </p>
                            ) : null}
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="form-control">
                  <label className="label" htmlFor="phone">
                    <span className="label-text text-lg font-semibold">
                      Phone Number :
                    </span>
                  </label>
                  <div>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue={userData?.phone || ""}
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit phone number",
                        },
                      }}
                      render={({ field, fieldState }) => {
                        const { error } = fieldState;
                        return (
                          <div className="relative">
                            <input
                              {...field}
                              id="phone"
                              className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                                error
                                  ? "border-red-500"
                                  : field.value
                                  ? "border-green-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter Your Phone Number"
                              aria-invalid={!!error}
                              aria-describedby="phone-feedback"
                            />
                            {error ? (
                              <p
                                id="phone-feedback"
                                className="text-red-500 text-sm mt-1"
                              >
                                {error.message}
                              </p>
                            ) : field.value ? (
                              <p
                                id="phone-feedback"
                                className="text-green-500 text-sm mt-1"
                              >
                                Phone number is valid!
                              </p>
                            ) : null}
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Update Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Profile Image */}
            <div className="relative mb-4">
              <img
                className="w-32 h-32 rounded-full object-cover mx-auto"
                src={userData?.imgUrl}
                alt="Profile"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-md">
                <div>
                  <span className="text-xl font-bold text-gray-500">
                    Name :
                  </span>{" "}
                  <br />
                  <span className="text-md font-bold">{userData?.name}</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-md">
                <div>
                  <span className="text-xl font-bold text-gray-500">
                    Email :
                  </span>{" "}
                  <br />
                  <span className="text-md font-bold">{userData?.email}</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-md">
                <div>
                  <span className="text-xl font-bold text-gray-500">
                    Address :
                  </span>{" "}
                  <br />
                  <span className="text-md font-bold">{"Mozammel Hosen"}</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-md">
                <div>
                  <span className="text-xl font-bold text-gray-500">
                    Phone :
                  </span>{" "}
                  <br />
                  <span className="text-md font-bold">{"Mozammel Hosen"}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileUpdate;
