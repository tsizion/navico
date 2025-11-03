import { validateTokenService } from "../services/authService";

const validateToken = async () => {
  setAuth(prev => ({ ...prev, loading: true }));

  const token = localStorage.getItem("authToken");

  if (!token) {
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
      loading: false,
    });
    return;
  }

  try {
    const data = await validateTokenService(); // ✅ no token argument now

    setAuth({
      isAuthenticated: true,
      user: data.user,
      role: data.role,
      loading: false,
    });
  } catch (err) {
    console.log("Token invalid ❌", err.message);

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
      loading: false,
    });
  }
};
