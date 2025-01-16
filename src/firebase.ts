import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBR9SitVaP7uKCbtEM5dqnaftrfXJPpmwQ",
    authDomain: "resect-a.firebaseapp.com",
    projectId: "resect-a",
    storageBucket: "resect-a.firebasestorage.app",
    messagingSenderId: "2603506981",
    appId: "1:2603506981:web:337ea14af29a4a56964ecc",
    measurementId: "G-BE02XZKTN4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };