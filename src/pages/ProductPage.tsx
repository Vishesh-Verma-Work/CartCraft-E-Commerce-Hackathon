import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';
import toast from 'react-hot-toast';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const { addToCart } = useContext(CartContext);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const foundProduct = productsData.find(p => p.id === Number(id));
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products (same category)
        const related = productsData
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    };

    if (id) {
      fetchProduct();
    }

    // Reset scroll position
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Check out this product',
        text: product?.description || 'I found this product on CartCraft',
        url: window.location.href,
      })
      .catch(error => {
        toast.error('Error sharing product');
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  // Format price with Indian Rupee symbol and thousand separators
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="mb-4 w-32 h-6 bg-gray-200 rounded"></div>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span className="mx-2">›</span>
        <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-indigo-600 capitalize">
          {product.category}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to products
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating} rating)</span>
          </div>
          
          <p className="text-3xl font-bold text-indigo-600 mb-4">
            {formatPrice(product.price)}
          </p>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center text-sm">
              <span className={`mr-2 flex items-center ${
                product.stock > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {product.stock > 0 ? (
                  <>
                    <Check size={16} className="mr-1" />
                    In Stock
                  </>
                ) : (
                  'Out of Stock'
                )}
              </span>
              {product.stock > 0 && (
                <span className="text-gray-500">
                  ({product.stock} {product.stock === 1 ? 'unit' : 'units'} available)
                </span>
              )}
            </div>
          </div>
          
          {/* Add to Cart button */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:bg-gray-400"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
            
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-md border ${
                isWishlisted 
                  ? 'bg-red-50 border-red-300 text-red-500' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              } transition-colors`}
              aria-label="Add to Wishlist"
            >
              <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-3 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Share Product"
            >
              <Share2 size={20} />
            </button>
          </div>
          
          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
              <div className="mb-4 sm:mb-0">
                <span className="text-gray-500">Category:</span>{' '}
                <Link to={`/categories/${product.category.toLowerCase()}`} className="text-indigo-600 hover:text-indigo-800 capitalize">
                  {product.category}
                </Link>
              </div>
              <div>
                <span className="text-gray-500">SKU:</span>{' '}
                <span className="text-gray-700">PROD-{product.id.toString().padStart(4, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(related => (
              <Link key={related.id} to={`/product/${related.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={related.image} 
                      alt={related.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
                      {related.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(related.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">{related.rating}</span>
                    </div>
                    <p className="text-xl font-bold text-indigo-600">
                      {formatPrice(related.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;