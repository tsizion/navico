import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, User, Settings, LogOut, Search } from "lucide-react";
import { CheckExpertStatusUseCase } from "../features/expertRegister/usecase/CheckExpertStatusUseCase";
import { ExpertRepository } from "../features/expertRegister/repository/ExpertRepository";

// ✅ Clean Architecture Imports

// ✅ Initialize dependencies (outside component for performance optimization)
const expertRepository = new ExpertRepository();
const checkExpertStatusUseCase = new CheckExpertStatusUseCase(expertRepository);

const AuthNav = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Check expert status using UseCase
  // outside component
  const expertRepository = new ExpertRepository();
  const checkExpertStatusUseCase = new CheckExpertStatusUseCase(
    expertRepository
  );

  useEffect(() => {
    const fetchExpertStatus = async () => {
      if (!user?.id) return console.log("[AuthNav] No user ID");

      console.log("[AuthNav] Fetching expert status for user:", user.id);
      const result = await checkExpertStatusUseCase.execute(user.id);
      console.log("[AuthNav] Result from UseCase:", result);
      setIsExpert(result);
    };

    fetchExpertStatus();
  }, [user]);

  const handleConsultRoute = () => {
    if (!user) return navigate("/login");

    if (isExpert) {
      navigate("/expert-dashboard");
    } else {
      navigate("/apply-expert");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex items-center w-full gap-4">
      {/* Desktop Search & Icons */}
      <div className="hidden sm:flex items-center flex-1 justify-center gap-4">
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <Button
          size="sm"
          className="bg-primary text-white hover:bg-primary/90"
          onClick={handleConsultRoute}
        >
          {isExpert ? "Go to Dashboard" : "Start Consulting"}
        </Button>
      </div>

      {/* Avatar + Dropdown */}
      <div className="relative ml-auto" ref={menuRef}>
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        />

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50 p-2 flex flex-col gap-2">
            {/* Mobile options */}
            {isMobile && (
              <>
                <div className="flex items-center gap-2 px-2 py-1 border rounded-md">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-sm focus:outline-none"
                  />
                </div>

                <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md">
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>

                <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md">
                  <HelpCircle className="w-4 h-4" />
                  Help
                </button>

                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={handleConsultRoute}
                >
                  {isExpert ? "Go to Dashboard" : "Start Consulting"}
                </Button>
              </>
            )}

            {/* Profile */}
            <button
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            {/* Settings */}
            <button
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            {/* Logout */}
            <button
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthNav;
