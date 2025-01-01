import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ProfileUpdate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfileUpdate = (data) => {
    setLoading(true);

    // Handle image update logic here (upload to your server or cloud storage)
    // Just printing the data to the console for now
    console.log("Updated Data:", data.name, image);

    // Simulate successful profile update
    setLoading(false);
    setError("");  // Clear any previous errors
    alert("Profile updated successfully!");

    // Reset form after successful update
    setValue("name", data.name);
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>

        <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
          {/* Profile Image */}
          <div className="relative mb-4">
            <img
              className="w-32 h-32 rounded-full object-cover mx-auto"
              src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/150"}
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

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
