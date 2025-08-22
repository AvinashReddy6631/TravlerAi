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

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  images: string[];
  amenities: string[];
  roomType: string;
  availableRooms: number;
  description: string;
  checkIn: string;
  checkOut: string;
  coordinates?: { lat: number; lng: number };
}

export interface HotelBooking {
  id: string;
  userId: string;
  hotelId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  rooms: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentId: string;
  createdAt: Date;
  guestDetails: {
    name: string;
    email: string;
    phone: string;
  };
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

export const fakeHotels: Hotel[] = [
  {
    id: 'hotel1',
    name: 'The Grand Palace Hotel',
    location: 'Connaught Place',
    city: 'Delhi',
    price: 4500,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
    ],
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Room Service', 'Gym'],
    roomType: 'Deluxe Room',
    availableRooms: 15,
    description: 'Luxury hotel in the heart of Delhi with world-class amenities and service.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 'hotel2',
    name: 'Taj Palace Mumbai',
    location: 'Colaba',
    city: 'Mumbai',
    price: 6200,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400'
    ],
    amenities: ['Ocean View', 'Free WiFi', 'Restaurant', 'Bar', 'Concierge', 'Valet Parking'],
    roomType: 'Premium Ocean View',
    availableRooms: 8,
    description: 'Iconic luxury hotel overlooking the Arabian Sea with unparalleled service.',
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    id: 'hotel3',
    name: 'Leela Palace Bangalore',
    location: 'HAL Old Airport Road',
    city: 'Bangalore',
    price: 5800,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400'
    ],
    amenities: ['Free WiFi', 'Spa', 'Multiple Restaurants', 'Business Center', 'Pool', 'Fitness Center'],
    roomType: 'Royal Club Room',
    availableRooms: 12,
    description: 'Contemporary luxury hotel with traditional Indian hospitality and modern amenities.',
    checkIn: '2:00 PM',
    checkOut: '11:00 AM',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 'hotel4',
    name: 'Goa Beach Resort',
    location: 'Calangute Beach',
    city: 'Goa',
    price: 3200,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
    ],
    amenities: ['Beachfront', 'Swimming Pool', 'Restaurant', 'Bar', 'Water Sports', 'Free WiFi'],
    roomType: 'Beach View Room',
    availableRooms: 20,
    description: 'Beachfront resort perfect for a relaxing vacation with stunning ocean views.',
    checkIn: '2:00 PM',
    checkOut: '11:00 AM',
    coordinates: { lat: 15.5527, lng: 73.7640 }
  },
  {
    id: 'hotel5',
    name: 'Kerala Backwater Resort',
    location: 'Alleppey',
    city: 'Kerala',
    price: 4200,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400'
    ],
    amenities: ['Backwater View', 'Ayurvedic Spa', 'Traditional Cuisine', 'Boat Rides', 'Free WiFi', 'Garden'],
    roomType: 'Backwater Villa',
    availableRooms: 10,
    description: 'Serene resort nestled in Kerala backwaters offering authentic cultural experience.',
    checkIn: '1:00 PM',
    checkOut: '11:00 AM',
    coordinates: { lat: 9.4981, lng: 76.3388 }
  },
  {
    id: 'hotel6',
    name: 'Rajasthan Heritage Hotel',
    location: 'City Palace Area',
    city: 'Rajasthan',
    price: 3800,
    rating: 4.4,
    images: [
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
    ],
    amenities: ['Heritage Architecture', 'Cultural Shows', 'Traditional Cuisine', 'Rooftop Restaurant', 'Free WiFi', 'Camel Rides'],
    roomType: 'Royal Heritage Suite',
    availableRooms: 6,
    description: 'Experience royal Rajasthani hospitality in this beautifully restored heritage property.',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    coordinates: { lat: 26.9124, lng: 75.7873 }
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

export const fakeHotelBookings: HotelBooking[] = [];

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

  static searchHotels(city: string, checkIn?: Date, checkOut?: Date, guests?: number): Hotel[] {
    return fakeHotels.filter(hotel => {
      const matchesCity = hotel.city.toLowerCase().includes(city.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(city.toLowerCase());
      const hasAvailability = !guests || hotel.availableRooms >= Math.ceil(guests / 2); // Assuming 2 guests per room
      
      return matchesCity && hasAvailability;
    });
  }

  static getTravelOption(id: string): TravelOption | null {
    return fakeTravelOptions.find(option => option.id === id) || null;
  }

  static getHotel(id: string): Hotel | null {
    return fakeHotels.find(hotel => hotel.id === id) || null;
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

  static createHotelBooking(bookingData: Omit<HotelBooking, 'id' | 'createdAt'>): HotelBooking {
    const newBooking: HotelBooking = {
      ...bookingData,
      id: `hotel_booking${fakeHotelBookings.length + 1}`,
      createdAt: new Date()
    };
    fakeHotelBookings.push(newBooking);
    
    // Add booking to user
    const user = fakeUsers.find(u => u.id === bookingData.userId);
    if (user) {
      user.bookings.push(newBooking.id);
    }
    
    // Reduce available rooms
    const hotel = fakeHotels.find(h => h.id === bookingData.hotelId);
    if (hotel) {
      hotel.availableRooms -= bookingData.rooms;
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

  static getUserHotelBookings(userId: string): HotelBooking[] {
    return fakeHotelBookings.filter(booking => booking.userId === userId);
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