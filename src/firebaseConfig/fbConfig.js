import firebase from 'firebase'

const settings = {timestampsInSnapshots: true}


var firebaseConfig = {
    apiKey: "AIzaSyDXC3pM7s6ZDAtq8BtgJGbWvhtvFTW61B8",
    authDomain: "astrology-7cec1.firebaseapp.com",
    projectId: "astrology-7cec1",
    storageBucket: "astrology-7cec1.appspot.com",
    messagingSenderId: "165698073340",
    appId: "1:165698073340:web:b363256949bb4ffbd45d79"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);

  export default firebase;