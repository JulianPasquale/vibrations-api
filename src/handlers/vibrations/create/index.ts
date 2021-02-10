/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import db from '../../../db';
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

  if (!category) {
    res.status(422).send('Invalid format.');
    return;
  };

  const collection = db.collection('categories').doc(category).collection('vibrations');
  const docRef = id ? collection.doc(id) : collection.doc();

  docRef.set({ name, data })
    .then(() => (
      res.status(201).send(
        {
          id: id,
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
