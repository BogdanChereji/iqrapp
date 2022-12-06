import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRh8QpTfgUHalOhLSQPRcBVsECFJfmN0Q",
  authDomain: "iqr-app.firebaseapp.com",
  databaseURL: "https://iqr-app-default-rtdb.firebaseio.com",
  projectId: "iqr-app",
  storageBucket: "iqr-app.appspot.com",
  messagingSenderId: "115907946296",
  appId: "1:115907946296:web:42ed90c8e556f9b8b343cd",
};

let firebaseapp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = getAuth(firebaseapp);
let firebaseDb = getDatabase(firebaseapp);

export { firebaseAuth, firebaseDb };
