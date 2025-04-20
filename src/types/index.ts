export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

export type FilterOptions = {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  sort: string;
};