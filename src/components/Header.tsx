import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, ShoppingBag } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle search bar visibility
  // const toggleSearch = () => {
  //   setIsSearchVisible(!isSearchVisible);
  //   if (!isSearchVisible) {
  //     setTimeout(() => document.getElementById('search-input')?.focus(), 100);
  //   }
  // };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBag size={28} className={`mr-2 ${isScrolled ? 'text-indigo-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
              CartCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-indigo-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-indigo-700'
              }`}
            >
              Categories
            </Link>
            <Link 
              to="/deals" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-indigo-700'
              }`}
            >
              Deals
            </Link>
            <Link 
              to="/ai" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-indigo-700'
              }`}
            >
              AI Suggestion
            </Link>
          </nav>

          {/* Desktop Search and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search form */}
            <form 
              onSubmit={handleSearch}
              className={`transition-all duration-300 ${
                isSearchVisible ? 'w-64' : 'w-0 overflow-hidden'
              }`}
            >
              <input
                id="search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-3 py-1 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 ${
                  isSearchVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </form>
            
            {/* Search button */}
            {/* <button 
              onClick={toggleSearch}
              className={`p-1 rounded-full ${
                isScrolled 
                  ? 'text-gray-600 hover:text-indigo-600' 
                  : 'text-white hover:bg-indigo-700'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button> */}
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className={`p-1 rounded-full relative ${
                isScrolled 
                  ? 'text-gray-600 hover:text-indigo-600' 
                  : 'text-white hover:bg-indigo-700'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {isLoggedIn ? (
              <div className="relative group">
                <Link 
                  to="/account" 
                  className={`p-1 rounded-full flex items-center ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-indigo-600' 
                      : 'text-white hover:bg-indigo-700'
                  }`}
                >
                  <User size={20} className="mr-1" />
                  <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
                </Link>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      My Account
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={logout} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`p-1 rounded-md flex items-center ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-indigo-600' 
                    : 'text-white hover:bg-indigo-700'
                }`}
              >
                <User size={20} className="mr-1" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link 
              to="/cart" 
              className={`p-1 rounded-full relative ${
                isScrolled 
                  ? 'text-gray-600 hover:text-indigo-600' 
                  : 'text-white hover:bg-indigo-700'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className={`p-1 rounded-md ${
                isScrolled 
                  ? 'text-gray-600 hover:text-indigo-600' 
                  : 'text-white hover:bg-indigo-700'
              }`}
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } bg-white shadow-md`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Search form mobile */}
          <form 
            onSubmit={handleSearch}
            className="px-3 py-2"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Search size={18} className="text-gray-400" />
              </button>
            </div>
          </form>

          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link 
            to="/categories" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            Categories
          </Link>
          <Link 
            to="/deals" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            Deals
          </Link>
          <Link 
            to="/ai" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            AI Suggestion
          </Link>

          {isLoggedIn ? (
            <>
              <Link 
                to="/account" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                My Account
              </Link>
              <Link 
                to="/orders" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </Link>
              <button 
                onClick={logout} 
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;