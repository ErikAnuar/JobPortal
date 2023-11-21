// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD50slTq6u7KFqEnGRTSd1i2h9cdnTvQJM",
  authDomain: "jobportal-rmt.firebaseapp.com",
  projectId: "jobportal-rmt",
  storageBucket: "jobportal-rmt.appspot.com",
  messagingSenderId: "494974081632",
  appId: "1:494974081632:web:a3656d2c307bd06c35c105",
  measurementId: "G-6LN7XSZF9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
