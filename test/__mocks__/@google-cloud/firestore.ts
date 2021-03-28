import { mockGoogleCloudFirestore } from 'firestore-jest-mock';

import vibrations from '../../mock_files/firestore_vibrations.json';

mockGoogleCloudFirestore({
  database: { vibrations, },
});
