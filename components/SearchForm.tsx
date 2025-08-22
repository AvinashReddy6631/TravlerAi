"use client";
import { useState } from "react";

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState("flight");
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    class: "economy"
  });
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "flight", name: "Flights", icon: "✈️" },
    { id: "train", name: "Trains", icon: "🚆" },
    { id: "bus", name: "Buses", icon: "🚌" }
  ];

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          mode: activeTab, 
          from: searchData.from, 
          to: searchData.to,
          date: searchData.departDate,
          passengers: searchData.passengers,
          class: searchData.class
        }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const updateSearchData = (field: string, value: any) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
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
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
          <h3 className="text-2xl font-bold text-white mb-6">Search Results</h3>
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div key={index} className="glass p-6 rounded-xl hover-lift">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{result}</p>
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 btn-animate">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
