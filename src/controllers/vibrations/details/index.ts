/**
 * Module dependencies.
 */

import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '..';

/**
 * Get vibrations details from Firestore.
 */

export default (req: Request, res: Response, _next: NextFunction): void => {
  const { vibrationId } = req.params;

  res.send({
    id: vibrationId,
    ...res.locals.vibration,
  } as APIResponse);
};
