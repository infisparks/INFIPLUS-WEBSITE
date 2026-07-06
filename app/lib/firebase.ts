import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8kkQF9OYvrtSTKxP7xBq0XYi18xJHFto",
  authDomain: "realstate-843fd.firebaseapp.com",
  databaseURL: "https://realstate-843fd-default-rtdb.firebaseio.com",
  projectId: "realstate-843fd",
  storageBucket: "realstate-843fd.firebasestorage.app",
  messagingSenderId: "778478056753",
  appId: "1:778478056753:web:ea0a88c8eb307dd6b6ac10",
  measurementId: "G-2MQTW5EYBT"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
