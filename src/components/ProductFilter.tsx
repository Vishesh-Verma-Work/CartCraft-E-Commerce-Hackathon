import React, { useState } from 'react';
import { FilterOptions } from '../types';
import { Filter, X } from 'lucide-react';

interface ProductFilterProps {
  categories: string[];
  filterOptions: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  categories, 
  filterOptions, 
  onFilterChange 
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ minPrice: min, maxPrice: max });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ category: category === 'All' ? '' : category });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: 0,
      maxPrice: 100000,
      search: '',
      sort: 'default'
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Filters</h3>

        <button 
          className="md:hidden flex items-center gap-1 text-indigo-600 font-medium"
          onClick={toggleFilterVisibility}
        >
          {isFilterVisible ? (
            <>
              <X size={20} />
              <span>Hide</span>
            </>
          ) : (
            <>
              <Filter size={20} />
              <span>Show</span>
            </>
          )}
        </button>
      </div>

      <div className={`space-y-6 ${isFilterVisible ? 'block' : 'hidden'} md:block`}>
        
        {/* Search */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={filterOptions.search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder-gray-400"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Categories</label>
          <div className="space-y-2">
            {categories.map(category => (
              <label 
                key={category} 
                htmlFor={`category-${category}`} 
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="category"
                  checked={category === 'All' ? !filterOptions.category : filterOptions.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="accent-indigo-600 w-4 h-4"
                />
                <span className="text-gray-700 text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Price Range (₹{filterOptions.minPrice} - ₹{filterOptions.maxPrice})
          </label>
          <div className="space-y-2">
            {[
              { label: 'Under ₹1,000', min: 0, max: 1000 },
              { label: '₹1,000 - ₹3,000', min: 1000, max: 3000 },
              { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
              { label: 'Above ₹5,000', min: 5000, max: 100000 }
            ].map(({ label, min, max }) => (
              <button 
                key={label}
                onClick={() => handlePriceChange(min, max)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${filterOptions.minPrice === min && filterOptions.maxPrice === max 
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Custom Range */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="number"
              min="0"
              value={filterOptions.minPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value), filterOptions.maxPrice)}
              className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder-gray-400"
              placeholder="Min"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              min={filterOptions.minPrice}
              value={filterOptions.maxPrice}
              onChange={(e) => handlePriceChange(filterOptions.minPrice, Number(e.target.value))}
              className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder-gray-400"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg text-sm transition-all"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
