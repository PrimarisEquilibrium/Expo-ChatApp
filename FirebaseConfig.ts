// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhwHE1niVkR8NcDjnLJvj7rBsVfukqOU0",
  authDomain: "expo-chatapp-f71c4.firebaseapp.com",
  projectId: "expo-chatapp-f71c4",
  storageBucket: "expo-chatapp-f71c4.firebasestorage.app",
  messagingSenderId: "1058080286035",
  appId: "1:1058080286035:web:fec1609e99f2bf828dada6",
  measurementId: "G-M89N9Z15YS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
