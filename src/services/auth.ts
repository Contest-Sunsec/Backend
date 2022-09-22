import * as dotenv from 'dotenv';
import { Users } from '../models/user';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import type { serviceReturn } from '../types/service';

dotenv.config();

const registerService = async (
    name: string,
    email: string,
    password: string
) => {
    const returnData: serviceReturn = {
        status: 500,
        message: 'Internal Server Error',
        responseData: {},
    };
};

const loginService = async () => {};

export { registerService, loginService };
