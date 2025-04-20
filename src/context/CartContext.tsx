import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '../types';
import { toast } from 'react-hot-toast';

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Calculate cart total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    // Calculate cart count
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        toast.success(`${product.name} quantity updated in cart`);
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from cart`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartTotal,
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};