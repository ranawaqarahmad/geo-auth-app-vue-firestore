// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvQVpeWETa4UxWKITk8eCii5Qtl04fhWI",
  authDomain: "geo-auth-vue-app.firebaseapp.com",
  projectId: "geo-auth-vue-app",
  storageBucket: "geo-auth-vue-app.appspot.com",
  messagingSenderId: "679972502982",
  appId: "1:679972502982:web:ebaeafa12b3d0984de46c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
