"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { FakeDB, Hotel } from "@/lib/database";
import HotelPaymentModal from "./HotelPaymentModal";

export default function HotelSearch() {
  const { user } = useAuth();
  const [searchData, setSearchData] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 2,
    rooms: 1
  });
  const [results, setResults] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    hotel: Hotel | null;
  }>({
    isOpen: false,
    hotel: null
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use the fake database to get hotel results
      const searchResults = FakeDB.searchHotels(
        searchData.city,
        searchData.checkInDate ? new Date(searchData.checkInDate) : undefined,
        searchData.checkOutDate ? new Date(searchData.checkOutDate) : undefined,
        searchData.guests
      );
      
      setResults(searchResults);
    } catch (error) {
      console.error("Hotel search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookHotel = (hotel: Hotel) => {
    if (!user) {
      alert("Please sign in to book hotels!");
      return;
    }

    // Validate dates
    if (!searchData.checkInDate || !searchData.checkOutDate) {
      alert("Please select check-in and check-out dates!");
      return;
    }

    const checkIn = new Date(searchData.checkInDate);
    const checkOut = new Date(searchData.checkOutDate);
    
    if (checkIn >= checkOut) {
      alert("Check-out date must be after check-in date!");
      return;
    }

    // Open payment modal for logged-in users
    setPaymentModal({
      isOpen: true,
      hotel: hotel
    });
  };

  const handlePaymentSuccess = (bookingId: string) => {
    alert(`Hotel booking confirmed! Your booking ID is: ${bookingId}`);
    // Clear search results
    setResults([]);
    // Reset search form
    setSearchData({
      city: "",
      checkInDate: "",
      checkOutDate: "",
      guests: 2,
      rooms: 1
    });
  };

  const updateSearchData = (field: string, value: any) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const calculateNights = () => {
    if (!searchData.checkInDate || !searchData.checkOutDate) return 0;
    const checkIn = new Date(searchData.checkInDate);
    const checkOut = new Date(searchData.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div className="glass p-8 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Find Your Perfect Stay</h2>
          <p className="text-blue-200">Discover amazing hotels with the best prices</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Location Input */}
          <div className="space-y-2">
            <label className="text-white font-semibold text-sm">Where are you going?</label>
            <div className="relative">
              <input
                type="text"
                value={searchData.city}
                onChange={(e) => updateSearchData("city", e.target.value)}
                placeholder="City or hotel name"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
              <div className="absolute left-4 top-4 text-blue-300">
                🏨
              </div>
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Check-in Date</label>
              <input
                type="date"
                value={searchData.checkInDate}
                onChange={(e) => updateSearchData("checkInDate", e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Check-out Date</label>
              <input
                type="date"
                value={searchData.checkOutDate}
                onChange={(e) => updateSearchData("checkOutDate", e.target.value)}
                min={searchData.checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Guests and Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Guests</label>
              <select
                value={searchData.guests}
                onChange={(e) => updateSearchData("guests", parseInt(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num} className="bg-purple-900">
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white font-semibold text-sm">Rooms</label>
              <select
                value={searchData.rooms}
                onChange={(e) => updateSearchData("rooms", parseInt(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num} className="bg-purple-900">
                    {num} {num === 1 ? 'Room' : 'Rooms'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Searching Hotels...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Search Hotels</span>
              </>
            )}
          </button>
        </form>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Available Hotels</h3>
            <div className="grid gap-6">
              {results.map((hotel) => (
                <div key={hotel.id} className="glass p-6 rounded-xl hover-lift">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Hotel Image */}
                    <div className="md:col-span-1">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    {/* Hotel Details */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{hotel.name}</h4>
                          <p className="text-blue-200">{hotel.location}, {hotel.city}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-white ml-1 font-semibold">{hotel.rating}</span>
                        </div>
                      </div>

                      <p className="text-blue-100 text-sm mb-4">{hotel.description}</p>

                      <div className="mb-4">
                        <p className="text-white font-semibold mb-2">Room Type: {hotel.roomType}</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-xs">
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-purple-300 text-xs">+{hotel.amenities.length - 4} more</span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-blue-200">
                        <p>Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}</p>
                        <p className="text-green-400">{hotel.availableRooms} rooms available</p>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="md:col-span-1 text-right">
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-white">₹{hotel.price.toLocaleString()}</p>
                        <p className="text-blue-200 text-sm">per night</p>
                        {calculateNights() > 0 && (
                          <p className="text-purple-300 text-sm">
                            ₹{(hotel.price * calculateNights() * searchData.rooms).toLocaleString()} total
                            <br />
                            <span className="text-xs">({calculateNights()} nights, {searchData.rooms} room{searchData.rooms > 1 ? 's' : ''})</span>
                          </p>
                        )}
                      </div>
                      
                      {user ? (
                        <button 
                          onClick={() => handleBookHotel(hotel)}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 btn-animate w-full"
                        >
                          Book Now
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <button 
                            onClick={() => handleBookHotel(hotel)}
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
        {results.length === 0 && searchData.city && !isLoading && (
          <div className="mt-8 text-center">
            <div className="glass p-8 rounded-xl">
              <p className="text-white text-lg mb-2">No hotels found</p>
              <p className="text-blue-200">Try searching for different cities or dates</p>
              <div className="mt-4">
                <p className="text-blue-300 text-sm">Popular destinations:</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {["Delhi", "Mumbai", "Goa", "Bangalore", "Kerala", "Rajasthan"].map((city, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateSearchData("city", city)}
                      className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm hover:bg-purple-500/30 transition-all duration-200"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hotel Payment Modal */}
      <HotelPaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, hotel: null })}
        hotel={paymentModal.hotel}
        searchData={searchData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}