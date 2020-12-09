import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

/* GET vibrations listing. */
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.send('respond with a resource');
});

export default router;
