import React from "react";
import { SignUpForm } from "../components/SignUpForm";

export const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
          Create an Account
        </h2>
        <SignUpForm />
      </div>
    </div>
  );
};
