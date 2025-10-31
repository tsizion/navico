import axios from "axios";
import { API_BASE_URL } from "./apiConstants";

class ApiService {
  constructor() {
    this.authToken = null;

    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Add token automatically to requests
    this.instance.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers["Authorization"] = `Bearer ${this.authToken}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(
          error.response?.data || { message: error.message || "Unknown error" }
        );
      }
    );
  }

  // Set token for authenticated requests
  setToken(token) {
    this.authToken = token;
  }

  // Clear token on logout
  clearToken() {
    this.authToken = null;
  }

  // GET request
  async get(path, params = {}) {
    try {
      const response = await this.instance.get(path, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // POST request
  async post(path, data = {}) {
    try {
      const response = await this.instance.post(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PUT request
  async put(path, data = {}) {
    try {
      const response = await this.instance.put(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PATCH request
  async patch(path, data = {}) {
    try {
      const response = await this.instance.patch(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // DELETE request
  async delete(path) {
    try {
      const response = await this.instance.delete(path);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // File upload
  async uploadFile(path, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.instance.post(path, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Multiple files upload
  async uploadFiles(path, files = []) {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await this.instance.post(path, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Singleton instance
export const apiService = new ApiService();
