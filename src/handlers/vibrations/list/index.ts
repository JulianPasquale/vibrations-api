/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';
import { APIResponse } from '..';

/**
 * List all vibrations from Firestore.
 */

export default (_req: Request, res: Response, next: NextFunction): void => {
  const result: APIResponse[] = [];

  db.collection('vibrations').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      res.send(result);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      next(err);
    });
};
