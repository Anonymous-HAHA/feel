const fs = require('fs');
const crypto = require('crypto-js');
// const dotenv = require('dotenv');
const admin = require("firebase-admin");

// Load environment variables
// dotenv.config();

// Read the encrypted content from secret.txt

const encryptedContent = fs.readFileSync('../secret.txt', 'utf8');

// Decrypt the content using the secret key from environment variables
const bytes = crypto.AES.decrypt(encryptedContent, process.env.FIREBASE_SECRET_KEY);
const decrypted = bytes.toString(crypto.enc.Utf8);

// Parse the decrypted JSON content
let serviceAccountJson;
try {
    serviceAccountJson = JSON.parse(decrypted);
    // console.log('Parsed JSON Object:', serviceAccountJson);
} catch (error) {
    console.error('Error parsing JSON:', error);
}

// Initialize Firebase Admin SDK using the decrypted service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
    storageBucket: process.env.STORAGE_BUCKET
});

// You can use admin.storage() to interact with Firebase Storage

module.exports = admin;
