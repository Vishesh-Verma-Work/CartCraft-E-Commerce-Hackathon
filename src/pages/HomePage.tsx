import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import { ShoppingBag, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading data
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(productsData);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // Separate featured products (high rating)
  const featuredProducts = products
    .filter(product => product.rating >= 4.7)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-20">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Shopping Reimagined for You
        </h1>
        <p className="text-lg mb-6 text-indigo-100">
          Explore a world of endless possibilities with top-rated products tailored to your needs. Our platform brings you an incredible shopping experience with competitive prices, quick deliveries, and a variety of exclusive deals. Whether you’re looking for everyday essentials or special items, we've got you covered—right at your doorstep.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/products"
            className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/categories"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-4 -left-4 bg-indigo-400 rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
            <span className="text-xl font-bold">₹</span>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260"
              alt="Shopping"
              className="w-full h-48 object-cover rounded"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
            <ShoppingBag size={28} className="text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <Package className="text-indigo-600 h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders above ₹499 across India</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <svg className="text-indigo-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">100% Authentic</h3>
          <p className="text-gray-600">All products are original with warranty</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <svg className="text-indigo-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">10-day easy return policy on most items</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <svg className="text-indigo-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">24/7 Customer Support</h3>
          <p className="text-gray-600">Get help anytime, anywhere. We're here for you!</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <svg className="text-indigo-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-4-4H8a4 4 0 00-4 4v4m0 0l4 4h4l4-4m0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10l4-2 4 2 4-2 4 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
          <p className="text-gray-600">Your data is safe with encrypted payment options</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <svg className="text-indigo-600 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Wide Product Selection</h3>
          <p className="text-gray-600">Explore a variety of categories from electronics to fashion</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/categories" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-72 animate-pulse">
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <p className="text-xl font-bold text-indigo-600">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/categories/electronics" className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                alt="Electronics" 
                className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end p-4">
                <span className="text-white font-semibold">Electronics</span>
              </div>
            </Link>
            <Link to="/categories/fashion" className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                alt="Fashion" 
                className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end p-4">
                <span className="text-white font-semibold">Fashion</span>
              </div>
            </Link>
            <Link to="/categories/home" className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.pexels.com/photos/6207297/pexels-photo-6207297.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                alt="Home" 
                className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end p-4">
                <span className="text-white font-semibold">Home & Kitchen</span>
              </div>
            </Link>
            <Link to="/categories/footwear" className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                alt="Footwear" 
                className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end p-4">
                <span className="text-white font-semibold">Footwear</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      {!isLoading && <ProductGrid products={products} title="All Products" />}
    </div>
  );
};

export default HomePage;