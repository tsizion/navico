import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // import your custom toast

export const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast(); // use custom toast

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with your login use case / API call
      console.log("Logging in with:", formData);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        
        // Success toast
        toast({
          title: "Login Successful ✅",
          description: `Welcome back, ${formData.email}!`,
        });

        onLoginSuccess && onLoginSuccess();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Please try again.");

      // Error toast
      toast({
        title: "Login Failed ❌",
        description: err.message || "Invalid credentials",
        variant: "destructive",
      });

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
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
