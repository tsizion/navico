import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  resendOTPUseCase,
  verifyOTPUseCase,
} from "../usecases/verifyOTPUseCase";

export const VerifyOTP = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendTimer, setResendTimer] = useState(30); // countdown in seconds
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    // Start countdown when OTP screen mounts
    setCanResend(false);
    setResendTimer(30);

    const timerInterval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setCanResend(true); // enable resend button
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [email]); // reset timer if email changes

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
      alert("Enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await verifyOTPUseCase({ email, code: otpCode });
      onVerify(otpCode);
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError(null);

    try {
      await resendOTPUseCase(email);
      alert("OTP resent successfully!");
      console.log("🔄 OTP resent");

      // Reset timer
      setCanResend(false);
      setResendTimer(30);
      const timerInterval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
            ? "Resend OTP"
            : `Resend in ${resendTimer}s`}
        </button>
      </form>
    </div>
  );
};
