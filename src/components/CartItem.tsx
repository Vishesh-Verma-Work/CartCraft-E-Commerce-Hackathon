import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-6 border-b border-gray-200 last:border-b-0">
      
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Details and Actions */}
      <div className="sm:ml-6 flex flex-1 flex-col sm:flex-row justify-between w-full">
        
        {/* Product Details */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
          <p className="text-sm text-gray-500 mt-1">
            Unit Price: <span className="font-medium">{formatPrice(item.price)}</span>
          </p>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
          <p className="text-lg font-bold text-indigo-600">
            {formatPrice(item.price * item.quantity)}
          </p>

          <div className="flex items-center mt-2">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>

            <span className="mx-2 w-8 text-center">{item.quantity}</span>

            <button
              onClick={handleIncrease}
              disabled={item.quantity >= item.stock}
              className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>

            <button
              onClick={handleRemove}
              className="ml-4 text-red-500 hover:text-red-600 transition-colors"
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
