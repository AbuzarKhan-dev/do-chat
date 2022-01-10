import  { initializeApp }  from 'firebase/app';
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore';
// import { collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyBKQE65H1YVHPiiUM0AwRUuuZGImg9rgsw",
  authDomain: "do-chat-3f894.firebaseapp.com",
  projectId: "do-chat-3f894",
  storageBucket: "do-chat-3f894.appspot.com",
  messagingSenderId: "142688831773",
  appId: "1:142688831773:web:7ad9691f1a7a81128479f4",
});



//Firebase Authentication
export const auth =  getAuth(app);
//Firebase Database
export const db =  getFirestore();
// app
export default app;

