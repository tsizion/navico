// src/features/fileupload/repositories/FileRepository.js
import { ApiEndpoints } from "../../../services/apiConstants";
import { apiService } from "../../../services/apiService";
import { FileModel } from "../domain/Filemodel";

export class FileRepository {
  // Single file upload
  async uploadSingle(file) {
    try {
      const response = await apiService.upload(
        ApiEndpoints.uploadSingleFile,
        file
      );

      // response from apiService.upload() already contains data
      // Here we check backend HTTP-like status field or real code if returned
      if (
        response?.status === "success" ||
        response?.statusCode === 200 ||
        response?.statusCode === 201
      ) {
        console.log("[Upload Single] Success:", response);
        return new FileModel(response.data.file);
      } else {
        console.warn("[Upload Single] Failed:", response);
        throw new Error(response?.message || "File upload failed");
      }
    } catch (error) {
      console.error(
        "[Upload Single] Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Multiple files upload
  async uploadMultiple(files) {
    try {
      const response = await apiService.upload(
        ApiEndpoints.uploadMultipleFiles,
        files
      );

      if (
        response?.status === "success" ||
        response?.statusCode === 200 ||
        response?.statusCode === 201
      ) {
        console.log("[Upload Multiple] Success:", response);
        return response.data.files.map((f) => new FileModel(f));
      } else {
        console.warn("[Upload Multiple] Failed:", response);
        throw new Error(response?.message || "Multiple file upload failed");
      }
    } catch (error) {
      console.error(
        "[Upload Multiple] Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Get all files
  async getAll() {
    try {
      const response = await apiService.get("/file");

      if (response?.status === "success" || response?.statusCode === 200) {
        console.log("[Get All Files] Success:", response);
        return response.data.files.map((f) => new FileModel(f));
      } else {
        console.warn("[Get All Files] Failed:", response);
        throw new Error(response?.message || "Fetching files failed");
      }
    } catch (error) {
      console.error(
        "[Get All Files] Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
