"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { FakeDB, TravelOption } from "@/lib/database";
import PaymentModal from "./PaymentModal";

export default function SearchForm() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("flight");
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    class: "economy"
  });
  const [results, setResults] = useState<TravelOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    travelOption: TravelOption | null;
  }>({
    isOpen: false,
    travelOption: null
  });

  const tabs = [
    { id: "flight", name: "Flights", icon: "✈️" },
    { id: "train", name: "Trains", icon: "🚆" },
    { id: "bus", name: "Buses", icon: "🚌" }
  ];

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use the fake database to get realistic results
      const searchResults = FakeDB.searchTravel(
        searchData.from,
        searchData.to,
        activeTab,
        searchData.departDate ? new Date(searchData.departDate) : undefined
      );
      
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleBookNow = (travelOption: TravelOption) => {
    if (!user) {
      // Show login prompt if user is not logged in
      alert("Please sign in to book your travel!");
      return;
    }

    // Open payment modal for logged-in users
    setPaymentModal({
      isOpen: true,
      travelOption: travelOption
    });
  };

  const handlePaymentSuccess = (bookingId: string) => {
    // Show success message
    alert(`Booking confirmed! Your booking ID is: ${bookingId}`);
    // Clear search results
    setResults([]);
    // Reset search form
    setSearchData({
      from: "",
      to: "",
      departDate: "",
      returnDate: "",
      passengers: 1,
      class: "economy"
    });
  };

  const updateSearchData = (field: string, value: any) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="glass p-8 rounded-3xl shadow-2xl">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/10 rounded-2xl p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Location Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">From</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchData.from}
                  onChange={(e) => updateSearchData("from", e.target.value)}
                  placeholder="Departure city"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  required
                />
                <div className="absolute left-4 top-4 text-blue-300">
                  📍
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">To</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchData.to}
                  onChange={(e) => updateSearchData("to", e.target.value)}
                  placeholder="Destination city"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  required
                />
                <div className="absolute left-4 top-4 text-blue-300">
                  🎯
                </div>
              </div>
            </div>
          </div>

          {/* Date and Passenger Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Departure Date</label>
              <input
                type="date"
                value={searchData.departDate}
                onChange={(e) => updateSearchData("departDate", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {activeTab === "flight" && (
              <div className="space-y-2">
                <label className="text-white font-semibold text-sm">Return Date</label>
                <input
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => updateSearchData("returnDate", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Passengers</label>
              <select
                value={searchData.passengers}
                onChange={(e) => updateSearchData("passengers", parseInt(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num} className="bg-purple-900">
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Class Selection */}
          {(activeTab === "flight" || activeTab === "train") && (
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">
                {activeTab === "flight" ? "Travel Class" : "Class"}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activeTab === "flight" ? 
                  ["economy", "premium", "business", "first"].map(classType => (
                    <button
                      key={classType}
                      type="button"
                      onClick={() => updateSearchData("class", classType)}
                      className={`py-3 px-4 rounded-xl font-semibold capitalize transition-all duration-200 ${
                        searchData.class === classType
                          ? "bg-white text-purple-600 shadow-lg"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {classType}
                    </button>
                  )) :
                  ["sleeper", "3ac", "2ac", "1ac"].map(classType => (
                    <button
                      key={classType}
                      type="button"
                      onClick={() => updateSearchData("class", classType)}
                      className={`py-3 px-4 rounded-xl font-semibold uppercase transition-all duration-200 ${
                        searchData.class === classType
                          ? "bg-white text-purple-600 shadow-lg"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {classType}
                    </button>
                  ))
                }
              </div>
            </div>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Search {tabs.find(t => t.id === activeTab)?.name}</span>
              </>
            )}
          </button>
        </form>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Available Options</h3>
            <div className="grid gap-6">
              {results.map((option) => (
                <div key={option.id} className="glass p-6 rounded-xl hover-lift">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    {/* Route & Operator */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{option.operator}</h4>
                      <p className="text-blue-200">{option.from} → {option.to}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white ml-1">{option.rating}</span>
                      </div>
                    </div>

                    {/* Timing */}
                    <div>
                      <div className="text-white">
                        <p className="font-semibold">{formatTime(option.departure)}</p>
                        <p className="text-sm text-blue-200">{formatDate(option.departure)}</p>
                      </div>
                      <div className="text-center text-blue-300 my-2">
                        <p className="text-sm">{option.duration}</p>
                      </div>
                      <div className="text-white">
                        <p className="font-semibold">{formatTime(option.arrival)}</p>
                        <p className="text-sm text-blue-200">{formatDate(option.arrival)}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <p className="text-white font-semibold mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {option.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                        {option.amenities.length > 3 && (
                          <span className="text-blue-300 text-xs">+{option.amenities.length - 3} more</span>
                        )}
                      </div>
                      <p className="text-green-400 text-sm mt-2">{option.seats} seats available</p>
                    </div>

                    {/* Price & Book */}
                    <div className="text-right">
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-white">₹{option.price.toLocaleString()}</p>
                        <p className="text-blue-200 text-sm">per person</p>
                      </div>
                      
                      {user ? (
                        <button 
                          onClick={() => handleBookNow(option)}
                          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 btn-animate w-full"
                        >
                          Book Now
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <button 
                            onClick={() => handleBookNow(option)}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold w-full cursor-not-allowed opacity-75"
                          >
                            Sign In to Book
                          </button>
                          <p className="text-yellow-300 text-xs">Please sign in to continue booking</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {results.length === 0 && searchData.from && searchData.to && !isLoading && (
          <div className="mt-8 text-center">
            <div className="glass p-8 rounded-xl">
              <p className="text-white text-lg mb-2">No results found</p>
              <p className="text-blue-200">Try searching for different cities or dates</p>
              <div className="mt-4">
                <p className="text-blue-300 text-sm">Popular routes:</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {["Delhi to Mumbai", "Bangalore to Chennai", "Mumbai to Goa"].map((route, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const [from, to] = route.split(" to ");
                        updateSearchData("from", from);
                        updateSearchData("to", to);
                      }}
                      className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500/30 transition-all duration-200"
                    >
                      {route}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, travelOption: null })}
        travelOption={paymentModal.travelOption}
        passengers={searchData.passengers}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
