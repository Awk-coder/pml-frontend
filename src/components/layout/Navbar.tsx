import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome } from "react-icons/fi";
import Logo from "../../components/common/Logo";
import { signOutUser } from "../../utils/authUtils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, profile, signOut, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    if (profile && profile.role) {
      navigate(`/dashboard/${profile.role}`);
    } else {
      // Fallback to student dashboard if role not known
      navigate("/dashboard/student");
      console.warn("User profile or role not found, using default dashboard");
    }
  };

  // Replace your existing sign out function with this:
  const handleSignOut = async (e) => {
    e.preventDefault();
    console.log("Sign out button clicked");
    await signOutUser();
  };

  // Function to determine active link class
  const linkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "text-white bg-gray-800"
        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - Fixed: Don't wrap Logo in Link when Logo already has linkTo */}
          <Logo linkTo="/" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link to="/programs" className={linkClasses("/programs")}>
              Programs
            </Link>
            <Link to="/universities" className={linkClasses("/universities")}>
              Universities
            </Link>
            <Link to="/about" className={linkClasses("/about")}>
              About
            </Link>
            <Link to="/contact" className={linkClasses("/contact")}>
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
                >
                  <span>{profile?.first_name}</span>
                  <FiUser />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-1 z-10 border border-gray-800">
                    <button
                      onClick={handleDashboardClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <FiHome className="mr-2" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <FiLogOut className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  className="text-white hover:text-blue-400 py-2 transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-block"
                  onClick={() => navigate("/register/landing")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm mt-2">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/programs"
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Programs
              </Link>
              <Link
                to="/universities"
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Universities
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-gray-800">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={handleDashboardClick}
                      className="w-full text-left flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                    >
                      <FiHome className="mr-2" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center text-white hover:bg-gray-800 px-3 py-2 rounded-lg"
                    >
                      <FiLogOut className="mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      className="text-white hover:bg-gray-800 px-3 py-2 rounded-lg text-left"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Log In
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-left"
                      onClick={() => navigate("/register/landing")}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
