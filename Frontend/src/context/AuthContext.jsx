import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('user');
  const [isSignin, setIsSignin] = useState(false);

  // Add these console logs for debugging purposes
  console.log('AuthProvider render:', { role, isSignin });

  return (
    <AuthContext.Provider value={{ role, setRole, isSignin, setIsSignin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
