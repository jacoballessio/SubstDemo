
import firebase from 'firebase/app';
let firebaseConfig = {
    apiKey: "AIzaSyB0YksSwW1EB788GmuDuZpO2tTKJAezHpU",
    aauthDomain: "subst-app.firebaseapp.com",
    databaseURL: "https://subst-app.firebaseio.com",
    projectId: "subst-app",
    storageBucket: "subst-app.appspot.com",
    messagingSenderId: "172488889933",
    appId: "1:172488889933:web:9f9bee754b15f31a1c6e04",
    measurementId: "G-VGQR7410B4"
  };
  firebase.initializeApp(firebaseConfig);

export default firebase;