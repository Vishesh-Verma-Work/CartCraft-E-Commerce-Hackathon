import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Format price with Indian Rupee symbol and thousand separators
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 last:border-b-0">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Product details */}
      <div className="sm:ml-6 flex flex-col sm:flex-row flex-1 justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
          <p className="text-sm text-gray-500 mt-1">Unit Price: {formatPrice(item.price)}</p>
        </div>
        
        <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
          {/* Price */}
          <p className="text-lg font-semibold text-indigo-600">
            {formatPrice(item.price * item.quantity)}
          </p>
          
          {/* Quantity controls */}
          <div className="flex items-center mt-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="text-gray-500 focus:outline-none disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            
            <span className="mx-2 w-8 text-center">{item.quantity}</span>
            
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="text-gray-500 focus:outline-none disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
            
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 focus:outline-none"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;