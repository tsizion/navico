import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploader } from "react-drag-drop-files";
import { UploadCloud, Loader2, X } from "lucide-react";
import { signupUserUseCase } from "../usecase/signupUseCase";
import { uploadSingleFileUseCase } from "../../fileupload/usecase/fileUploadUseCase";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const fileTypes = ["JPG", "PNG", "JPEG"];

export const SignUpForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null); // store the actual file
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false); // default invisible

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file) => {
    setSelectedFile(file); // show preview immediately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let profilePictureUrl = "default-profile.jpg";

      // Upload file only during signup
      if (selectedFile) {
        const uploaded = await uploadSingleFileUseCase(selectedFile);
        profilePictureUrl = uploaded.url;

        toast({
          title: "Upload Successful ✅",
          description: "Your file has been uploaded.",
        });
      }

      const payload = {
        ...formData,
        profilePicture: profilePictureUrl,
      };

      console.log("✉️ [SignUpForm] Submitting email:", formData.email);

      const createdUser = await signupUserUseCase(payload);
      console.log("🎉 [SignUpForm] User created:", createdUser);

      onSuccess && onSuccess(formData.email);
    } catch (err) {
      console.error("❌ [SignUpForm] Signup failed:", err.message);
      setError(err.message || "Signup failed. Please try again.");
      toast({
        title: "Signup Failed ❌",
        description: err.message || "Unable to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <div className="relative">
        <Input
          name="password"
          type={showPassword ? "text" : "password"} // toggles visibility
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* File Upload & Preview */}
      <div className="w-full border-2 border-dashed rounded-xl cursor-pointer bg-gray-50/40 h-44 flex items-center justify-center">
        {!selectedFile ? (
          <FileUploader
            handleChange={handleFileChange}
            types={fileTypes}
            name="file"
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="w-7 h-7 text-gray-500" />
              <p className="text-sm text-gray-600 font-medium">
                Click or Drag & Drop
              </p>
              <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
            </div>
          </FileUploader>
        ) : (
          <div className="flex items-center w-full px-4 py-3">
            <div className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(selectedFile)} // show preview immediately
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="absolute top-0 right-0 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};
