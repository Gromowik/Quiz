import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/config";

// Create the authentication context
const AuthContext = createContext();

// Custom hook for easy access to the context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component to wrap the app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  // Register a new user
  async function register(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  // Login user
  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // Logout user
  async function logout() {
    return await signOut(auth);
  }

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
