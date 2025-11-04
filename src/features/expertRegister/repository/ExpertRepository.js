// src/features/expertRegister/repository/ExpertRepository.js
import { ApiEndpoints } from "../../../services/apiConstants";
import { apiService } from "../../../services/apiService";

export class ExpertRepository {
  async checkExpertStatus(userId) {
    try {
      const url = ApiEndpoints.isUserExpert(userId);
      console.log("[ExpertRepository] Calling API:", url); // debug URL

      const response = await apiService.get(url);

      console.log("[ExpertRepository] API response:", response); // debug response
      return response?.isExpert ?? false; // return boolean
    } catch (err) {
      console.error("[ExpertRepository] Error:", err);
      throw err;
    }
  }
}
