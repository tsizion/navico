// src/features/user/repositories/UserRepository.js

import { apiService } from "../../../services/apiService";
import { ApiEndpoints } from "../../../services/apiConstants";
import { User } from "../entities/User";

export class UserRepository {
  async signup(user) {
    try {
      // Convert User entity to plain object
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        profilePicture: user.profilePicture,
      };

      const response = await apiService.post(ApiEndpoints.signup, payload);

      if (response?.status === "success" || response?.statusCode === 201) {
        console.log("[Signup] Success:", response);
        return new User(response.data.user); // return User entity
      } else {
        console.warn("[Signup] Failed:", response);
        throw new Error(response?.message || "Signup failed");
      }
    } catch (err) {
      console.error("[Signup] Error:", err.response?.data || err.message);
      throw err;
    }
  }
  async login({ email, phoneNumber, password }) {
    try {
      const payload = { email, phoneNumber, password };
      const response = await apiService.post(ApiEndpoints.login, payload);

      if (response?.status === "success") {
        // Create a User entity from response.user and attach token
        const user = new User({
          id: response.user._id,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber,
          profilePicture: response.user.profilePicture,
          emailVerified: response.user.emailVerified,
          token: response.token, // optional token
        });

        return { user, role: response.role, token: response.token };
      } else {
        throw new Error(response?.message || "Login failed");
      }
    } catch (err) {
      throw err;
    }
  }
}
