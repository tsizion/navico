// src/services/validateTokenService.js

import { ApiEndpoints } from "./apiConstants";
import { apiService } from "./apiService";

export const validateTokenService = async () => {
  try {
    const response = await apiService.get(ApiEndpoints.validatetoken);
    return response; // Already response.data from ApiService 🎯
  } catch (error) {
    console.error("[Token Validation Error]", error);
    throw error;
  }
};
