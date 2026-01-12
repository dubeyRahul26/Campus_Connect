import { useState, useRef, useEffect, type JSX } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signout } from "../store/authSlice";

export default function UserNavbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  /* Close dropdown / menu when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }

      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Reset UI on auth change */
  useEffect(() => {
    if (!isAuthenticated) {
      setMenuOpen(false);
      setUserDropdownOpen(false);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMenuOpen(false);
    await dispatch(signout());
    navigate("/login");
  };

  /* ---------------- ROLE-BASED MENU ---------------- */

  const studentMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
    { name: "Applications", path: "/applications" },
    { name: "Interview Prep", path: "/interview-prep" },
    { name: "Resume Analyzer", path: "/resume-analyzer" },
  ];

  const adminMenu = [
    { name: "Admin Dashboard", path: "/admin/dashboard" },
    { name: "Interview Prep", path: "/interview-prep" }, //  ADDED
    { name: "Jobs", path: "/jobs" },
  ];

  const menuItems = user?.role === "admin" ? adminMenu : studentMenu;

  /* ------------------------------------------------ */

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50"
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/community.png"
              className="h-8"
              alt="CampusConnect Logo"
            />
            <span className="text-xl font-semibold text-teal-600">
              CampusConnect
            </span>
          </Link>

          {/* Desktop Menu */}
          {isAuthenticated && (
            <ul className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`group relative font-medium transition-colors ${
                        isActive
                          ? "text-teal-600"
                          : "text-gray-700 hover:text-teal-600"
                      }`}
                    >
                      {item.name}

                      <span
                        className="
                          absolute -bottom-1 left-1/2 h-[2px] w-full
                          bg-teal-600 rounded-full
                          scale-x-0 origin-center
                          transition-transform duration-300 ease-out
                          group-hover:scale-x-100
                          group-hover:left-0
                          group-hover:origin-left
                        "
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-100 focus:ring-2 focus:ring-teal-300"
                >
                  <img
                    src="/polar-bear.png"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-200">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Update Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-teal-600 border border-teal-500 rounded-lg hover:bg-teal-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {isAuthenticated && (
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-lg hover:bg-teal-50 focus:ring-2 focus:ring-teal-200"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && menuOpen && (
          <div className="md:hidden pb-4">
            <ul className="mt-2 space-y-2 bg-white rounded-2xl shadow-md p-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium ${
                      location.pathname === item.path
                        ? "text-teal-600"
                        : "text-gray-700 hover:bg-teal-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
