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

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.body.category || !req.body.name || !req.body.data) {
      res.status(422).send('Invalid format.');
      return;
    };

    const { name, data, category }: RequestBody = req.body;

    let docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    let status: number;

    if (req.body.id) {
      docRef = vibration(req.body.id);
      status = 200;
    } else {
      status = 201;
      docRef = vibrations.doc();
    };

    await docRef.set({ name, data, category });

    res.status(status).send(
      {
        id: docRef.id,
        data: data,
        name: name,
        category: category,
      } as APIResponse
    );
  } catch (error) {
    console.log('Error creating vibration', error);
    next(error);
  };
};
