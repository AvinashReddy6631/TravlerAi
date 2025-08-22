"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import AuthModal from "./AuthModal";

export default function NavBar() {
  const { user, logout, isInitialized } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    };

    if (isUserMenuOpen || isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserMenuOpen, isMobileMenuOpen]);

  // Don't render auth-dependent content until mounted and initialized
  if (!mounted || !isInitialized) {
    return (
      <nav className="glass sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TravelHub</h1>
                <p className="text-xs text-blue-200 -mt-1">AI Powered</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Flights
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Trains
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Buses
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Hotels
              </a>
            </div>

            {/* Loading placeholder for auth section */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="glass sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TravelHub</h1>
                <p className="text-xs text-blue-200 -mt-1">AI Powered</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Flights
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Trains
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Buses
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                Hotels
              </a>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="flex items-center space-x-3 text-white hover:text-blue-200 transition-colors duration-200"
                  >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                    />
                    <span className="hidden md:block font-medium">{user.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg py-2 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-blue-200">{user.email}</p>
                      </div>
                      <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200">
                        My Bookings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200">
                        Profile Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200">
                        Travel History
                      </a>
                      <div className="border-t border-white/10 mt-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-white/10 transition-colors duration-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 btn-animate"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden text-white hover:text-blue-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Home
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Flights
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Trains
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Buses
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                  Hotels
                </a>
                {!user && (
                  <div className="flex space-x-3 pt-3 border-t border-white/10">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="flex-1 text-white hover:text-blue-200 transition-colors duration-200 font-medium py-2"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => openAuthModal('signup')}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialMode={authModal.mode}
      />
    </>
  );
}
