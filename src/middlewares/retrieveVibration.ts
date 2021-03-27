/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { vibration } from '../db';
import { VibrationData } from '../controllers/vibrations';

/**
* Get vibrations from DB.
*/

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { vibrationId } = req.params;
    const docRef = await vibration(vibrationId).get();

    if (!docRef.exists) {
      console.log('No matching documents.');
      res.sendStatus(404);
    };

    res.locals.vibration = docRef.data() as VibrationData;

    next();
  }
  catch (error) {
    console.log('Error getting documents', error);
    next(error);
  };
};
