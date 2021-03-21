/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { vibration } from '../../../db';

/**
 * Delete vibration from Firestore.
 */

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { vibrationId } = req.params;
  try {
    await vibration(vibrationId).delete();
    res.sendStatus(204);
  } catch (error) {
    console.log('Error getting document', error);
    next(error);
  };
};
