"use client";

import NavBar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import HotelSearch from "@/components/HotelSearch";
import Chatbot from "@/components/Chatbot";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/lib/auth";
import { FakeDB } from "@/lib/database";
import { useState } from "react";

// ✅ MapView must be imported dynamically
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const popularDestinations = FakeDB.getPopularDestinations();
  const [activeSection, setActiveSection] = useState<'travel' | 'hotels'>('travel');

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <NavBar />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background with overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200")'
            }}
          ></div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in-up">
                Explore the World with
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> AI-Travellers</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto fade-in-up">
                Discover amazing destinations, book flights, trains, buses, and hotels with our AI-powered travel platform
              </p>
            </div>

            {/* Section Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-white/10 rounded-2xl p-1">
                <button
                  onClick={() => setActiveSection('travel')}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeSection === 'travel'
                      ? "bg-white text-purple-600 shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  🚀 Travel Booking
                </button>
                <button
                  onClick={() => setActiveSection('hotels')}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeSection === 'hotels'
                      ? "bg-white text-purple-600 shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  🏨 Hotel Booking
                </button>
              </div>
            </div>

            {/* Search Forms */}
            <div className="max-w-4xl mx-auto">
              {activeSection === 'travel' ? <SearchForm /> : <HotelSearch />}
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Popular Destinations</h2>
              <p className="text-xl text-blue-200">Handpicked destinations for your next adventure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="glass hover-lift rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                      <p className="text-blue-200">Starting from ₹{destination.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 btn-animate">
                      Explore Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose AI-Travellers?</h2>
              <p className="text-xl text-blue-200">Experience the future of travel booking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Search</h3>
                <p className="text-blue-200">Smart recommendations based on your preferences and travel history</p>
              </div>

              <div className="glass p-8 rounded-2xl text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Secure Payments</h3>
                <p className="text-blue-200">Multiple payment options with bank-level security and encryption</p>
              </div>

              <div className="glass p-8 rounded-2xl text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
                <p className="text-blue-200">Round-the-clock customer support with AI chatbot assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Explore Destinations</h2>
              <p className="text-xl text-blue-200">Interactive map to discover your next adventure</p>
            </div>
            <div className="glass rounded-2xl overflow-hidden">
              <MapView />
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
    </AuthProvider>
  );
}
