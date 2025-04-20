import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200 hover:border-indigo-500">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {product.stock <= 5 && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Only {product.stock} left!
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug line-clamp-1">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="capitalize">{product.category}</span>
          </div>

          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-xl font-extrabold text-indigo-600">
              {formatPrice(product.price)}
            </p>
            <button className="hidden group-hover:flex items-center px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow hover:bg-indigo-700 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
