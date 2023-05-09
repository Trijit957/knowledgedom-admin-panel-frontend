import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUhmNuqIlX5Paq3z_-IdZ0ZIaiP_AhZ0k",
  authDomain: "knowledgedom-admin-panel.firebaseapp.com",
  projectId: "knowledgedom-admin-panel",
  storageBucket: "knowledgedom-admin-panel.appspot.com",
  messagingSenderId: "4045421804",
  appId: "1:4045421804:web:39a91bd7c30ec00297b9c9",
  measurementId: "G-MJCG173L0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, db };