import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  // Calculate shipping cost (free for orders above ₹499)
  const shippingCost = cartTotal > 499 ? 0 : 49;

  // Calculate final amount
  const finalAmount = cartTotal + shippingCost - discount;

  // Format price with Indian Rupee symbol and thousand separators
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Apply coupon
  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    // Check if coupon is already applied
    if (appliedCoupon) {
      toast.error('A coupon is already applied');
      return;
    }

    // Mock coupon codes
    const validCoupons = [
      { code: 'WELCOME10', discount: 0.1 },
      { code: 'SAVE20', discount: 0.2 },
      { code: 'FLAT100', discount: 100 },
    ];

    const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase());

    if (coupon) {
      // Calculate discount amount
      let discountAmount;
      if (coupon.code === 'FLAT100') {
        discountAmount = 100;
      } else {
        discountAmount = Math.round(cartTotal * coupon.discount);
      }

      setDiscount(discountAmount);
      setAppliedCoupon(coupon.code);
      toast.success(`Coupon "${coupon.code}" applied successfully!`);
    } else {
      toast.error('Invalid coupon code');
    }

    setCouponCode('');
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    toast.success('Coupon removed');
  };

  // Handle checkout
  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    clearCart();
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            Start Shopping <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Cart Items ({cartItems.length})
            </h2>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Clear Cart
              </button>
              
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center"
              >
                Continue Shopping
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-800">
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    Discount
                    <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {appliedCoupon}
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="ml-1 text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </span>
                  <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-indigo-600">{formatPrice(finalAmount)}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            {!appliedCoupon && (
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-gray-800 px-4 py-2 text-white text-sm font-medium rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Try WELCOME10, SAVE20, or FLAT100</p>
              </div>
            )}
            
            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <CreditCard size={18} className="mr-2" />
              Proceed to Checkout
            </button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Secure Checkout powered by CartCraft Pay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;