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

  // Helper to get headers for request
  _getHeaders(withToken = true) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const token = localStorage.getItem("authToken"); // <-- always get latest token
    if (withToken && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  // -----------------------------
  // CRUD Operations
  // -----------------------------
  async get(path, params = {}, withToken = true) {
    try {
      const response = await this.instance.get(path, {
        params,
        headers: this._getHeaders(withToken),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(path, data = {}, withToken = true) {
    try {
      const response = await this.instance.post(path, data, {
        headers: this._getHeaders(withToken),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(path, data = {}, withToken = true) {
    try {
      const response = await this.instance.put(path, data, {
        headers: this._getHeaders(withToken),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch(path, data = {}, withToken = true) {
    try {
      const response = await this.instance.patch(path, data, {
        headers: this._getHeaders(withToken),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(path, withToken = true) {
    try {
      const response = await this.instance.delete(path, {
        headers: this._getHeaders(withToken),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // -----------------------------
  // File Upload
  // -----------------------------
  async upload(path, files, withToken = true) {
    try {
      const formData = new FormData();
      if (Array.isArray(files)) {
        files.forEach((file) => formData.append("files", file));
      } else {
        formData.append("file", files);
      }

      const response = await this.instance.post(path, formData, {
        headers: {
          ...this._getHeaders(withToken),
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Singleton instance
export const apiService = new ApiService();
