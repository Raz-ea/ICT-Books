import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHa1b-E0sGfugxpgg59ao2oaXIaK5MB1I",
    authDomain: "ict-cloud.firebaseapp.com",
    projectId: "ict-cloud",
    storageBucket: "ict-cloud.appspot.com",
    messagingSenderId: "484559424277",
    appId: "1:484559424277:web:8f98062047a8f846b5371c"
  }

initializeApp(firebaseConfig)
const db = getFirestore();
export default db;