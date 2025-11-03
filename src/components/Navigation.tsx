import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import navicoLogo from "@/assets/navico-logo.png";
import { useNavigate } from "react-router-dom";
import { validateTokenService } from "../services/authService";

const Navigation = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
    role: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setAuth({
          loading: false,
          isAuthenticated: false,
          user: null,
          role: null,
        });
        return;
      }

      try {
        const data = await validateTokenService(); // axios interceptor uses token
        const user = JSON.parse(localStorage.getItem("user"));
        const role = data.role || "user";

        setAuth({ loading: false, isAuthenticated: true, user, role });
      } catch (err) {
        console.log("Token invalid ❌", err.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuth({
          loading: false,
          isAuthenticated: false,
          user: null,
          role: null,
        });
      }
    };

    checkToken();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img src={navicoLogo} alt="Navico" className="h-8 w-auto" />
            <span className="text-xl font-bold text-foreground">Navico</span>
          </div>

          {/* Links (only for unauthenticated users) */}
          {!auth.isAuthenticated && (
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#how-it-works"
                className="text-foreground hover:text-primary transition-colors"
              >
                How It Works
              </a>
              <a
                href="#experts"
                className="text-foreground hover:text-primary transition-colors"
              >
                Find Experts
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary transition-colors"
              >
                Testimonials
              </a>
            </div>
          )}

          {/* Auth Buttons / User Info */}
          <div className="flex items-center gap-3">
            {auth.loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : auth.isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Profile Picture */}
                {auth.user?.profilePicture ? (
                  <img
                    src={auth.user.profilePicture}
                    alt={`${auth.user.firstName} ${auth.user.lastName}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                    {auth.user?.firstName?.[0] || "U"}
                  </div>
                )}

                {/* Full Name */}
                <span className="text-sm font-medium">
                  Welcome, {auth.user?.firstName} {auth.user?.lastName}!
                </span>

                <Button
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user");
                    setAuth({
                      isAuthenticated: false,
                      user: null,
                      role: null,
                      loading: false,
                    });
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
