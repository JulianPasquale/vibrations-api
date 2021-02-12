/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { vibration } from '../../../db';
import { APIResponse } from '..';

/**
 * Get vibrations details from Firestore.
 */

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { vibrationId } = req.params;

  try {
    const docRef = await vibration(vibrationId).get()

    if (!docRef.exists) {
      console.log('No matching documents.');
      res.sendStatus(404);
    };

    res.send({
      id: vibrationId,
      ...docRef.data(),
    } as APIResponse);
  } catch (error) {
    console.log('Error getting documents', error);
    next(error);
  };
};
