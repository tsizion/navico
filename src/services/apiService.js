import axios from "axios";
import { API_BASE_URL } from "./apiConstants";

class ApiService {
  constructor() {
    this.authToken = localStorage.getItem("authToken") || null;

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
      console.log(
        `[API Request] ${config.method.toUpperCase()} ${config.url}`,
        config
      );
      return config;
    });

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => {
        console.log(`[API Response] ${response.config.url}`, response.data);
        return response;
      },
      (error) => {
        console.error(
          `[API Error] ${error.config?.url}`,
          error.response?.data || error.message
        );
        return Promise.reject(
          error.response?.data || { message: error.message || "Unknown error" }
        );
      }
    );
  }

  // Token management
  setToken(token) {
    this.authToken = token;
    localStorage.setItem("authToken", token);
  }

  clearToken() {
    this.authToken = null;
    localStorage.removeItem("authToken");
  }

  // Generic HTTP methods
  async get(path, params = {}) {
    try {
      const response = await this.instance.get(path, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(path, data = {}) {
    try {
      const response = await this.instance.post(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(path, data = {}) {
    try {
      const response = await this.instance.put(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch(path, data = {}) {
    try {
      const response = await this.instance.patch(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(path) {
    try {
      const response = await this.instance.delete(path);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // -----------------------------
  // Unified file upload method
  // -----------------------------
  async upload(path, files) {
    try {
      console.log("[File Upload] URL:", path, "Files:", files);

      const formData = new FormData();

      if (Array.isArray(files)) {
        files.forEach((file) => formData.append("files", file));
      } else {
        formData.append("file", files);
      }

      const response = await this.instance.post(path, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("[File Upload Response]", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "[File Upload Error]",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

// Singleton instance
export const apiService = new ApiService();
