import { authRepository } from "../repositories/authRepository";

export const signupUseCase = async (userData) => {
  if (userData.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const user = await authRepository.signupUser(userData);
  return user;
};
