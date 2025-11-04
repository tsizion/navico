import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import navicoLogo from "@/assets/navico-logo.png";
import { validateTokenService } from "../services/authService";
import GuestNav from "./GuestNav";
import AuthNav from "./AuthNav";

const Navigation = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setAuth({ loading: false, isAuthenticated: false, user: null });
        return;
      }
      try {
        await validateTokenService();
        const user = JSON.parse(localStorage.getItem("user"));
        setAuth({ loading: false, isAuthenticated: true, user });
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuth({ loading: false, isAuthenticated: false, user: null });
      }
    };
    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuth({ isAuthenticated: false, user: null, loading: false });
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center">
        {/* Logo on the left */}
        <div className="flex items-center gap-2 mr-10">
          <img src={navicoLogo} alt="Navico" className="h-8 w-auto" />
          <span className="text-xl font-bold text-foreground">Navico</span>
        </div>

        {/* Other items can decide their own position */}
        <div className="flex-1 flex items-center justify-center">
          {auth.loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : auth.isAuthenticated ? (
            <AuthNav user={auth.user} onLogout={handleLogout} />
          ) : (
            <GuestNav navigate={navigate} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
