// src/features/auth/pages/AuthPage.jsx
import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { VerifyOTP } from "../../otp/components/VerifyOTP";
import { LoginForm } from "../components/LoginForm";
import { useToast } from "@/hooks/use-toast";
import navicoLogo from "@/assets/navico-logo.png";
import navicoLogoWhite from "@/assets/navico-logo-white.png";

export const AuthPage = ({ defaultView = "signup" }) => {
  const [view, setView] = useState(defaultView); // "signup", "login", "otp"
  const [emailForOTP, setEmailForOTP] = useState(null);
  const { toast } = useToast();

  const handleSignupSuccess = (email) => {
    console.log("✅ Signup success for:", email);
    setEmailForOTP(email);
    setView("otp");
  };

  const handleOTPVerify = (otp) => {
    console.log(`🔒 OTP entered for ${emailForOTP}: ${otp}`);
    toast({
      title: "OTP Verified ✅",
      description: `Email ${emailForOTP} verified successfully!`,
    });
    setView("signup");
    setEmailForOTP(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT HALF - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-2/5 bg-background px-8 py-10 min-h-screen">
        <img src={navicoLogo} alt="Navico" className="h-8 w-auto" />

        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
            {view === "login"
              ? "Welcome Back"
              : view === "signup"
              ? "Create an Account"
              : "Verify OTP"}
          </h2>

          {view === "signup" && <SignUpForm onSuccess={handleSignupSuccess} />}
          {view === "otp" && emailForOTP && (
            <VerifyOTP email={emailForOTP} onVerify={handleOTPVerify} />
          )}
          {view === "login" && <LoginForm />}

          <p className="text-sm text-center mt-4 text-gray-600">
            {view === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => setView("signup")}
                >
                  Sign Up
                </button>
              </>
            ) : view === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => setView("login")}
                >
                  Login
                </button>
              </>
            ) : null}
          </p>
        </div>
      </div>

      {/* RIGHT HALF - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-3/5 flex-shrink-0 bg-primary text-white px-6 min-h-screen">
        <div className="text-center">
          <img
            src={navicoLogoWhite}
            alt="Company Logo"
            className="h-24 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold mb-3 text-white">Welcome to Navico</h2>
          <p className="text-lg opacity-80">
            Empowering professionals, connecting opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};
