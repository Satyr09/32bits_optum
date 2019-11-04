import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC7J4YSoelvo1NwzkTF30J82ytcKZOMj5w",
  authDomain: "optum-bc995.firebaseapp.com",
  databaseURL: "https://optum-bc995.firebaseio.com",
  projectId: "optum-bc995",
  storageBucket: "optum-bc995.appspot.com",
  messagingSenderId: "477573199523",
  appId: "1:477573199523:web:9a122e2ca50bc59b8af116"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
