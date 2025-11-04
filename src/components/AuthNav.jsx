import { Button } from "@/components/ui/button";

const AuthNav = ({ user, onLogout }) => (
  <div className="flex items-center gap-2">
    {user?.profilePicture ? (
      <img
        src={user.profilePicture}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-8 h-8 rounded-full object-cover"
      />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
        {user?.firstName?.[0] || "U"}
      </div>
    )}
    <span className="text-sm font-medium">
      Welcome, {user?.firstName} {user?.lastName}!
    </span>
    <Button size="sm" onClick={onLogout}>
      Logout
    </Button>
  </div>
);

export default AuthNav;
