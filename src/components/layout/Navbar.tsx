import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// Comment out the problematic import
// import { useAuth } from "../../contexts/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import logo from "../../assets/pmllogo2.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Comment out the problematic hook usage
  // const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // For now, use a placeholder value
  const isAuthenticated = false;
  const user = null;
  const logout = () => console.log("Logout clicked");

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/login";

    switch (user.role) {
      case "student":
        return "/student/dashboard";
      case "university":
        return "/university/dashboard";
      case "agent":
        return "/agent/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/login";
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-16 w-auto" src={logo} alt="PML Academy" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/programs"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Programs
            </Link>
            <Link
              to="/universities"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Universities
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                >
                  <FiUser className="mr-1" />
                  <span>{user.firstName}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={`/${user.role}/profile`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <FiLogOut className="mr-2" />
                          Logout
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <FiLogIn className="mr-1" />
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/programs"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Programs
            </Link>
            <Link
              to="/universities"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Universities
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to={`/${user.role}/profile`}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  <div className="flex items-center">
                    <FiLogOut className="mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/auth/login"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
