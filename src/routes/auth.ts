import { Router } from 'express';
import authController from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/forgotPassword', authController.forgotPassword)
authRouter.post('/resetPassword', authController.resetPassword)

export default authRouter;
