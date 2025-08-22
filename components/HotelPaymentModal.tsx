"use client";

import { useState } from "react";
import { FakeDB, Hotel } from "@/lib/database";
import { useAuth } from "@/lib/auth";

interface HotelPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel | null;
  searchData: {
    city: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    rooms: number;
  };
  onPaymentSuccess: (bookingId: string) => void;
}

export default function HotelPaymentModal({ 
  isOpen, 
  onClose, 
  hotel, 
  searchData,
  onPaymentSuccess 
}: HotelPaymentModalProps) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Card details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // UPI details
    upiId: '',
    // Net banking
    bankName: '',
    // Wallet
    walletType: 'paytm'
  });

  if (!isOpen || !hotel || !user) return null;

  const calculateNights = () => {
    if (!searchData.checkInDate || !searchData.checkOutDate) return 0;
    const checkIn = new Date(searchData.checkInDate);
    const checkOut = new Date(searchData.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const baseAmount = hotel.price * nights * searchData.rooms;
  const taxes = Math.round(baseAmount * 0.12);
  const finalAmount = baseAmount + taxes;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Wallet', icon: '💰' }
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create fake hotel booking with the authenticated user
      const booking = FakeDB.createHotelBooking({
        userId: user.id,
        hotelId: hotel.id,
        checkInDate: new Date(searchData.checkInDate),
        checkOutDate: new Date(searchData.checkOutDate),
        guests: searchData.guests,
        rooms: searchData.rooms,
        totalAmount: finalAmount,
        status: 'confirmed',
        paymentId: 'temp',
        guestDetails: {
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });

      // Create fake payment
      const payment = FakeDB.createPayment({
        bookingId: booking.id,
        amount: finalAmount,
        method: paymentMethod,
        status: 'success',
        transactionId: `HTL${Date.now()}`
      });

      setIsProcessing(false);
      onPaymentSuccess(booking.id);
      onClose();
      
      // Reset form
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        upiId: '',
        bankName: '',
        walletType: 'paytm'
      });
    }, 3000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Complete Hotel Booking</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Hotel Info */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Hotel Details</h3>
              
              <div className="flex gap-4 mb-4">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{hotel.name}</h4>
                  <p className="text-blue-200">{hotel.location}, {hotel.city}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white ml-1">{hotel.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Room Type</span>
                  <span className="text-white font-semibold">{hotel.roomType}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Check-in</span>
                  <span className="text-white font-semibold">
                    {new Date(searchData.checkInDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Check-out</span>
                  <span className="text-white font-semibold">
                    {new Date(searchData.checkOutDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Duration</span>
                  <span className="text-white font-semibold">{nights} night{nights !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Guests</span>
                  <span className="text-white font-semibold">{searchData.guests}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Rooms</span>
                  <span className="text-white font-semibold">{searchData.rooms}</span>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-3">Guest Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-200">Name:</span>
                  <span className="text-white">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Email:</span>
                  <span className="text-white">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Phone:</span>
                  <span className="text-white">{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Price Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">₹{hotel.price.toLocaleString()} × {nights} nights × {searchData.rooms} room{searchData.rooms > 1 ? 's' : ''}</span>
                  <span className="text-white">₹{baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Taxes & Fees</span>
                  <span className="text-white">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-white">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-3">Hotel Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <span key={index} className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                      paymentMethod === method.id
                        ? 'bg-white text-purple-600 shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-sm">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment} className="space-y-4">
              {paymentMethod === 'card' && (
                <>
                  <div className="space-y-2">
                    <label className="text-white font-semibold text-sm">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => updateFormData('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white font-semibold text-sm">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => updateFormData('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-semibold text-sm">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => updateFormData('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white font-semibold text-sm">Cardholder Name</label>
                    <input
                      type="text"
                      value={formData.cardName || user.name}
                      onChange={(e) => updateFormData('cardName', e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">UPI ID</label>
                  <input
                    type="text"
                    value={formData.upiId}
                    onChange={(e) => updateFormData('upiId', e.target.value)}
                    placeholder="yourname@paytm"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">Select Bank</label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => updateFormData('bankName', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="" className="bg-purple-900">Select your bank</option>
                    <option value="sbi" className="bg-purple-900">State Bank of India</option>
                    <option value="hdfc" className="bg-purple-900">HDFC Bank</option>
                    <option value="icici" className="bg-purple-900">ICICI Bank</option>
                    <option value="axis" className="bg-purple-900">Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="space-y-2">
                  <label className="text-white font-semibold text-sm">Select Wallet</label>
                  <select
                    value={formData.walletType}
                    onChange={(e) => updateFormData('walletType', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="paytm" className="bg-purple-900">Paytm</option>
                    <option value="phonepe" className="bg-purple-900">PhonePe</option>
                    <option value="googlepay" className="bg-purple-900">Google Pay</option>
                    <option value="amazonpay" className="bg-purple-900">Amazon Pay</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    <span>Pay ₹{finalAmount.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-400">🔒</span>
                <span className="text-green-300 font-semibold">Secure Payment</span>
              </div>
              <p className="text-green-200 text-sm">
                Your payment information is encrypted and secure. We use industry-standard security measures.
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-400">ℹ️</span>
                <span className="text-blue-300 font-semibold">Cancellation Policy</span>
              </div>
              <p className="text-blue-200 text-sm">
                Free cancellation up to 24 hours before check-in. After that, cancellation charges may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}