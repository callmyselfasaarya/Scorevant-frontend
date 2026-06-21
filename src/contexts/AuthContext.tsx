import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthUser,
  clearAccessToken,
  fetchMe,
  getAccessToken,
  login as apiLogin,
  register as apiRegister,
  setAccessToken,
  loginWithGoogle as apiLoginWithGoogle,
  loginWithFacebook as apiLoginWithFacebook,
  loginWithApple as apiLoginWithApple,
} from '../lib/auth-api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: (idToken: string) => Promise<void>;
  loginWithFacebook: (accessToken: string) => Promise<void>;
  loginWithApple: (identityToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {},
  loginWithApple: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    fetchMe(token)
      .then(setUser)
      .catch(() => clearAccessToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { access_token, user: authUser } = await apiLogin(email, password);
    setAccessToken(access_token);
    setUser(authUser);
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    const { access_token, user: authUser } = await apiRegister(
      email,
      password,
      fullName,
    );
    setAccessToken(access_token);
    setUser(authUser);
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
  };

  const loginWithGoogle = async (idToken: string) => {
    const { access_token, user: authUser } = await apiLoginWithGoogle(idToken);
    setAccessToken(access_token);
    setUser(authUser);
  };

  const loginWithFacebook = async (accessToken: string) => {
    const { access_token, user: authUser } = await apiLoginWithFacebook(accessToken);
    setAccessToken(access_token);
    setUser(authUser);
  };

  const loginWithApple = async (identityToken: string) => {
    const { access_token, user: authUser } = await apiLoginWithApple(identityToken);
    setAccessToken(access_token);
    setUser(authUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
        loginWithFacebook,
        loginWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
