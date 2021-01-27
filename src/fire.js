import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

  var firebaseConfig = {
    apiKey: "AIzaSyAwSOoRePmSjePdLohaNTKAQtm9_aLnIQQ",
    authDomain: "steamweb-96645.firebaseapp.com",
    projectId: "steamweb-96645",
    storageBucket: "steamweb-96645.appspot.com",
    messagingSenderId: "1026749796823",
    appId: "1:1026749796823:web:964a3cc51c400f3793fb92"
  };
  

const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export { db, fire }

