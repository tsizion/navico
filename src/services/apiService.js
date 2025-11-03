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

    // Automatically add token
    this.instance.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers["Authorization"] = `Bearer ${this.authToken}`;
      }
      console.log(
        `[API Request] ${config.method.toUpperCase()} ${config.url}`,
        config.data || config.params
      );
      return config;
    });

    // Response logging
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

  // -----------------------------
  // CRUD Operations
  // -----------------------------
  async get(path, params = {}) {
    try {
      const response = await this.instance.get(path, { params });
      console.log(`[GET] ${path} -> Response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `[GET] ${path} -> Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async post(path, data = {}) {
    try {
      console.log(`[POST] ${path} -> Payload:`, data);
      const response = await this.instance.post(path, data);
      console.log(`[POST] ${path} -> Response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `[POST] ${path} -> Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async put(path, data = {}) {
    try {
      console.log(`[PUT] ${path} -> Payload:`, data);
      const response = await this.instance.put(path, data);
      console.log(`[PUT] ${path} -> Response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `[PUT] ${path} -> Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async patch(path, data = {}) {
    try {
      console.log(`[PATCH] ${path} -> Payload:`, data);
      const response = await this.instance.patch(path, data);
      console.log(`[PATCH] ${path} -> Response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `[PATCH] ${path} -> Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async delete(path) {
    try {
      const response = await this.instance.delete(path);
      console.log(`[DELETE] ${path} -> Response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `[DELETE] ${path} -> Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // -----------------------------
  // File Upload
  // -----------------------------
  async upload(path, files) {
    try {
      console.log(`[UPLOAD] ${path} -> Files:`, files);

      const formData = new FormData();
      if (Array.isArray(files)) {
        files.forEach((file) => formData.append("files", file));
      } else {
        formData.append("file", files);
      }

      const response = await this.instance.post(path, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(`[UPLOAD] ${path} -> Response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `[UPLOAD] ${path} -> Error:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

// Singleton instance
export const apiService = new ApiService();
