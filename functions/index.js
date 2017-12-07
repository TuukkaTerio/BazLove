// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Cloud Function for deleting all messages.
// cron-job.org will trigger the function on every Monday at 11am.
exports.deleteMessages = functions.https.onRequest((req, res) => {
  admin.database().ref('messages').remove()
});
