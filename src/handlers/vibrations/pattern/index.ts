/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';
import { Vibration } from '..';

/**
 * Get vibrations details in pattern format from Firestore.
 */

export default (req: Request, res: Response, _next: NextFunction): void => {
  const { vibrationId } = req.params;
  db.collection('vibrations').doc(vibrationId).get()
    .then((docRef) => {

      if (!docRef.exists) {
        console.log('No matching documents.');
        res.sendStatus(404);
        return;
      };

      const vibration = docRef.data() as Vibration;

      res.send(vibration.pattern.map(pattern => pattern.value));
    })
    .catch((err: Error) => {
      console.log('Error getting documents', err);
    });
};
