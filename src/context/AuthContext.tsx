import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => false,
  signup: () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email and password
    const foundUser = users.find((u: User) => 
      u.email === email && u.password === password
    );
    
    if (foundUser) {
      // Save user to state and localStorage
      setUser(foundUser);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user with email already exists
    const existingUser = users.find((u: User) => u.email === email);
    
    if (existingUser) {
      toast.error('User with this email already exists');
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };
    
    // Add new user to localStorage
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Log in the new user
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast.success(`Welcome to CartCraft, ${name}!`);
    return true;
  };

  const logout = () => {
    // Remove user from state and localStorage
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};