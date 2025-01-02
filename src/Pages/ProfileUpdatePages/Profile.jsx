import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProfileUpdate = () => {
  const { user } = useAuth();
  const userEmail = user?.email; // Extract email from the user object

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-users/${userEmail}`);
      return res.data;
    },

    enabled: !!userEmail, // Only run the query if the email exists
  });
  console.log(userData);

  if (isLoading) return <div>Loading user data...</div>;
  if (isError) return <div>Error loading user data!</div>;

  const handleProfileUpdate = async (data) => {
    try {
      setLoading(true);

      // Create the updated data object
      const updatedData = {
        name: data.name || userData.name, // Fallback to the current value if no new value
        email: userData.email, // Ensure the email doesn't change
        image: image, // Include the image file if there is one
      };

      // Perform the PATCH request to update user data
      const res = await axiosSecure.patch(
        `/register-users/${userData._id}`,
        updatedData
      );

      // Assuming the response contains the updated user data
      const updatedUser = res.data;

      console.log("Updated Data:", updatedUser);

      // Update UI and state after successful update
      alert("Profile updated successfully!");
      setValue("name", updatedUser.name || ""); // Update form field with the new name
      setImage(null); // Clear the image after successful update
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>{" "}
          <h2 className="text-2xl font-semibold text-center mb-4"><FaEdit/></h2>
        </div>
        <div className="divide divide-dotted divide-pink-800"></div>
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

          {/* Name Field */}
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text text-lg font-semibold">Name :</span>
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue={userData?.name || ""}
              rules={{
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              }}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <input
                    {...field}
                    id="name"
                    className={`w-full border rounded px-3 py-2 text-gray-700 transition-colors hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-purple-200 ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your name"
                    aria-invalid={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text text-lg font-semibold">Email :</span>
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

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
