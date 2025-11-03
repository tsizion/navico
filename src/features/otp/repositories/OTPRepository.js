// src/features/otp/repositories/OTPRepository.js
import { ApiEndpoints } from "../../../services/apiConstants";
import { apiService } from "../../../services/apiService";

export class OTPRepository {
  async verify(otp) {
    try {
      const payload = {
        email: otp.email,
        otp: otp.code, // backend expects 'otp'
      };

      const response = await apiService.post(ApiEndpoints.verifyOTP, payload);

      if (response?.status === "success") {
        console.log("[OTP Verify] Success:", response);
        // ✅ Return the full response including token and user
        return response;
      } else {
        console.warn("[OTP Verify] Failed:", response);
        throw new Error(response?.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("[OTP Verify] Error:", err.response?.data || err.message);
      throw err;
    }
  }

  async resend(email) {
    try {
      const response = await apiService.post(ApiEndpoints.resendOTP, { email });

      if (response?.status === "success") {
        console.log("[OTP Resend] Success:", response);
        return response;
      } else {
        throw new Error(response?.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("[OTP Resend] Error:", err.response?.data || err.message);
      throw err;
    }
  }
}
