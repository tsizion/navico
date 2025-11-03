// src/features/user/usecase/signupUseCase.js

import { UserRepository } from "../repositories/authRepository";
import { User } from "../entities/User";

const userRepo = new UserRepository();

export const signupUserUseCase = async (userData) => {
  const user = new User(userData); // create User entity
  return await userRepo.signup(user); // call repository
};
