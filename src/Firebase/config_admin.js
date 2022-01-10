
import { initializeApp } from 'firebase-admin/app';

var serviceAccount = require("path/to/serviceAccountKey.json");


const myRefreshToken = '...';  //OAuth refresher token

const app_Admin = initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://do-chat-3f894-default-rtdb.firebaseio.com",
  
});

https://firebase.google.com/docs/admin/setup#initialize-without-parameters