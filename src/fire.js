import firebase from 'firebase'

  var firebaseConfig = {
    apiKey: "AIzaSyAwSOoRePmSjePdLohaNTKAQtm9_aLnIQQ",
    authDomain: "steamweb-96645.firebaseapp.com",
    projectId: "steamweb-96645",
    storageBucket: "steamweb-96645.appspot.com",
    messagingSenderId: "1026749796823",
    appId: "1:1026749796823:web:964a3cc51c400f3793fb92"
  };
  

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
