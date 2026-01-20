// Firebase Service — functions for authentication and Firestore usage
import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Register a new user with email and password
export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Login user with email and password
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Logout the current user
export async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
}

// Save data to Firestore (by collection and document id)
export async function saveData(collection, id, data) {
  try {
    await setDoc(doc(db, collection, id), data);
    return true;
  } catch (error) {
    throw error;
  }
}

// Get data from Firestore (by collection and document id)
export async function getData(collection, id) {
  try {
    const docSnap = await getDoc(doc(db, collection, id));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    throw error;
  }
}
