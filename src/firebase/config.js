// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU_yYq6Xnob2-Bsig_e6RpzW3f-wZ12O8",
  authDomain: "memory-4fe1c.firebaseapp.com",
  projectId: "memory-4fe1c",
  storageBucket: "memory-4fe1c.firebasestorage.app",
  messagingSenderId: "886234152233",
  appId: "1:886234152233:web:9bc5b8693e63e96b28cb38",
  measurementId: "G-CE6BJ7907V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);