import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { Tag, Percent, Clock } from 'lucide-react';

const DealsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProducts(productsData);
      setIsLoading(false);
    };

    fetchProducts();
    // Reset scroll position
    window.scrollTo(0, 0);
  }, []);

  const featuredDeals = products.filter(product => product.featured);
  const flashDeals = products.filter(product => product.stock <= 5);
  const clearanceDeals = products.filter(product => product.price < 1000);

  const renderDeals = () => {
    let dealsToShow: Product[] = [];
    
    switch (activeTab) {
      case 'featured':
        dealsToShow = featuredDeals;
        break;
      case 'flash':
        dealsToShow = flashDeals;
        break;
      case 'clearance':
        dealsToShow = clearanceDeals;
        break;
      default:
        dealsToShow = featuredDeals;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealsToShow.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-72">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Today's Best Deals
          </h1>
          <p className="text-indigo-100">
            Discover amazing discounts on your favorite products
          </p>
        </div>
      </div>

      {/* Deals Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'featured'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Tag className="w-5 h-5 mr-2" />
            Featured Deals
          </button>
          <button
            onClick={() => setActiveTab('flash')}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'flash'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-5 h-5 mr-2" />
            Flash Sales
          </button>
          <button
            onClick={() => setActiveTab('clearance')}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'clearance'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Percent className="w-5 h-5 mr-2" />
            Clearance
          </button>
        </div>

        {/* Deals Grid */}
        {renderDeals()}
      </div>
    </div>
  );
};

export default DealsPage;