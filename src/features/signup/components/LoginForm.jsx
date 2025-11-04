import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loginUserUseCase } from "../usecase/loginusecase";
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    identifier: "", // can be email or phone number
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate(); // 👈 initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);
      const loginPayload = isEmail
        ? { email: formData.identifier, password: formData.password }
        : { phoneNumber: formData.identifier, password: formData.password };

      const { user, role, token } = await loginUserUseCase(loginPayload);

      // Save token and user
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Now log after saving
      console.log("Token saved:", localStorage.getItem("authToken"));
      console.log("User saved:", JSON.parse(localStorage.getItem("user")));

      toast({
        title: "Login Successful ✅",
        description: `Welcome back, ${user.firstName}!`,
      });

      // Call parent callback
      onLoginSuccess && onLoginSuccess(user);

      // 👇 Navigate to dashboard or any route
      navigate("/"); // change "/dashboard" to your desired route
    } catch (err) {
      setError(err.message);
      toast({
        title: "Login Failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="identifier"
        type="text"
        placeholder="Email or Phone Number"
        value={formData.identifier}
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};
