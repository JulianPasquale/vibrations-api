/**
 * Firebase admin allows to interact with Firestore service from Google Firebase.
 */

import admin from 'firebase-admin';

/**
 * Google account credentials.
 */

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export default admin.firestore();
