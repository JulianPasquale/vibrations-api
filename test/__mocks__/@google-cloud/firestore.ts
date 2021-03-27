import { mockGoogleCloudFirestore } from 'firestore-jest-mock';
import vibration from '../../mock_files/firestore_vibration.json';

mockGoogleCloudFirestore({
  database: {
    vibrations: [
      vibration,
    ],
  },
});
