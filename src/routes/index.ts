import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

/* GET vibrations listing. */
router.get('/', (_req: Request, res: Response, _next: NextFunction): void => {
  res.send('respond with a resource');
});

export default router;
