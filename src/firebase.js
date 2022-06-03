// import firebase from "firebase";

// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyBFZul9f7Er1kS8ZH61np9vYuyJf8gvVhI",
//     authDomain: "instagram-clone-react-94781.firebaseapp.com",
//     projectId: "instagram-clone-react-94781",
//     storageBucket: "instagram-clone-react-94781.appspot.com",
//     messagingSenderId: "725136903964",
//     appId: "1:725136903964:web:f74d5be6b9cfda744d34d9",
//     measurementId: "G-607R5LGEM7"
// });
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBFZul9f7Er1kS8ZH61np9vYuyJf8gvVhI",
  authDomain: "instagram-clone-react-94781.firebaseapp.com",
  projectId: "instagram-clone-react-94781",
  storageBucket: "instagram-clone-react-94781.appspot.com",
  messagingSenderId: "725136903964",
  appId: "1:725136903964:web:f74d5be6b9cfda744d34d9",
  measurementId: "G-607R5LGEM7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export {db,auth,storage};


