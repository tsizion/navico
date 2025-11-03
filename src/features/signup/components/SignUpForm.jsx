import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadUI } from "../../fileupload/components/FileUpload";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    profilePicture: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (file) => {
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        profilePicture: formData.profilePicture || "default-profile.jpg",
      };

      console.log("👤 Creating User:", payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("User created successfully!");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
      />
      <Input
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      />

      <FileUploadUI
        onFileSelect={(file) =>
          setFormData({ ...formData, profilePicture: file })
        }
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};
