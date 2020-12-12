/**
 * Firebase admin allows to interact with Firestore service from Google Firebase.
 */

import admin from 'firebase-admin';

/**
 * Google account credentials.
 */

import serviceAccount from '../../vibration-api-google-access.json';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
});

export default admin.firestore();
