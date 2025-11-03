import React from "react";
import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          padding: "12px 16px",
          borderRadius: "10px",
          fontWeight: "500",
          fontSize: "14px",
        },
      }}
    />
  );
};
