import { Router, Request, Response } from 'express';
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World!' });
});

export default router;
