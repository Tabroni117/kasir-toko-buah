
// firebase-config.js

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUMMYKEY123456789", // ← Ganti dengan key asli kamu
  authDomain: "tokobuhakasir.firebaseapp.com",
  projectId: "tokobuhakasir",
  storageBucket: "tokobuhakasir.appspot.com",
  messagingSenderId: "123456789000", // ← Ganti dengan yang sesuai
  appId: "1:123456789000:web:abc123def456gh789" // ← Ganti dengan App ID asli
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = firebase.firestore();
