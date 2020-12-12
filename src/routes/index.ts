/**
 * Module dependencies.
 */

import { Router, Request, Response, NextFunction } from 'express';
import db from '../db';

/**
 * Create router
 */

const router = Router();

/**
 * Mock value
 */
const vibration = {
  duration: 1,
  pattern: [
    { name: 1, value: 100 },
    { name: 2, value: 100 },
    { name: 3, value: 100 },
    { name: 4, value: 100 },
  ],
};


/* GET vibrations listing. */

router.get('/', (_req: Request, res: Response, _next: NextFunction): void => {
  res.send('respond with a resource');
});

/* POST create vibration. */

router.post('/', (_req: Request, res: Response, _next: NextFunction): void => {
  console.log('hola');
  const docRef = db.collection('vibrations').doc('sample1');

  docRef.set({ vibration })
    .then(() => res.send(vibration))
    .catch((error) => console.error(error));
});

export default router;
