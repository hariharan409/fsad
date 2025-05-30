import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth.hook";
import { useAuthContext } from "@/context/AuthContext";


const Navbar = () => {
  const logout = useLogout();
  const user = useAuthContext();

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          FSAD Portal
        </Link>

        {/* Right side nav links */}
        <div className="flex items-center gap-4">
          <Link to="/students" className="text-sm font-medium hover:underline">
            Students
          </Link>
          <Link to="/drives" className="text-sm font-medium hover:underline">
            Drives
          </Link>
          <Link to="/reports" className="text-sm font-medium hover:underline">
            Reports
          </Link>

    {user && (
        <Button variant="destructive" onClick={logout}>Logout</Button>
      )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
