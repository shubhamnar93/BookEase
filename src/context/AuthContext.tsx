import { createContext, useContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    getUsers,
    logoutUser,
    saveUser,
    setCurrentUser,
} from "../storage/authStorage";
import { User } from "../types";

type AuthContextType = {
  user: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session when app starts
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getCurrentUser();
      setUser(storedUser);
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const register = async (email: string, password: string) => {
    const users = await getUsers();

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) return "User already exists";

    const newUser: User = { email, password };
    await saveUser(newUser);
    await setCurrentUser(email);
    setUser(email);

    return null;
  };
  const login = async (email: string, password: string) => {
    const users = await getUsers();

    const validUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!validUser) return "Invalid credentials";

    await setCurrentUser(email);
    setUser(email);
    return null;
  };
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
