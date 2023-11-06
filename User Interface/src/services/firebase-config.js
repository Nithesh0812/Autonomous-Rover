import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);