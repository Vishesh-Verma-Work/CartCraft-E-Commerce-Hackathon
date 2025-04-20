import React, { useState, useEffect } from 'react';
import { Product, FilterOptions } from '../types';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { ArrowUpCircle as CircleArrowUp } from 'lucide-react';

// Default filter options
const defaultFilterOptions: FilterOptions = {
  category: '',
  minPrice: 0,
  maxPrice: 100000,
  search: '',
  sort: 'default'
};

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);

  // Extract all categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (filterOptions.category && filterOptions.category !== 'All') {
      result = result.filter(product => product.category === filterOptions.category);
    }

    // Price filter
    result = result.filter(product => 
      product.price >= filterOptions.minPrice && 
      product.price <= filterOptions.maxPrice
    );

    // Search filter
    if (filterOptions.search) {
      const searchTerm = filterOptions.search.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Sorting (always on cloned array)
    switch (filterOptions.sort) {
      case 'price-low-high':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // Default featured, no sorting
    }

    setFilteredProducts(result);
  }, [filterOptions, products]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  };

  // Back to top logic
  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Title */}
      {title ? (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      ) : (
        <h2 className="sr-only">Products</h2>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="md:w-1/4 lg:w-1/5">
          <ProductFilter 
            categories={categories}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 lg:w-4/5">
          {/* Count and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-600 mb-2 sm:mb-0">
              Showing <span className="font-semibold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>

            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-600 mr-2">Sort by:</label>
              <select
                id="sort"
                value={filterOptions.sort}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="default">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search term to find products.
              </p>
              <button
                onClick={() => setFilterOptions(defaultFilterOptions)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out opacity-80 hover:opacity-100"
          aria-label="Back to top"
        >
          <CircleArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default ProductGrid;
