import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  resendOTPUseCase,
  verifyOTPUseCase,
} from "../usecases/verifyOTPUseCase";
import { useToast } from "@/hooks/use-toast";

export const VerifyOTP = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const inputsRef = useRef([]);
  const { toast } = useToast(); // use your custom toast

  // Countdown timer effect
  useEffect(() => {
    setCanResend(false);
    setResendTimer(30);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(resendCount < 3); // enable only if attempts < 3
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, resendCount]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
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
      await verifyOTPUseCase({ email, code: otpCode });
      toast({ title: "Success ✅", description: "OTP verified successfully!" });
      onVerify(otpCode);
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
      setResendTimer(30); // restart countdown
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
