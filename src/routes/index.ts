/**
 * Module dependencies.
 */

import { Router, Request, Response, NextFunction } from 'express';
import db from '../db';

/**
 * Create router
 */

const router = Router();

interface VibrationPattern {
  name: number,
  value: number,
};

interface Vibration {
  duration: number,
  pattern: VibrationPattern[],
};

interface APIResponse {
  id: string,
  data: FirebaseFirestore.DocumentData
};

/**
 * Mock value
 */

// const sample1: Vibration = {
//   duration: 1,
//   pattern: [
//     { name: 1, value: 100 },
//     { name: 2, value: 100 },
//     { name: 3, value: 100 },
//     { name: 4, value: 100 },
//   ],
// };

const sample2: Vibration = {
  duration: 1,
  pattern: [
    { name: 1, value: 50 },
    { name: 2, value: 50 },
    { name: 3, value: 200 },
    { name: 4, value: 50 },
    { name: 5, value: 50 },
  ],
};


/**
 *  GET vibrations listing.
 */

router.get('/', (_req: Request, res: Response, _next: NextFunction): void => {
  const result: APIResponse[] = [];

  db.collection('vibrations').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        result.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      res.send(result);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

/** 
 * POST create vibration.
 */

router.post('/', (_req: Request, res: Response, _next: NextFunction): void => {
  const docRef = db.collection('vibrations').doc('sample2');

  docRef.set({ ...sample2 })
    .then(() => (
      res.status(201).send(
        {
          id: 'sample2',
          data: sample2 as FirebaseFirestore.DocumentData
        } as APIResponse
      )
    ))
    .catch((error) => console.error(error));
});

/**
 * GET vibration details.
 */

router.get('/:vibrationId', (req: Request, res: Response, _next: NextFunction): void => {
  const { vibrationId } = req.params;
  db.collection('vibrations').doc(vibrationId).get()
    .then((docRef) => {

      if (!docRef.exists) {
        console.log('No matching documents.');
        res.sendStatus(404);
      };

      res.send({
        id: vibrationId,
        data: docRef.data()
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

export default router;
