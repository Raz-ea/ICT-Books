
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw81l4QX10Mu-lFIkPN35Gmr_5nBjYszE",
  authDomain: "ict-cloud-d778b.firebaseapp.com",
  projectId: "ict-cloud-d778b",
  storageBucket: "ict-cloud-d778b.appspot.com",
  messagingSenderId: "983323057564",
  appId: "1:983323057564:web:f3351c859e362ef94c3c59"
};

initializeApp(firebaseConfig);
const db = getFirestore();
export default db;