// firebaseConfig.js
// const dotenv = require('dotenv');
// dotenv.config(); 
const { initializeApp } =require("firebase/app");
const { getStorage } = require("firebase/storage");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    appId: process.env.APP_ID,
    messagingSenderId: process.env.SENDER_ID,
    measurementId: process.env.MEASUREMENT_ID,
    authDomain: process.env.AUTH_DOMAIN,

  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// console.log(firebaseApp);

const storage = getStorage(firebaseApp);

module.exports=  storage ;
