// src/services/validateTokenService.js

import { ApiEndpoints } from "./apiConstants";
import { apiService } from "./apiService";

export const validateTokenService = async () => {
  try {
    // Pass `true` to ensure Authorization token is sent
    const response = await apiService.get(ApiEndpoints.validatetoken, {}, true);
    return response; // Already response.data from ApiService 🎯
  } catch (error) {
    console.error("[Token Validation Error]", error);
    throw error;
  }
};
