// app/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    
    // Add search to history
    const newHistory = [searchQuery, ...searchHistory.slice(0, 9)]; // Keep only the 10 most recent searches
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    // Here you would typically redirect to search results page
    // For now, we'll just clear the search field
    setSearchQuery('');
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start p-4 overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }} // Darken the video slightly to improve text visibility
        >
          <source src="/project_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Navigation Bar */}
      <nav className="w-full bg-black/50 backdrop-blur-sm fixed top-0 left-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                Olympics Data
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/medal-dashboard" className="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Medal Dashboard
                </Link>
                <Link href="/age-performance" className="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Age vs Performance
                </Link>
                <Link href="/gender-participation" className="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Gender Participation
                </Link>
                <Link href="/sports-analysis" className="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Sports Analysis
                </Link>
                <Link href="/country-analysis" className="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Country Analysis
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-700 focus:outline-none"
              >
                <svg
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/70">
            <Link href="/medal-dashboard" className="text-gray-200 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Medal Dashboard
            </Link>
            <Link href="/age-performance" className="text-gray-200 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Age vs Performance
            </Link>
            <Link href="/gender-participation" className="text-gray-200 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Gender Participation
            </Link>
            <Link href="/sports-analysis" className="text-gray-200 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Sports Analysis
            </Link>
            <Link href="/country-analysis" className="text-gray-200 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Country Analysis
            </Link>
            <Link href="/miscellaneous" className="text-gray-200 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Miscellaneous
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Content Overlay - adjusted with top padding to account for navbar */}
      <div className="w-full max-w-4xl mx-auto space-y-10 relative z-10 pt-20">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
            Olympics Data Analysis
          </h1>
          
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Explore historical Olympic Games data across countries and sports
          </p>
        </div>
        
        {/* Search Section */}
        <div className="w-full backdrop-blur-sm bg-white/20 p-6 rounded-xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a country, athlete, or sport..."
              className="w-full p-4 pr-12 text-lg rounded-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none shadow-md"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          
          {/* History Tab */}
          <div className="mt-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-white hover:text-blue-200 flex items-center text-sm"
            >
              <span>Search History</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transform transition-transform ${showHistory ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showHistory && (
              <div className="mt-2 p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md">
                {searchHistory.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-700">Recent Searches</h3>
                      <button
                        onClick={clearHistory}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {searchHistory.map((query, index) => (
                        <li key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          {query}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No recent searches</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Featured Visualizations Section */}
        <div className="text-center">
          <p className="text-lg text-white mb-4 drop-shadow-md">Featured Visualizations</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link href="/medal-dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md text-center text-sm">
              Medal Dashboard
            </Link>
            <Link href="/age-performance" className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md text-center text-sm">
              Age Analysis
            </Link>
            <Link href="/gender-participation" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md text-center text-sm">
              Gender Stats
            </Link>
          </div>
        </div>
        
        {/* Browse Section */}
        <div className="text-center">
          <p className="text-lg text-white mb-4 drop-shadow-md">Browse by category</p>
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <Link href="/countries" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md text-center">
              Browse Countries
            </Link>
            <Link href="/sports" className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md text-center">
              Browse Sports
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-white text-sm mt-12 drop-shadow-md">
          &copy; {new Date().getFullYear()} Olympics Data Analysis Project
        </footer>
      </div>
    </main>
  );
}