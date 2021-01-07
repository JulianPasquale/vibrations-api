/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';
import { APIResponse, VibrationData } from '..';

interface RequestBody {
  id: string,
  data: VibrationData,
};

/**
 * Store vibrations in Firestore.
 */

export default (req: Request, res: Response, next: NextFunction): void => {
  const { id, data }: RequestBody = req.body;

  if (!id || !data) {
    res.status(422).send('Invalid format.');
    return;
  };

  const docRef = db.collection('vibrations').doc(id);

  docRef.set({ ...data })
    .then(() => (
      res.status(201).send(
        {
          id: id,
          data: data
        } as APIResponse
      )
    ))
    .catch((error) => {
      console.error(error);
      next(error);
    });
};
