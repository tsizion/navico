// src/features/otp/entities/OTP.js

export class OTP {
  constructor({ email, code }) {
    this.email = email;
    this.code = code; // 6-digit OTP
  }

  isValid() {
    return /^\d{6}$/.test(this.code);
  }
}
