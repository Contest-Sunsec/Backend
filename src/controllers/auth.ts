import { Request, Response } from 'express';
import { loginService, registerService } from '../services/auth';
import type { serviceReturn } from '../types/service';

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Please fill all the fields',
        });
    }
    const returnData: serviceReturn = await registerService(
        name,
        email,
        password
    );
    if (returnData.status === 200) {
        const { status, message, responseData } = returnData;
        return res.status(status).json({
            status,
            message,
            responseData,
        });
    } else {
        const { status, message } = returnData;
        return res.status(status).json({
            status,
            message,
        });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Please fill all the fields',
        });
    }
    const returnData: serviceReturn = await loginService(email, password);
    if (returnData.status === 200) {
        const { status, message, responseData } = returnData;
        return res.status(status).json({
            status,
            message,
            responseData,
        });
    } else {
        const { status, message } = returnData;
        return res.status(status).json({
            status,
            message,
        });
    }
};

export default {
    register,
    login,
};
