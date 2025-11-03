// src/features/user/usecases/loginUseCase.js
import { User } from "../entities/User";
import { UserRepository } from "../repositories/authRepository";

const userRepo = new UserRepository();

export const loginUserUseCase = async (loginData) => {
  const { email, phoneNumber, password } = loginData;

  if ((!email && !phoneNumber) || !password) {
    throw new Error("Email or phone number and password must be provided.");
  }

  // Call repository
  const {
    user: userData,
    role,
    token,
  } = await userRepo.login({ email, phoneNumber, password });

  // Create User entity with optional token
  const user = new User({
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    profilePicture: userData.profilePicture,
    emailVerified: userData.emailVerified,
    token: token,
  });

  return { user, role, token };
};
