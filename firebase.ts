import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5rF8GeQsVc1d1hl7gIUk5zaaOBE4Wm4M",
  authDomain: "github-engagements.firebaseapp.com",
  projectId: "github-engagements",
  storageBucket: "github-engagements.appspot.com",
  messagingSenderId: "219347556249",
  appId: "1:219347556249:web:e78cdf9738f922ca9ca508",
  measurementId: "G-44EK9VDCLH"
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export {db};