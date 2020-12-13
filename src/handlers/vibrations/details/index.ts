/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';
import { APIResponse } from '..';

/**
 * Get vibrations details from Firestore.
 */

export default (req: Request, res: Response, _next: NextFunction): void => {
  const { vibrationId } = req.params;
  db.collection('vibrations').doc(vibrationId).get()
    .then((docRef) => {

      if (!docRef.exists) {
        console.log('No matching documents.');
        res.sendStatus(404);
      };

      res.send({
        id: vibrationId,
        data: docRef.data(),
      } as APIResponse);
    })
    .catch((err: Error) => {
      console.log('Error getting documents', err);
    });
};
