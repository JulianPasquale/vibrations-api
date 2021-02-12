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

const db = admin.firestore();

export default db;

export const vibrations = db.collection('vibrations');
export const vibration = (id: string) => vibrations.doc(id)
