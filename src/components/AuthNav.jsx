import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle } from "lucide-react";

const AuthNav = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

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
      {/* Search Bar */}
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

      {/* Icons */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Start Consulting Button */}
      <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
        Start Consulting
      </Button>

      {/* Profile Picture */}
      <div className="relative" ref={menuRef}>
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        />

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
              Settings
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthNav;
