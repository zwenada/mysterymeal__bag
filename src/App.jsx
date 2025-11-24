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
} from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample listings data
  const [listings] = useState([
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
      quantity: "3 bags available",
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
      quantity: "5 boxes available",
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
      quantity: "2 packs available",
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
      quantity: "4 boxes available",
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
      quantity: "3 bundles available",
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
      quantity: "6 boxes available",
    },
  ]);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || listing.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const Hero = () => (
    <div className="bg-linear-to-r from-green-600 to-emerald-600 text-gold py-16 px-6 rounded-2xl mb-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Mystery Meal Bag
        </h1>
        <p className="text-xl mb-6 text-green-50">
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
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
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
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Items
      </button>
      <button
        onClick={() => setSelectedCategory("ingredients")}
        className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
          selectedCategory === "ingredients"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Ingredients
      </button>
      <button
        onClick={() => setSelectedCategory("restaurant")}
        className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
          selectedCategory === "restaurant"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Restaurants
      </button>
      <button
        onClick={() => setSelectedCategory("catering")}
        className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
          selectedCategory === "catering"
            ? "bg-green-600 text-white"
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
          -{Math.round((1 - listing.salePrice / listing.originalPrice) * 100)}%
        </div>
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
        </div>
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
            <span className="text-green-600 font-bold text-2xl">
              ${listing.salePrice}
            </span>
          </div>
          <span className="text-sm text-gray-500">{listing.quantity}</span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
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
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-green-600" size={32} />
          </div>
          <h3 className="font-bold mb-2">1. Browse</h3>
          <p className="text-gray-600 text-sm">
            Discover food and ingredients near you
          </p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="text-green-600" size={32} />
          </div>
          <h3 className="font-bold mb-2">2. Reserve</h3>
          <p className="text-gray-600 text-sm">
            Choose and pay through the app
          </p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-green-600" size={32} />
          </div>
          <h3 className="font-bold mb-2">3. Pick Up</h3>
          <p className="text-gray-600 text-sm">Collect at specified time</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-green-600" size={32} />
          </div>
          <h3 className="font-bold mb-2">4. Enjoy</h3>
          <p className="text-gray-600 text-sm">Save money and reduce waste!</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-green-600" size={32} />
            <h1 className="text-xl font-bold text-gray-800">
              Mystery Meal Bag
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <button className="text-gray-600 hover:text-green-600 font-medium">
              For Sellers
            </button>
            <button className="text-gray-600 hover:text-green-600 font-medium">
              About
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-green-600">
              <Heart size={24} />
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "home" && (
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
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "home" ? "text-green-600" : "text-gray-600"
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <Store size={24} />
            <span className="text-xs">Sellers</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <ShoppingBag size={24} />
            <span className="text-xs">Orders</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
