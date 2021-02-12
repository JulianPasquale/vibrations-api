/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { vibrations } from '../../../db';
import { APIResponse } from '..';

/**
 * List all vibrations from Firestore.
 */

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result: APIResponse[] = [];

  try {
    const snapshot = await vibrations.get();

    snapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...doc.data(),
      } as APIResponse);
    });
    res.send(result);

  } catch (error) {
    console.log('Error getting documents', error);
    next(error);
  };
};
