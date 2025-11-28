import React, { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  Clock,
  DollarSign,
  Search,
  User,
  Heart,
  Home,
  Store,
  UtensilsCrossed,
  CreditCard,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

// Simple Router Implementation
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState("/");

  const navigate = (path) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return { currentPath, navigate };
};

const App = () => {
  const { currentPath, navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Sample listings data
  const listings = [
    {
      id: 1,
      title: "Fresh Vegetables Bundle",
      seller: "Sarah's Kitchen",
      type: "ingredients",
      originalPrice: 15,
      salePrice: 7,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      location: "Downtown, 2.3 km",
      pickupTime: "Today, 6-8 PM",
      description: "Fresh carrots, tomatoes, and lettuce from my garden",
      quantity: 3,
    },
    {
      id: 2,
      title: "Bakery Surprise Box",
      seller: "Golden Crust Bakery",
      type: "restaurant",
      originalPrice: 20,
      salePrice: 8,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      location: "Main Street, 1.5 km",
      pickupTime: "Today, 8-9 PM",
      description: "Assorted fresh breads and pastries from today",
      quantity: 5,
    },
    {
      id: 3,
      title: "Rice & Pasta Pack",
      seller: "Maria's Pantry",
      type: "ingredients",
      originalPrice: 12,
      salePrice: 5,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      location: "Westside, 3.1 km",
      pickupTime: "Tomorrow, 5-7 PM",
      description: "Unopened rice and pasta packages, extra from bulk buy",
      quantity: 2,
    },
    {
      id: 4,
      title: "Restaurant Meal Box",
      seller: "Taste of Home Restaurant",
      type: "restaurant",
      originalPrice: 25,
      salePrice: 10,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      location: "Food District, 2.8 km",
      pickupTime: "Today, 9-10 PM",
      description: "Complete meal with main course and sides",
      quantity: 4,
    },
    {
      id: 5,
      title: "Dairy Products Bundle",
      seller: "Emma's Store",
      type: "ingredients",
      originalPrice: 18,
      salePrice: 8,
      image:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop",
      location: "North End, 4.2 km",
      pickupTime: "Today, 7-9 PM",
      description: "Milk, cheese, and yogurt nearing expiry date",
      quantity: 3,
    },
    {
      id: 6,
      title: "Catering Leftover Box",
      seller: "Elite Catering Co.",
      type: "catering",
      originalPrice: 30,
      salePrice: 12,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      location: "Business District, 1.9 km",
      pickupTime: "Today, 6-7 PM",
      description: "Gourmet catering food from today's event",
      quantity: 6,
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || listing.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <ShoppingBag className="text-blue-600" size={32} />
          <h1 className="text-xl font-bold text-gray-800">MysteryMeal Bag</h1>
        </button>
        <nav className="hidden md:flex gap-6">
          <button
            onClick={() => navigate("/sellers")}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            For Sellers
          </button>
          <button className="text-gray-600 hover:text-blue-600 font-medium">
            About
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/favorites")}
            className="text-gray-600 hover:text-blue-600 relative"
          >
            <Heart
              size={24}
              fill={favorites.length > 0 ? "currentColor" : "none"}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              {user.name}
            </button>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );

  // Home Page
  const HomePage = () => {
    const Hero = () => (
      <div className="bg-linear-to-r from-blue-600 to-emerald-600 text-black py-16 px-6 rounded-2xl mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MysteryMeal Bag
          </h1>
          <p className="text-xl mb-6 text-blue-400">
            Discover surprise deals on quality food & ingredients from your
            neighbors and local restaurants
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
              <DollarSign size={20} />
              <span>Save up to 70%</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
              <ShoppingBag size={20} />
              <span>Fresh Quality</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
              <Heart size={20} />
              <span>Reduce Waste</span>
            </div>
          </div>
        </div>
      </div>
    );

    const SearchBar = () => (
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for food, ingredients, or sellers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
    );

    const CategoryFilter = () => (
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setSelectedCategory("ingredients")}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
            selectedCategory === "ingredients"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Ingredients
        </button>
        <button
          onClick={() => setSelectedCategory("restaurant")}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
            selectedCategory === "restaurant"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Restaurants
        </button>
        <button
          onClick={() => setSelectedCategory("catering")}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
            selectedCategory === "catering"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Catering
        </button>
      </div>
    );

    const ListingCard = ({ listing }) => (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{Math.round((1 - listing.salePrice / listing.originalPrice) * 100)}
            %
          </div>
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700">
            {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(listing.id);
            }}
            className="absolute top-3 right-14 bg-white/95 backdrop-blur p-2 rounded-full hover:bg-white transition"
          >
            <Heart
              size={20}
              className={
                favorites.includes(listing.id)
                  ? "text-red-500"
                  : "text-gray-600"
              }
              fill={favorites.includes(listing.id) ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{listing.seller}</p>
          <p className="text-gray-700 text-sm mb-3">{listing.description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin size={16} />
            <span>{listing.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Clock size={16} />
            <span>{listing.pickupTime}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-gray-400 line-through text-sm mr-2">
                ${listing.originalPrice}
              </span>
              <span className="text-blue-600 font-bold text-2xl">
                ${listing.salePrice}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {listing.quantity} available
            </span>
          </div>

          <button
            onClick={() => navigate(`/reserve/${listing.id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Reserve Now
          </button>
        </div>
      </div>
    );

    const HowItWorks = () => (
      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold mb-2">1. Browse</h3>
            <p className="text-gray-600 text-sm">
              Discover food and ingredients near you
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold mb-2">2. Reserve</h3>
            <p className="text-gray-600 text-sm">
              Choose and pay through the app
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold mb-2">3. Pick Up</h3>
            <p className="text-gray-600 text-sm">Collect at specified time</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold mb-2">4. Enjoy</h3>
            <p className="text-gray-600 text-sm">
              Save money and reduce waste!
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <Hero />
        <SearchBar />
        <CategoryFilter />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <HowItWorks />
      </>
    );
  };

  // Sign In Page
  const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignUp) {
        setUser({ name, email });
        navigate("/");
      } else {
        setUser({ name: email.split("@")[0], email });
        navigate("/");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <ShoppingBag className="text-blue-600 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {isSignUp
                ? "Join Mystery Meal Bag today"
                : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Reserve Page
  const ReservePage = () => {
    const listingId = parseInt(currentPath.split("/")[2]);
    const listing = listings.find((l) => l.id === listingId);
    const [quantity, setQuantity] = useState(1);

    if (!listing) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">Listing not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Home
          </button>
        </div>
      );
    }

    const handleReserve = () => {
      if (!user) {
        navigate("/signin");
        return;
      }
      setCart([...cart, { ...listing, quantity }]);
      navigate("/payment");
    };

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to listings</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                <p className="text-gray-600 text-lg">{listing.seller}</p>
              </div>
              <button
                onClick={() => toggleFavorite(listing.id)}
                className="p-3 hover:bg-gray-100 rounded-full transition"
              >
                <Heart
                  size={28}
                  className={
                    favorites.includes(listing.id)
                      ? "text-red-500"
                      : "text-gray-600"
                  }
                  fill={
                    favorites.includes(listing.id) ? "currentColor" : "none"
                  }
                />
              </button>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 line-through text-lg mr-3">
                    ${listing.originalPrice}
                  </span>
                  <span className="text-blue-600 font-bold text-4xl">
                    ${listing.salePrice}
                  </span>
                </div>
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  Save{" "}
                  {Math.round(
                    (1 - listing.salePrice / listing.originalPrice) * 100
                  )}
                  %
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={24} className="text-blue-600" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{listing.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Clock size={24} className="text-blue-600" />
                <div>
                  <p className="font-semibold">Pickup Time</p>
                  <p>{listing.pickupTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <ShoppingBag size={24} className="text-blue-600" />
                <div>
                  <p className="font-semibold">Available</p>
                  <p>{listing.quantity} bags remaining</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="font-bold text-xl mb-2">Description</h3>
              <p className="text-gray-700">{listing.description}</p>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(listing.quantity, quantity + 1))
                  }
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${(listing.salePrice * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleReserve}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition"
            >
              Reserve & Pay Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Payment Page
  const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const total = cart.reduce(
      (sum, item) => sum + item.salePrice * item.quantity,
      0
    );

    const handlePayment = (e) => {
      e.preventDefault();
      setPaymentSuccess(true);
      setTimeout(() => {
        setCart([]);
        navigate("/");
      }, 3000);
    };

    if (paymentSuccess) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
            <CheckCircle className="text-blue-600 mx-auto mb-6" size={80} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your reservation has been confirmed. Check your email for pickup
              details.
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Paid</p>
              <p className="text-3xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to home...</p>
          </div>
        </div>
      );
    }

    if (cart.length === 0) {
      return (
        <div className="text-center py-12">
          <ShoppingBag className="text-gray-400 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No items in cart
          </h2>
          <p className="text-gray-600 mb-6">Add some items before checkout</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Browse Listings
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to listings</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.seller}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-bold text-blue-600">
                        ${(item.salePrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <form
              onSubmit={handlePayment}
              className="bg-white rounded-xl shadow-md p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 16)
                      )
                    }
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4)
                          .replace(/(\d{2})(\d)/, "$1/$2")
                      )
                    }
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="123"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition mt-6"
              >
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Favorites Page
  const FavoritesPage = () => {
    const favoriteListings = listings.filter((listing) =>
      favorites.includes(listing.id)
    );

    if (favoriteListings.length === 0) {
      return (
        <div className="text-center py-12">
          <Heart className="text-gray-400 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 mb-6">Start adding items you love!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Browse Listings
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Heart className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {favoriteListings.length}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -
                  {Math.round(
                    (1 - listing.salePrice / listing.originalPrice) * 100
                  )}
                  %
                </div>
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute top-3 right-14 bg-white/95 backdrop-blur p-2 rounded-full hover:bg-white transition"
                >
                  <Heart
                    size={20}
                    className="text-red-500"
                    fill="currentColor"
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{listing.seller}</p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin size={16} />
                  <span>{listing.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-gray-400 line-through text-sm mr-2">
                      ${listing.originalPrice}
                    </span>
                    <span className="text-blue-600 font-bold text-2xl">
                      ${listing.salePrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/reserve/${listing.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Profile Page
  const ProfilePage = () => {
    if (!user) {
      return (
        <div className="text-center py-12">
          <User className="text-gray-400 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Please sign in
          </h2>
          <button
            onClick={() => navigate("/signin")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Sign In
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-blue-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Orders</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {cart.length}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Favorites</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                {favorites.length}
              </span>
            </div>

            <button
              onClick={() => setUser(null)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sellers Page
  const SellersPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">For Food Sellers</h1>
        <p className="text-xl text-gray-600">
          Turn your surplus food into profit and reduce waste
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <DollarSign className="text-blue-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Earn Extra Revenue</h3>
          <p className="text-gray-600">
            Monetize food that would otherwise go to waste
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <Store className="text-blue-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Reach New Customers</h3>
          <p className="text-gray-600">
            Connect with local food lovers in your area
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <Heart className="text-blue-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Reduce Food Waste</h3>
          <p className="text-gray-600">
            Contribute to a sustainable food ecosystem
          </p>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-50 mb-6 text-lg">
          Join thousands of sellers already reducing waste and earning extra
          income
        </p>
        <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition">
          Become a Seller
        </button>
      </div>
    </div>
  );

  // Main Router
  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <HomePage />;
      case "/signin":
        return <SignInPage />;
      case "/favorites":
        return <FavoritesPage />;
      case "/profile":
        return <ProfilePage />;
      case "/sellers":
        return <SellersPage />;
      case "/payment":
        return <PaymentPage />;
      default:
        if (currentPath.startsWith("/reserve/")) {
          return <ReservePage />;
        }
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">{renderPage()}</main>
    </div>
  );
};

export default App;
