/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';
import { APIResponse, sample2 } from '..';

/**
 * Store vibrations in Firestore.
 */

export default (_req: Request, res: Response, _next: NextFunction): void => {
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
};
