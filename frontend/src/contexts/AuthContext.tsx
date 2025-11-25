import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  phone: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (
    phone: string,
    password: string,
    name?: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  //   const [test, setTest] = useState<number>(0);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Mock login implementation
    if (phone && password) {
      setUser({ phone, name: "Mock User" });
      return true;
    }
    return false;
  };

  const register = async (
    phone: string,
    password: string,
    name?: string
  ): Promise<boolean> => {
    // Mock register implementation
    if (phone && password) {
      setUser({ phone, name: name || "Mock User" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth muse be used within an AuthProvider");
  }
  return context;
};
