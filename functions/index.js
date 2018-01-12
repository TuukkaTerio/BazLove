// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const fetch = require('node-fetch');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Cloud Function for deleting all messages.
// cron-job.org will trigger the function on every Monday at 11am.
exports.deleteMessages = functions.https.onRequest((req, res) => {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear()+'-';
  const month = (currentDate.getUTCMonth()<10?'0':'')+(currentDate.getUTCMonth()+1)+'-';
  const date = (currentDate.getUTCDate()<10?'0':'')+(currentDate.getUTCDate()+1)+'T';
  const start = '00:00:00Z';
  const end = '23:59:59Z';
  const timeMin = year + month + date + start;
  const timeMax = year + month + date + end;
  // Get holidays for the current date from Google Calendar API
  const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/en.swedish%23holiday%40group.v.calendar.google.com/events?timeMin=' + timeMin + '&timeMax=' + timeMax + '&key=AIzaSyA1jt7IbTfGXj6ySvMBmkM5u85f9rAie3Y';
  fetch(apiUrl)
  .then((resp) => resp.json())
  .then(function(jsonResp) {
    let holidayArray = jsonResp.items;
    if(holidayArray.length > 0) {
      // It is a holiday
      return;
    } else {
      // It is NOT a holiday
      admin.database().ref('messages').remove()
    }
  });
});
