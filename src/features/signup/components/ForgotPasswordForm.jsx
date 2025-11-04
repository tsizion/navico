import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your API to send OTP
      // await sendOtp({ email });

      toast({
        title: "OTP Sent ✅",
        description: `Check your email: ${email}`,
      });

      // Optionally reset input
      setEmail("");
    } catch (err) {
      toast({
        title: "Error ❌",
        description: err.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
      <button
        className="text-sm text-blue-500 hover:underline"
        onClick={onBack}
      >
        Back to Login
      </button>
    </div>
  );
};
