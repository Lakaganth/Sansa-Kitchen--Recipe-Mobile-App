import firebase from "firebase";
import "@firebase/firestore";

let config = {
  apiKey: "AIzaSyB5iSGbY8hb0nfYnieVg9Z8OjcWjSufAdM",
  authDomain: "sansa-kitchen.firebaseapp.com",
  databaseURL: "https://sansa-kitchen.firebaseio.com",
  projectId: "sansa-kitchen",
  storageBucket: "sansa-kitchen.appspot.com",
  messagingSenderId: "485472646835",
  appId: "1:485472646835:web:9d7fad6451a5b1649d62c6"
};

firebase.initializeApp(config);

export default firebase;
