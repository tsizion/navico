// src/features/fileupload/usecase/fileUploadUseCase.js

import { FileRepository } from "../repositories/fileRepository";

const fileRepo = new FileRepository();

export const uploadSingleFileUseCase = async (file) => {
  return await fileRepo.uploadSingle(file);
};

export const uploadMultipleFilesUseCase = async (files) => {
  return await fileRepo.uploadMultiple(files);
};
