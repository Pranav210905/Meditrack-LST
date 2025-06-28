import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Sun, Moon, Monitor, Stethoscope } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const getThemeIcon = () => {
    const ThemeIcon = themeOptions.find(option => option.value === theme)?.icon || Monitor;
    return <ThemeIcon className="h-5 w-5" />;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-kelly-600 to-forest-600 p-2 rounded-lg group-hover:from-kelly-500 group-hover:to-forest-500 transition-all duration-200">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-kelly-600 to-forest-600 bg-clip-text text-transparent">
              MediTrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                <Link
                  to={`/${userData?.role}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                {userData?.role === 'patient' && (
                  <Link
                    to="/patient/appointments"
                    className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                  >
                    Appointments
                  </Link>
                )}
                {userData?.role === 'doctor' && (
                  <Link
                    to="/doctor/appointments"
                    className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                  >
                    Manage Appointments
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/features"
                  className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                >
                  Features
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                >
                  About
                </Link>
              </>
            )}

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 transition-colors duration-200"
              >
                {getThemeIcon()}
              </button>
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value as any);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                          theme === option.value ? 'text-kelly-600 dark:text-kelly-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{userData?.firstName}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-medium">{userData?.firstName} {userData?.lastName}</p>
                      <p className="text-gray-500 dark:text-gray-400 capitalize">{userData?.role}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-4 py-2 rounded-lg font-medium hover:from-kelly-500 hover:to-forest-500 transition-all duration-200 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-4">
              {currentUser ? (
                <>
                  <Link
                    to={`/${userData?.role}`}
                    className="block text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {userData?.role === 'patient' && (
                    <Link
                      to="/patient/appointments"
                      className="block text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Appointments
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 dark:text-red-400 font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/features"
                    className="block text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    className="block text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/login"
                    className="block text-gray-700 dark:text-gray-300 hover:text-kelly-600 dark:hover:text-kelly-400 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-4 py-2 rounded-lg font-medium hover:from-kelly-500 hover:to-forest-500 transition-all duration-200 shadow-sm text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;