import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Firebase конфиг
const firebaseConfig = {
  apiKey: "AIzaSyB2FfJWFRg3IQfsjvOogWmeXJSx3f1sFRs",
  authDomain: "chat-c2e51.firebaseapp.com",
  projectId: "chat-c2e51",
  storageBucket: "chat-c2e51.firebasestorage.app",
  messagingSenderId: "848494960870",
  appId: "1:848494960870:web:643b21f2fd50eeafc15b27",
  measurementId: "G-21XN57S898",
};

// Проверка на дублирование экземпляра
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics подключен");
      }
    })
    .catch((err) => {
      console.error("Ошибка подключения Firebase Analytics:", err);
    });
}

export { app, analytics };
