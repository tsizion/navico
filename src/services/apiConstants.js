export const API_BASE_URL = "https://expertly-1.onrender.com/api/v1";

export const ApiEndpoints = {
  // User
  getUser: "/user", // GET user info
  updateUser: "/user/update", // PATCH/PUT user info
  signup: "/user", // GET user info
  verifyOTP: "/user/verify-otp", // GET user info
  resendOTP: "/user/resend-otp", // GET user info

  // Expert
  getExperts: "/expert", // GET all experts
  getExpertById: (id) => `/expert/${id}`,
  createExpert: "/expert", // POST new expert

  // Client
  getClients: "/client", // GET all clients
  getClientById: (id) => `/client/${id}`,
  createClient: "/client", // POST new client

  // Admin
  getAdmins: "/admin",
  adminAction: "/admin/action", // example placeholder

  // Authentication
  login: "/login",
  logout: "/logout",

  // File Upload
  uploadSingleFile: "/file/upload/single",
  uploadMultipleFiles: "/file/upload/multiple",
  getFile: (filename) => `/file/${filename}`,

  // Category
  getCategories: "/category",
  getCategoryById: (id) => `/category/${id}`,
  createCategory: "/category",

  // Payment
  createPayment: "/payment",
  getEarnings: "/earnings",

  // Schedule & Consultation
  createSchedule: "/schedule",
  getSchedules: "/schedule",
  getScheduleById: (id) => `/schedule/${id}`,

  // Appointments
  createAppointment: "/appointment",
  getAppointments: "/appointment",
  getAppointmentById: (id) => `/appointment/${id}`,

  // Reports
  getReports: "/report",
  getReportById: (id) => `/report/${id}`,

  // Ratings
  getRatings: "/rating",
  rateExpert: "/rating",

  // Account
  getAccount: "/account",
  updateAccount: "/account/update",
};
