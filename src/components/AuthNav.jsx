import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center gap-4">
      {/* Consultant Button */}
      <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
        Consultant
      </Button>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-3 pr-10 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

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
