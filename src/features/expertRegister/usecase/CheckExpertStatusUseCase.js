// src/features/expertRegister/usecase/CheckExpertStatusUseCase.js
export class CheckExpertStatusUseCase {
  constructor(expertRepository) {
    this.expertRepository = expertRepository; // dependency injected
  }

  async execute(userId) {
    console.log("[CheckExpertStatusUseCase] Executing with userId:", userId); // debug
    return await this.expertRepository.checkExpertStatus(userId);
  }
}
