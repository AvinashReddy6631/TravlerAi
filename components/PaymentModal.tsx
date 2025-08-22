"use client";

import { useState } from "react";
import { FakeDB, TravelOption } from "@/lib/database";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelOption: TravelOption | null;
  passengers: number;
  onPaymentSuccess: (bookingId: string) => void;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  travelOption, 
  passengers = 1,
  onPaymentSuccess 
}: PaymentModalProps) {
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

  if (!isOpen || !travelOption) return null;

  const totalAmount = travelOption.price * passengers;
  const taxes = Math.round(totalAmount * 0.12);
  const finalAmount = totalAmount + taxes;

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
      // Create fake booking
      const booking = FakeDB.createBooking({
        userId: 'user1', // In real app, get from auth context
        travelOptionId: travelOption.id,
        passengers: [
          {
            name: 'John Doe',
            age: 30,
            gender: 'male',
            idType: 'aadhar',
            idNumber: '1234-5678-9012'
          }
        ],
        totalAmount: finalAmount,
        status: 'confirmed',
        paymentId: 'temp'
      });

      // Create fake payment
      const payment = FakeDB.createPayment({
        bookingId: booking.id,
        amount: finalAmount,
        method: paymentMethod,
        status: 'success',
        transactionId: `TXN${Date.now()}`
      });

      setIsProcessing(false);
      onPaymentSuccess(booking.id);
      onClose();
    }, 3000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Complete Payment</h2>
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
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Route</span>
                  <span className="text-white font-semibold">{travelOption.from} → {travelOption.to}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Operator</span>
                  <span className="text-white font-semibold">{travelOption.operator}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Departure</span>
                  <span className="text-white font-semibold">
                    {travelOption.departure.toLocaleDateString()} {travelOption.departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Duration</span>
                  <span className="text-white font-semibold">{travelOption.duration}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Passengers</span>
                  <span className="text-white font-semibold">{passengers}</span>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200">Base Fare</span>
                    <span className="text-white">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200">Taxes & Fees</span>
                    <span className="text-white">₹{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-white">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {travelOption.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">
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
                      value={formData.cardName}
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
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
          </div>
        </div>
      </div>
    </div>
  );
}