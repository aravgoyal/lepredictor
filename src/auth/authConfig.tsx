// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpFFgM1b4gKNh43s-fn6PujiiAbaBqBaM",
  authDomain: "momentum-8a71a.firebaseapp.com",
  projectId: "momentum-8a71a",
  storageBucket: "momentum-8a71a.appspot.com",
  messagingSenderId: "355735602873",
  appId: "1:355735602873:web:6a8b4e05bf13a32e5a3d68",
  measurementId: "G-LGZC1RLQHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Intilizes firebase authentication and get a reference to the service
const auth = getAuth(app);

export { auth };