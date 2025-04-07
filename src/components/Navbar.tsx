import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Menu, X, User, LogIn, LogOut } from "lucide-react";
import { auth, isAdmin } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logout Successful",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description:
          error.message || "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isUserAdmin = isAdmin(user?.email);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Droplet className="h-8 w-8 text-bloodred" />
              <span className="font-bold text-xl ml-2 text-slate">
                BloodConnect
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 text-slate hover:text-bloodred transition-colors"
            >
              Home
            </Link>
            <Link
              to="/donate"
              className="px-3 py-2 text-slate hover:text-bloodred transition-colors"
            >
              Donate
            </Link>
            <Link
              to="/find"
              className="px-3 py-2 text-slate hover:text-bloodred transition-colors"
            >
              Find Blood
            </Link>
            <Link
              to="/medicines"
              className="px-3 py-2 text-slate hover:text-bloodred transition-colors"
            >
              Medicines
            </Link>
            {isUserAdmin && (
              <Link
                to="/admin/medicines"
                className="px-3 py-2 text-slate hover:text-bloodred transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            <Link to="/donate">
              <Button className="bg-bloodred hover:bg-bloodred/90">
                Donate Now
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate hover:text-bloodred focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              to="/"
              className="block px-3 py-2 text-slate hover:text-bloodred"
            >
              Home
            </Link>
            <Link
              to="/donate"
              className="block px-3 py-2 text-slate hover:text-bloodred"
            >
              Donate
            </Link>
            <Link
              to="/find"
              className="block px-3 py-2 text-slate hover:text-bloodred"
            >
              Find Blood
            </Link>
            <Link
              to="/medicines"
              className="block px-3 py-2 text-slate hover:text-bloodred"
            >
              Medicines
            </Link>
            {isUserAdmin && (
              <Link
                to="/admin/medicines"
                className="block px-3 py-2 text-slate hover:text-bloodred"
              >
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-slate hover:text-bloodred"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-slate hover:text-bloodred"
              >
                Login
              </Link>
            )}
            <Link
              to="/donate"
              className="block px-3 py-2 bg-bloodred text-white rounded-md"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
