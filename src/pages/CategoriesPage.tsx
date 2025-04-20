import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';
import productsData from '../data/products.json';

const CategoriesPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));

      let filteredProducts = productsData;
      if (category) {
        filteredProducts = productsData.filter(
          p => p.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    };

    fetchProducts();
    // Reset scroll position
    window.scrollTo(0, 0);
  }, [category]);

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
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {category ? `${category} Products` : 'All Categories'}
          </h1>
          <p className="text-indigo-100">
            {category
              ? `Explore our collection of ${category.toLowerCase()} products`
              : 'Browse through all our product categories'}
          </p>
        </div>
      </div>
      
      <ProductGrid 
        products={products} 
        title={category ? undefined : 'All Products'} 
      />
    </div>
  );
};

export default CategoriesPage;