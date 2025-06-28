import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbWc-EKpKsDo6wDhQzLkmavHdKMUGBCIw",
  authDomain: "meditrack-6f38f.firebaseapp.com",
  projectId: "meditrack-6f38f",
  storageBucket: "meditrack-6f38f.firebasestorage.app",
  messagingSenderId: "750749015478",
  appId: "1:750749015478:web:17a5df88f753563d247517"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;