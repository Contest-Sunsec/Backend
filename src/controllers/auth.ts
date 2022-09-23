import { Request, Response } from 'express';
import {
    loginService,
    registerService,
    forgotPasswordService,
    resetPasswordService,
    getUserDataService,
} from '../services/auth';
import type { serviceReturn } from '../types/service';

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        return res.status(400).json({
            message: '빈 칸을 모두 채워주세요',
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
            message: '빈 칸을 모두 채워주세요',
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

const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: '이메일을 입력해주세요',
        });
    }
    const returnData: serviceReturn = await forgotPasswordService(email);

    if (returnData.status === 200) {
        const { status, message } = returnData;
        return res.status(status).json({
            status,
            message,
        });
    } else {
        const { status, message } = returnData;
        return res.status(status).json({
            status,
            message,
        });
    }
};

const resetPassword = async (req: Request, res: Response) => {
    const { password, token } = req.body;

    if (!password) {
        return res.status(400).json({
            message: '비밀번호를 입력해주세요',
        });
    }

    if (!token) {
        return res.status(400).json({
            message: '토큰이 없습니다',
        });
    }

    const returnData: serviceReturn = await resetPasswordService(
        password,
        token
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

const getUserData = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    console.log(req.headers);
    if (!token) {
        return res.status(400).json({
            message: '토큰이 없습니다',
        });
    }

    const returnData: serviceReturn = await getUserDataService(token);

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
    forgotPassword,
    resetPassword,
    getUserData,
};
