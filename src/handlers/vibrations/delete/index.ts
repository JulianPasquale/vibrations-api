/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';

/**
 * Delete vibration from Firestore.
 */

export default (req: Request, res: Response, _next: NextFunction): void => {
  const { vibrationId } = req.params;
  db.collection('vibrations').doc(vibrationId).delete()
    .then(() => res.sendStatus(204))
    .catch((err: Error) => {
      console.log('Error getting document', err);
    });
};
