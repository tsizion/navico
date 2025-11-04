import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, User, Settings, LogOut, Search } from "lucide-react";

const AuthNav = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center w-full gap-4">
      {/* Desktop view: search + icons + button */}
      <div className="hidden sm:flex items-center flex-1 justify-center gap-4">
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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

        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Start Consulting
        </Button>
      </div>

      {/* Avatar (always rightmost) */}
      <div className="relative ml-auto" ref={menuRef}>
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        />

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50 p-2 flex flex-col gap-2">
            {/* Mobile-only: render only if screen is small */}
            {isMobile && (
              <>
                <div className="flex flex-col gap-2">
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
                    <span className="text-sm">Notifications</span>
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Help</span>
                  </button>

                  <Button
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Start Consulting
                  </Button>
                </div>
              </>
            )}

            {/* Common: Profile, Settings, Logout */}
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md text-red-500">
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
