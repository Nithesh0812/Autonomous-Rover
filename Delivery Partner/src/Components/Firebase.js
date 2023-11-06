import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import "firebase/compat/database";


const firebaseConfig = {
  apiKey: "AIzaSyBnyOFCtqlbt9ra4DRJzcalQ80EamOQnfA",
  authDomain: "roverisautobot.firebaseapp.com",
  databaseURL: "https://roverisautobot-default-rtdb.firebaseio.com",
  projectId: "roverisautobot",
  storageBucket: "roverisautobot.appspot.com",
  messagingSenderId: "267468256814",
  appId: "1:267468256814:web:201e86296f0ff1df7991bf",
  measurementId: "G-KR7XMHNFSC"
};


const firebaseDB=firebase.initializeApp(firebaseConfig);
// const db=firebase.firestore();
const auth=firebase.auth();
const storage=firebase.storage()

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const storage = getStorage(app);
export {auth};
export {storage};
// export {db};
export default firebaseDB.database().ref();