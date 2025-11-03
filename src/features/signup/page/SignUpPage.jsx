import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { Button } from "@/components/ui/button";
import navicoLogo from "@/assets/navico-logo.png";
import navicoLogoWhite from "@/assets/navico-logo-white.png";

export const SignUpPage = () => {
  const [isLogin, setIsLogin] = useState(false); // for future toggle

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT HALF */}
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-primary text-white px-10 min-h-screen md:min-h-full">
        <div className="text-center">
          <img
            src={navicoLogoWhite}
            alt="Company Logo"
            className=" h-24 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold mb-3">Welcome to Our Navico</h2>
          <p className="text-lg opacity-80">
            Empowering professionals, connecting opportunities.
          </p>
        </div>
      </div>

      {/* RIGHT HALF */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-background px-8 py-10 min-h-screen md:min-h-full">
        {/* Logo */}
        <img src={navicoLogo} alt="Navico" className="h-8 w-auto mb-6" />

        <div className="bg-white p-6 rounded-2xl shadow w-full">
          <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>

          <SignUpForm />

          {/* Toggle Link */}
          <p className="text-sm text-center mt-4 text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => setIsLogin(false)}
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
                  onClick={() => setIsLogin(true)}
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
