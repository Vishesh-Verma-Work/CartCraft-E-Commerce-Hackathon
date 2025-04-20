import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube as YouTube, CreditCard, Truck, Shield, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <CreditCard size={24} className="mr-3 text-indigo-400" />
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-400">Multiple payment options</p>
              </div>
            </div>
            <div className="flex items-center">
              <Truck size={24} className="mr-3 text-indigo-400" />
              <div>
                <h4 className="font-semibold">Fast Delivery</h4>
                <p className="text-sm text-gray-400">Nationwide shipping</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield size={24} className="mr-3 text-indigo-400" />
              <div>
                <h4 className="font-semibold">Buyer Protection</h4>
                <p className="text-sm text-gray-400">100% authentic products</p>
              </div>
            </div>
            <div className="flex items-center">
              <HelpCircle size={24} className="mr-3 text-indigo-400" />
              <div>
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-sm text-gray-400">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <ShoppingBag size={24} className="mr-2 text-indigo-400" />
              <span className="text-xl font-bold">CartCraft</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Experience the joy of shopping with CartCraft. We bring you the best products at competitive prices with excellent customer service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <YouTube size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categories/electronics" className="text-gray-400 hover:text-indigo-400 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/categories/fashion" className="text-gray-400 hover:text-indigo-400 transition-colors">Fashion</Link>
              </li>
              <li>
                <Link to="/categories/home" className="text-gray-400 hover:text-indigo-400 transition-colors">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/categories/footwear" className="text-gray-400 hover:text-indigo-400 transition-colors">Footwear</Link>
              </li>
              <li>
                <Link to="/categories/fitness" className="text-gray-400 hover:text-indigo-400 transition-colors">Fitness</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-indigo-400 transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-indigo-400 transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-indigo-400 transition-colors">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest products, offers, and updates.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 bg-gray-800 text-white text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 px-4 py-2 text-white text-sm font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2025 CartCraft. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-indigo-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;