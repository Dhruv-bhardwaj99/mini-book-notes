import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiELMe6yxh2vdeJvB-XInhJXcWJ8BL1P4",
  authDomain: "mini-book-notes.firebaseapp.com",
  projectId: "mini-book-notes",
  storageBucket: "mini-book-notes.firebasestorage.app",
  messagingSenderId: "914704822637",
  appId: "1:914704822637:web:253a2d11f6ad8ed683ea64",
  measurementId: "G-L2EVB2QQS2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);