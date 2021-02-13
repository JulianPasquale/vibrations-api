/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { vibration, vibrations } from '../../../db';
import { APIResponse, VibrationData } from '..';

interface RequestBody {
  category: string,
  id?: string,
  name: string,
  data: VibrationData,
};

/**
 * Store vibrations in Firestore.
 */

export default (req: Request, res: Response, next: NextFunction): void => {
  const { id, name, data, category }: RequestBody = req.body;

  if (!category || !name) {
    res.status(422).send('Invalid format.');
    return;
  };

  let docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  let status: number;

  if (id) {
    docRef = vibration(id);
    status = 200;
  } else {
    status = 201;
    docRef = vibrations.doc();
  }

  docRef.set({ name, data, category })
    .then(() => (
      res.status(status).send(
        {
          id: docRef.id,
          data: data,
          name: name,
          category: category,
        } as APIResponse
      )
    ))
    .catch((error) => {
      console.error(error);
      next(error);
    });
};
