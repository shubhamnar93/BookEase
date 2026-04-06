import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

/**
 * Get all registered users
 */
export const getUsers = async (): Promise<User[]> => {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save logged in user session
 */
export const setCurrentUser = async (email: string) => {
  await AsyncStorage.setItem(CURRENT_USER_KEY, email);
};
/**
 * Get logged in user session
 */
export const getCurrentUser = async (): Promise<string | null> => {
  return AsyncStorage.getItem(CURRENT_USER_KEY);
};
/**
 * Logout
 */
export const logoutUser = async () => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Save new user during register
 */
export const saveUser = async (user: User) => {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};
