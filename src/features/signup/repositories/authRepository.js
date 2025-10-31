import { apiService } from "../../../services/apiService";
import { ApiEndpoints } from "../../../services/apiConstants";
import { User } from "../entities/User";

export const authRepository = {
  signupUser: async (userData) => {
    const response = await apiService.post(ApiEndpoints.createClient, userData);
    return new User(response); // Map API response to User entity
  },
};
