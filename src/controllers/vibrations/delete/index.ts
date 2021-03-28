/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Delete vibration from Firestore.
 */

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await res.locals.vibration.delete();
    res.sendStatus(204);
  } catch (error) {
    console.log('Vibration could not be deleted', error);
    next(error);
  };
};
