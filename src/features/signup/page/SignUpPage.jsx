import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { VerifyOTP } from "../../otp/components/VerifyOTP";
import navicoLogo from "@/assets/navico-logo.png";
import navicoLogoWhite from "@/assets/navico-logo-white.png";
import { LoginForm } from "../components/LoginForm";
import { useToast } from "@/hooks/use-toast";

export const SignUpPage = () => {
  const [view, setView] = useState("signup"); // "signup", "otp", "login"
  const [emailForOTP, setEmailForOTP] = useState(null);

  const { toast } = useToast();

  const handleSignupSuccess = (email) => {
    console.log("✅🎉 Signup Success! Email received:", email);
    setEmailForOTP(email);
    setView("otp");
    console.log("🔑 Switching view to OTP screen...");
  };

  const handleOTPVerify = (otp) => {
    console.log(`🔒🛡 OTP entered for ${emailForOTP}: ${otp}`);

    toast({
      title: "OTP Verified ✅",
      description: `Email ${emailForOTP} verified successfully!`,
    });

    setView("signup");
    setEmailForOTP(null);
    console.log("🔁 Resetting view to signup and clearing emailForOTP...");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT HALF - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-2/5 bg-background px-8 py-10 min-h-screen">
        <img src={navicoLogo} alt="Navico" className="h-8 w-auto " />

        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
            {view === "login"
              ? "Welcome Back"
              : view === "signup"
              ? "Create an Account"
              : ""}
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

      {/* RIGHT HALF - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-3/5 flex-shrink-0 bg-primary text-white px-6 min-h-screen">
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
    </div>
  );
};
