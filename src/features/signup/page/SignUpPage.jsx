import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { VerifyOTP } from "../../otp/components/VerifyOTP";
import navicoLogo from "@/assets/navico-logo.png";
import navicoLogoWhite from "@/assets/navico-logo-white.png";
import { LoginForm } from "../components/LoginForm";

export const SignUpPage = () => {
  const [view, setView] = useState("signup"); // "signup", "otp", "login"
  const [emailForOTP, setEmailForOTP] = useState(null);

  const handleSignupSuccess = (email) => {
    console.log("✅🎉 Signup Success! Email received:", email);
    setEmailForOTP(email);
    setView("otp"); // show OTP screen
    console.log("🔑 Switching view to OTP screen...");
  };

  const handleOTPVerify = (otp) => {
    console.log(`🔒🛡 OTP entered for ${emailForOTP}: ${otp}`);
    alert("🎊 OTP Verified Successfully!");
    setView("signup"); // reset to signup or redirect
    setEmailForOTP(null);
    console.log("🔁 Resetting view to signup and clearing emailForOTP...");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT HALF */}
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-primary text-white px-10 min-h-screen md:min-h-full">
        <div className="text-center">
          <img
            src={navicoLogoWhite}
            alt="Company Logo"
            className="h-24 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold mb-3 text-white">
            Welcome to Navico
          </h2>
          <p className="text-lg opacity-80">
            Empowering professionals, connecting opportunities.
          </p>
        </div>
      </div>

      {/* RIGHT HALF */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-background px-8 py-10 min-h-screen md:min-h-full">
        <img src={navicoLogo} alt="Navico" className="h-8 w-auto mb-6" />

        <div className="bg-white p-6 rounded-2xl shadow w-full">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
            {view === "login"
              ? "Welcome Back"
              : view === "signup"
              ? "Create an Account"
              : ""}
          </h2>
          {/* Conditional rendering */}
          {view === "signup" && <SignUpForm onSuccess={handleSignupSuccess} />}
          {view === "otp" && emailForOTP && (
            <VerifyOTP email={emailForOTP} onVerify={handleOTPVerify} />
          )}
          {view === "login" && <LoginForm />} {/* your login form */}
          {/* Toggle Link */}
          <p className="text-sm text-center mt-4 text-gray-600">
            {view === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setView("signup");
                    console.log("🔄 Switching view to Signup...");
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setView("login");
                    console.log("🔄 Switching view to Login...");
                  }}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
