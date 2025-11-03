import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  resendOTPUseCase,
  verifyOTPUseCase,
} from "../usecases/verifyOTPUseCase";
import { useToast } from "@/hooks/use-toast";
import { User } from "../../signup/entities/User";

export const VerifyOTP = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const inputsRef = useRef([]);
  const { toast } = useToast();

  // Countdown timer effect
  useEffect(() => {
    setCanResend(false);
    setResendTimer(30);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(resendCount < 3);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, resendCount]);

  // Handle typing / paste
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    // Paste multiple digits
    if (value.length > 1) {
      const newOtp = value.split("").slice(0, 6);
      setOtp((prev) => {
        const updated = [...prev];
        newOtp.forEach((v, i) => {
          if (i < 6) updated[i] = v;
        });
        return updated;
      });
      const lastIndex = Math.min(newOtp.length - 1, 5);
      inputsRef.current[lastIndex].focus();
      return;
    }

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputsRef.current[index + 1].focus();
  };

  // Backspace handling
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        // Clear current box
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move back and clear previous
        inputsRef.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Paste handling
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasteData) return;

    const newOtp = [...otp];
    pasteData.split("").forEach((v, i) => {
      if (i < 6) newOtp[i] = v;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pasteData.length - 1, 5);
    inputsRef.current[lastIndex].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast({
        title: "OTP Error ❌",
        description: "Enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTPUseCase({ email, code: otpCode });

      const user = new User({
        id: response.user._id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        password: response.user.password || "",
        profilePicture: response.user.profilePicture,
      });

      // Save token and user
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Token saved:", localStorage.getItem("authToken"));
      console.log("User saved:", JSON.parse(localStorage.getItem("user")));

      toast({
        title: "Success ✅",
        description: `Email ${user.email} verified successfully!`,
      });

      onVerify && onVerify(otpCode);
    } catch (err) {
      toast({
        title: "Verification Failed ❌",
        description: err.message || "OTP verification failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCount >= 3) {
      toast({
        title: "Max Resends ⚠️",
        description: "You have reached the maximum number of OTP resends",
        variant: "destructive",
      });
      return;
    }

    setResendLoading(true);
    try {
      await resendOTPUseCase(email);
      toast({
        title: "OTP Sent 🔄",
        description: "A new OTP has been sent to your email",
      });
      setResendCount(resendCount + 1);
      setCanResend(false);
      setResendTimer(30);
    } catch (err) {
      toast({
        title: "Resend Failed ❌",
        description: err.message || "Failed to resend OTP",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4 text-foreground">
        Verify Your Email
      </h2>
      <p className="text-sm text-center mb-6 text-gray-600">
        An OTP has been sent to <span className="font-medium">{email}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center"
      >
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:border-primary"
            />
          ))}
        </div>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend || resendLoading}
          className={`text-sm mt-2 font-medium ${
            canResend
              ? "text-primary hover:underline"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {resendLoading
            ? "Resending..."
            : canResend
            ? `Resend OTP (${resendCount + 1}/3)`
            : `Resend in ${resendTimer}s`}
        </button>
      </form>
    </div>
  );
};
