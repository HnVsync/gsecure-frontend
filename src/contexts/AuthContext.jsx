// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Try to get current user from your API
        const response = await fetch(`${import.meta.env.VITE_APP_HOST}/gs/api/v1/users/getme`, {
          credentials: 'include' // Important for cookies
        });
        
        const data = await response.json();
        console.log("Auth user : ",data)
        if (response.ok) {
          setUser(data.data); // Set user data from the response
        } else {
          // If API request fails, clear user data
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserStatus();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading,isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);