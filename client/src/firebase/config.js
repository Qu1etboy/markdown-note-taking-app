// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbCxE2qQTgB1ZZ_YJEsHvkm8_nM5tHqsk",
  authDomain: "note-taking-app-62ff1.firebaseapp.com",
  projectId: "note-taking-app-62ff1",
  storageBucket: "note-taking-app-62ff1.appspot.com",
  messagingSenderId: "147311856151",
  appId: "1:147311856151:web:a41d6908910461e9b2ea52",
  measurementId: "G-TXPV9D47LP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
