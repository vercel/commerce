'use client';
import { isLoggedIn } from 'components/auth/actions';
import { createContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const isLogged = await isLoggedIn();
      setIsAuthenticated(isLogged);
      setLoading(false);
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
