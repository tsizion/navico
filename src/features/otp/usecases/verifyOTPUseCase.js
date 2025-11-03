// src/features/otp/usecase/verifyOTPUseCase.js

import { OTP } from "../entites/OTP";
import { OTPRepository } from "../repositories/OTPRepository";

const otpRepo = new OTPRepository();

export const verifyOTPUseCase = async ({ email, code }) => {
  const otp = new OTP({ email, code });

  if (!otp.isValid()) {
    throw new Error("Invalid OTP format. Must be 6 digits.");
  }

  return await otpRepo.verify(otp);
};

export const resendOTPUseCase = async (email) => {
  return await otpRepo.resend(email);
};
