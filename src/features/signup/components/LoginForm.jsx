import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loginUserUseCase } from "../usecase/loginusecase";

export const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    identifier: "", // can be email or phone number
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Determine if identifier is email or phone
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);
      const loginPayload = isEmail
        ? { email: formData.identifier, password: formData.password }
        : { phoneNumber: formData.identifier, password: formData.password };

      const { user, role, token } = await loginUserUseCase(loginPayload);

      // Save token and user
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Login Successful ✅",
        description: `Welcome back, ${user.firstName}!`,
      });

      onLoginSuccess && onLoginSuccess(user);
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
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};
