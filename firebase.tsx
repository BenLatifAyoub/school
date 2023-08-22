import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWmp13mBFfGiHsFFfhQrDXbVPlNegC49Q",
  authDomain: "true-river-365800.firebaseapp.com",
  projectId: "true-river-365800",
  storageBucket: "true-river-365800.appspot.com",
  messagingSenderId: "1050390749213",
  appId: "1:1050390749213:web:1a44ae0e33dd41cbc7e6f4",
  measurementId: "G-LF9MZSCX46",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
