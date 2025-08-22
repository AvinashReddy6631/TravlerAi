"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { login, signup, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const newErrors: string[] = [];
    if (!formData.email) newErrors.push('Email is required');
    if (!formData.password) newErrors.push('Password is required');
    
    if (mode === 'signup') {
      if (!formData.name) newErrors.push('Name is required');
      if (!formData.phone) newErrors.push('Phone is required');
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Passwords do not match');
      }
      if (formData.password.length < 6) {
        newErrors.push('Password must be at least 6 characters');
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
        if (!success) {
          setErrors(['Invalid email or password']);
        }
      } else {
        success = await signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone
        });
        if (!success) {
          setErrors(['Failed to create account']);
        }
      }

      if (success) {
        onClose();
        setFormData({
          email: '',
          password: '',
          name: '',
          phone: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setErrors(['An error occurred. Please try again.']);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Join AI-Travellers'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-white/10 rounded-2xl p-1 mb-8">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              mode === 'login'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              mode === 'signup'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
            {errors.map((error, index) => (
              <p key={index} className="text-red-300 text-sm">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field (Signup only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required={mode === 'signup'}
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-white font-semibold text-sm">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Phone Field (Signup only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required={mode === 'signup'}
              />
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-white font-semibold text-sm">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Confirm Password Field (Signup only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required={mode === 'signup'}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>{mode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        {mode === 'login' && (
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
            <p className="text-blue-200 text-sm font-semibold mb-2">Demo Credentials:</p>
            <p className="text-blue-200 text-xs">Email: john@example.com</p>
            <p className="text-blue-200 text-xs">Password: password123</p>
          </div>
        )}

        {/* Social Login Options */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-blue-200 text-sm mb-4">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
              <span>🔵</span>
              <span>Google</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
              <span>📱</span>
              <span>Phone</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}