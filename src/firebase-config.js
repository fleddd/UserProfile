

import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD8ilulduf9dHmfsP5OomKWEtJmrdkK_BA",
  authDomain: "fedkiv-crud-tools.firebaseapp.com",
  databaseURL: "https://fedkiv-crud-tools-default-rtdb.firebaseio.com",
  projectId: "fedkiv-crud-tools",
  storageBucket: "fedkiv-crud-tools.appspot.com",
  messagingSenderId: "520827331608",
  appId: "1:520827331608:web:52aa094fde5d95d3b78f6d",
  measurementId: "G-MRZHXJDRB7"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)