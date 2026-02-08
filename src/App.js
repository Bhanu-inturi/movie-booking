import React, { useState } from 'react';
import { CreditCard, Film, Clock, User, Mail, Phone } from 'lucide-react';

export default function MovieBookingPlatform() {
  const [currentStep, setCurrentStep] = useState('movies'); // movies, seats, payment, confirmation
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const movies = [
    {
      id: 1,
      title: "Cosmic Odyssey",
      genre: "Sci-Fi",
      duration: "148 min",
      rating: "PG-13",
      image: "🚀",
      price: 12.99,
      showtimes: ["10:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
    },
    {
      id: 2,
      title: "The Last Detective",
      genre: "Mystery",
      duration: "132 min",
      rating: "R",
      image: "🕵️",
      price: 12.99,
      showtimes: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"]
    },
    {
      id: 3,
      title: "Enchanted Kingdom",
      genre: "Fantasy",
      duration: "125 min",
      rating: "PG",
      image: "🏰",
      price: 10.99,
      showtimes: ["10:30 AM", "1:00 PM", "4:30 PM", "8:00 PM"]
    }
  ];

  // Generate theater seats
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const occupiedSeats = ['A5', 'A6', 'B3', 'C7', 'C8', 'D5', 'E6', 'F4', 'F5', 'G8'];

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setCurrentStep('seats');
  };

  const handleShowtimeSelect = (time) => {
    setSelectedShowtime(time);
  };

  const proceedToPayment = () => {
    if (selectedSeats.length > 0 && selectedShowtime) {
      setCurrentStep('payment');
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setCurrentStep('confirmation');
  };

  const totalAmount = selectedMovie ? selectedMovie.price * selectedSeats.length : 0;

  const resetBooking = () => {
    setCurrentStep('movies');
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setPaymentInfo({
      name: '',
      email: '',
      phone: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Film className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">CineMax</h1>
          </div>
          <p className="text-blue-200">Book Your Movie Experience</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
            <div className={`px-4 py-2 rounded-full ${currentStep === 'movies' ? 'bg-yellow-400 text-gray-900' : 'text-white'}`}>
              1. Movie
            </div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className={`px-4 py-2 rounded-full ${currentStep === 'seats' ? 'bg-yellow-400 text-gray-900' : 'text-white'}`}>
              2. Seats
            </div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className={`px-4 py-2 rounded-full ${currentStep === 'payment' ? 'bg-yellow-400 text-gray-900' : 'text-white'}`}>
              3. Payment
            </div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className={`px-4 py-2 rounded-full ${currentStep === 'confirmation' ? 'bg-yellow-400 text-gray-900' : 'text-white'}`}>
              4. Done
            </div>
          </div>
        </div>

        {/* Movie Selection */}
        {currentStep === 'movies' && (
          <div className="grid md:grid-cols-3 gap-6">
            {movies.map(movie => (
              <div 
                key={movie.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer border-2 border-transparent hover:border-yellow-400"
                onClick={() => handleMovieSelect(movie)}
              >
                <div className="text-6xl mb-4 text-center">{movie.image}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold">
                    {movie.genre}
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                    {movie.rating}
                  </span>
                </div>
                <p className="text-blue-200 mb-3">{movie.duration}</p>
                <p className="text-2xl font-bold text-yellow-400">${movie.price}</p>
              </div>
            ))}
          </div>
        )}

        {/* Seat Selection */}
        {currentStep === 'seats' && selectedMovie && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <div className="mb-6">
              <button 
                onClick={() => setCurrentStep('movies')}
                className="text-yellow-400 hover:text-yellow-300 mb-4"
              >
                ← Back to Movies
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">{selectedMovie.title}</h2>
              <p className="text-blue-200">Select your showtime and seats</p>
            </div>

            {/* Showtime Selection */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Select Showtime
              </h3>
              <div className="flex gap-3 flex-wrap">
                {selectedMovie.showtimes.map(time => (
                  <button
                    key={time}
                    onClick={() => handleShowtimeSelect(time)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      selectedShowtime === time
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {selectedShowtime && (
              <>
                {/* Screen */}
                <div className="mb-8">
                  <div className="bg-gradient-to-b from-white/30 to-transparent h-2 rounded-t-full mb-2"></div>
                  <p className="text-center text-blue-200 text-sm">SCREEN</p>
                </div>

                {/* Seat Map */}
                <div className="mb-6 overflow-x-auto">
                  <div className="inline-block min-w-full">
                    {rows.map(row => (
                      <div key={row} className="flex items-center gap-2 mb-2 justify-center">
                        <span className="text-white font-bold w-8">{row}</span>
                        {[...Array(seatsPerRow)].map((_, index) => {
                          const seatId = `${row}${index + 1}`;
                          const isOccupied = occupiedSeats.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);
                          
                          return (
                            <button
                              key={seatId}
                              onClick={() => toggleSeat(seatId)}
                              disabled={isOccupied}
                              className={`w-8 h-8 rounded-t-lg transition-all text-xs font-semibold ${
                                isOccupied
                                  ? 'bg-gray-600 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-yellow-400 text-gray-900 scale-110'
                                  : 'bg-green-500 hover:bg-green-400 text-white'
                              }`}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-t-lg"></div>
                    <span className="text-white text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-t-lg"></div>
                    <span className="text-white text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-t-lg"></div>
                    <span className="text-white text-sm">Occupied</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white/20 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-blue-200">Selected Seats: <span className="text-white font-bold">
                        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                      </span></p>
                      <p className="text-blue-200">Showtime: <span className="text-white font-bold">{selectedShowtime}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200">Total Amount</p>
                      <p className="text-3xl font-bold text-yellow-400">${totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={proceedToPayment}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
                </button>
              </>
            )}
          </div>
        )}

        {/* Payment */}
        {currentStep === 'payment' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
            <button 
              onClick={() => setCurrentStep('seats')}
              className="text-yellow-400 hover:text-yellow-300 mb-4"
            >
              ← Back to Seats
            </button>
            
            <h2 className="text-3xl font-bold text-white mb-6">Payment Details</h2>

            <div className="bg-white/20 rounded-xl p-4 mb-6">
              <h3 className="text-white font-bold mb-2">Booking Summary</h3>
              <p className="text-blue-200">{selectedMovie.title}</p>
              <p className="text-blue-200">Showtime: {selectedShowtime}</p>
              <p className="text-blue-200">Seats: {selectedSeats.join(', ')}</p>
              <p className="text-2xl font-bold text-yellow-400 mt-2">${totalAmount.toFixed(2)}</p>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={paymentInfo.name}
                  onChange={(e) => setPaymentInfo({...paymentInfo, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border-2 border-transparent focus:border-yellow-400 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input
                  type="email"
                  required
                  value={paymentInfo.email}
                  onChange={(e) => setPaymentInfo({...paymentInfo, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border-2 border-transparent focus:border-yellow-400 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone
                </label>
                <input
                  type="tel"
                  required
                  value={paymentInfo.phone}
                  onChange={(e) => setPaymentInfo({...paymentInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border-2 border-transparent focus:border-yellow-400 outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Card Number
                </label>
                <input
                  type="text"
                  required
                  maxLength="19"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border-2 border-transparent focus:border-yellow-400 outline-none"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    maxLength="5"
                    value={paymentInfo.expiry}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border-2 border-transparent focus:border-yellow-400 outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">CVV</label>
                  <input
                    type="text"
                    required
                    maxLength="3"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border-2 border-transparent focus:border-yellow-400 outline-none"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-300 transition-all mt-6"
              >
                Complete Payment - ${totalAmount.toFixed(2)}
              </button>
            </form>
          </div>
        )}

        {/* Confirmation */}
        {currentStep === 'confirmation' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-blue-200 mb-6">Your tickets have been sent to {paymentInfo.email}</p>
            
            <div className="bg-white/20 rounded-xl p-6 mb-6 text-left">
              <h3 className="text-yellow-400 font-bold text-xl mb-4">Ticket Details</h3>
              <div className="space-y-2 text-white">
                <p><span className="text-blue-200">Movie:</span> {selectedMovie.title}</p>
                <p><span className="text-blue-200">Showtime:</span> {selectedShowtime}</p>
                <p><span className="text-blue-200">Seats:</span> {selectedSeats.join(', ')}</p>
                <p><span className="text-blue-200">Name:</span> {paymentInfo.name}</p>
                <p><span className="text-blue-200">Booking ID:</span> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className="border-t border-white/30 mt-4 pt-4">
                <p className="text-2xl font-bold text-yellow-400">Total Paid: ${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-xl hover:bg-yellow-300 transition-all"
            >
              Book Another Movie
            </button>
          </div>
        )}
      </div>
    </div>
  );
}