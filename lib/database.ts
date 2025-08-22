// Fake Database System
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar?: string;
  createdAt: Date;
  bookings: string[];
}

export interface TravelOption {
  id: string;
  type: 'train' | 'bus' | 'flight';
  from: string;
  to: string;
  departure: Date;
  arrival: Date;
  price: number;
  operator: string;
  seats: number;
  amenities: string[];
  rating: number;
  duration: string;
  stops?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  travelOptionId: string;
  passengers: Passenger[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentId: string;
  createdAt: Date;
  seatNumbers?: string[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  idType: 'aadhar' | 'passport' | 'driving_license';
  idNumber: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'card' | 'upi' | 'netbanking' | 'wallet';
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
  createdAt: Date;
}

// Fake Data
export const fakeUsers: User[] = [
  {
    id: 'user1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    phone: '+91 9876543210',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: new Date('2024-01-15'),
    bookings: ['booking1', 'booking2']
  },
  {
    id: 'user2',
    email: 'jane@example.com',
    password: 'password456',
    name: 'Jane Smith',
    phone: '+91 9876543211',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    createdAt: new Date('2024-02-10'),
    bookings: ['booking3']
  }
];

export const fakeTravelOptions: TravelOption[] = [
  // Trains
  {
    id: 'train1',
    type: 'train',
    from: 'Delhi',
    to: 'Mumbai',
    departure: new Date('2024-12-25T06:00:00'),
    arrival: new Date('2024-12-25T22:30:00'),
    price: 1250,
    operator: 'Rajdhani Express',
    seats: 45,
    amenities: ['AC', 'Meals', 'WiFi', 'Charging Points'],
    rating: 4.5,
    duration: '16h 30m',
    stops: ['Kota', 'Vadodara', 'Surat']
  },
  {
    id: 'train2',
    type: 'train',
    from: 'Bangalore',
    to: 'Chennai',
    departure: new Date('2024-12-25T14:15:00'),
    arrival: new Date('2024-12-25T19:45:00'),
    price: 680,
    operator: 'Shatabdi Express',
    seats: 62,
    amenities: ['AC', 'Meals', 'WiFi'],
    rating: 4.3,
    duration: '5h 30m',
    stops: ['Hosur', 'Krishnagiri']
  },
  // Buses
  {
    id: 'bus1',
    type: 'bus',
    from: 'Delhi',
    to: 'Manali',
    departure: new Date('2024-12-25T22:00:00'),
    arrival: new Date('2024-12-26T10:00:00'),
    price: 950,
    operator: 'RedBus Travels',
    seats: 28,
    amenities: ['AC', 'Sleeper', 'Entertainment', 'Blanket'],
    rating: 4.2,
    duration: '12h 00m',
    stops: ['Chandigarh', 'Kullu']
  },
  {
    id: 'bus2',
    type: 'bus',
    from: 'Mumbai',
    to: 'Goa',
    departure: new Date('2024-12-25T23:30:00'),
    arrival: new Date('2024-12-26T09:30:00'),
    price: 750,
    operator: 'SRS Travels',
    seats: 35,
    amenities: ['AC', 'Semi-Sleeper', 'Water Bottle'],
    rating: 4.0,
    duration: '10h 00m',
    stops: ['Pune', 'Kolhapur']
  },
  // Flights
  {
    id: 'flight1',
    type: 'flight',
    from: 'Delhi',
    to: 'Mumbai',
    departure: new Date('2024-12-25T08:30:00'),
    arrival: new Date('2024-12-25T10:45:00'),
    price: 4500,
    operator: 'IndiGo',
    seats: 180,
    amenities: ['In-flight Entertainment', 'Meals', 'WiFi'],
    rating: 4.4,
    duration: '2h 15m'
  },
  {
    id: 'flight2',
    type: 'flight',
    from: 'Bangalore',
    to: 'Delhi',
    departure: new Date('2024-12-25T15:20:00'),
    arrival: new Date('2024-12-25T18:10:00'),
    price: 5200,
    operator: 'Air India',
    seats: 150,
    amenities: ['In-flight Entertainment', 'Meals', 'Extra Legroom'],
    rating: 4.1,
    duration: '2h 50m'
  }
];

export const fakeBookings: Booking[] = [
  {
    id: 'booking1',
    userId: 'user1',
    travelOptionId: 'train1',
    passengers: [
      {
        name: 'John Doe',
        age: 30,
        gender: 'male',
        idType: 'aadhar',
        idNumber: '1234-5678-9012'
      }
    ],
    totalAmount: 1250,
    status: 'confirmed',
    paymentId: 'payment1',
    createdAt: new Date('2024-12-20'),
    seatNumbers: ['A1']
  }
];

export const fakePayments: Payment[] = [
  {
    id: 'payment1',
    bookingId: 'booking1',
    amount: 1250,
    method: 'card',
    status: 'success',
    transactionId: 'TXN123456789',
    createdAt: new Date('2024-12-20')
  }
];

// Database operations
export class FakeDB {
  static getUser(email: string, password: string): User | null {
    return fakeUsers.find(user => user.email === email && user.password === password) || null;
  }

  static getUserById(id: string): User | null {
    return fakeUsers.find(user => user.id === id) || null;
  }

  static createUser(userData: Omit<User, 'id' | 'createdAt' | 'bookings'>): User {
    const newUser: User = {
      ...userData,
      id: `user${fakeUsers.length + 1}`,
      createdAt: new Date(),
      bookings: []
    };
    fakeUsers.push(newUser);
    return newUser;
  }

  static searchTravel(from: string, to: string, type?: string, date?: Date): TravelOption[] {
    return fakeTravelOptions.filter(option => {
      const matchesRoute = option.from.toLowerCase().includes(from.toLowerCase()) && 
                          option.to.toLowerCase().includes(to.toLowerCase());
      const matchesType = !type || option.type === type;
      const matchesDate = !date || option.departure.toDateString() === date.toDateString();
      
      return matchesRoute && matchesType && matchesDate;
    });
  }

  static getTravelOption(id: string): TravelOption | null {
    return fakeTravelOptions.find(option => option.id === id) || null;
  }

  static createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking${fakeBookings.length + 1}`,
      createdAt: new Date()
    };
    fakeBookings.push(newBooking);
    
    // Add booking to user
    const user = fakeUsers.find(u => u.id === bookingData.userId);
    if (user) {
      user.bookings.push(newBooking.id);
    }
    
    return newBooking;
  }

  static createPayment(paymentData: Omit<Payment, 'id' | 'createdAt'>): Payment {
    const newPayment: Payment = {
      ...paymentData,
      id: `payment${fakePayments.length + 1}`,
      createdAt: new Date()
    };
    fakePayments.push(newPayment);
    return newPayment;
  }

  static getUserBookings(userId: string): Booking[] {
    return fakeBookings.filter(booking => booking.userId === userId);
  }

  static getPopularDestinations(): { name: string; image: string; price: number }[] {
    return [
      { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300', price: 2500 },
      { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300', price: 3200 },
      { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300', price: 2800 },
      { name: 'Himachal', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300', price: 3500 },
      { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300', price: 4200 },
      { name: 'Andaman', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300', price: 5500 }
    ];
  }
}