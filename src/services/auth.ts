import * as dotenv from 'dotenv';
import Users from '../models/user.model';
import { validateEmail, validatePassword } from '../validation/auth';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import type { serviceReturn } from '../types/service';
import { v4 as uuidv4 } from 'uuid';
import { JWT_SECRET } from '../config/keys';
import { nodeMailer } from '../config/config';
import UserAttributes from '../types/user';

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

    if (!name || !email || !password) {
        returnData.status = 400;
        returnData.message = '모든 칸을 입력해주세요';
        return returnData;
    }

    if (!validatePassword(password)) {
        returnData.status = 400;
        returnData.message = '비밀번호는 6자 이상이어야 합니다';
        return returnData;
    }

    if (!validateEmail(email)) {
        returnData.status = 400;
        returnData.message = '이메일 주소가 올바르지 않아요';
        return returnData;
    }

    try {
        const user = await Users.findOne({
            where: {
                email,
            },
        });

        if (user) {
            returnData.status = 400;
            returnData.message = '이미 가입된 이메일 주소에요';
            return returnData;
        }

        const id = uuidv4();
        console.log(id);
        const hashedPassword = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        const newUser = await Users.create({
            id,
            name,
            email,
            password: hashedPassword,
        });

        returnData.status = 200;
        returnData.message = '회원가입에 성공했어요';
        returnData.responseData = {
            id: newUser.id,
        };
        console.log(newUser);

        return returnData;
    } catch (err) {
        console.log(err);
        returnData.status = 500;
        returnData.message = '서버 에러가 발생했어요';
        return returnData;
    }
};

const loginService = async (email: string, password: string) => {
    const returnData: serviceReturn = {
        status: 500,
        message: 'Internal Server Error',
        responseData: {},
    };

    if (!email || !password) {
        returnData.status = 400;
        returnData.message = '모든 칸을 입력해주세요';
        return returnData;
    }

    if (!validateEmail(email)) {
        returnData.status = 400;
        returnData.message = '이메일 주소가 올바르지 않아요';
        return returnData;
    }

    try {
        const user = await Users.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            returnData.status = 400;
            returnData.message = '가입되지 않은 이메일 주소에요';
            return returnData;
        }

        const hashedPassword = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        if (user.password !== hashedPassword) {
            returnData.status = 400;
            returnData.message = '비밀번호가 올바르지 않아요';
            return returnData;
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_SECRET,
            {
                expiresIn: '2h',
            }
        );

        returnData.status = 200;
        returnData.message = '로그인에 성공했어요';
        returnData.responseData = {
            token,
            user,
        };

        return returnData;
    } catch (err) {
        console.log(err);
        returnData.status = 500;
        returnData.message = '서버 에러가 발생했어요';
        returnData.responseData = {
            err,
        };
        return returnData;
    }
};

const forgotPasswordService = async (email: string) => {
    const returnData: serviceReturn = {
        status: 500,
        message: 'Internal Server Error',
        responseData: {},
    };

    if (!email) {
        returnData.status = 400;
        returnData.message = '이메일을 입력해주세요';
        return returnData;
    }

    if (!validateEmail(email)) {
        returnData.status = 400;
        returnData.message = '이메일 주소가 올바르지 않아요';
        return returnData;
    }

    try {
        const user = await Users.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            returnData.status = 400;
            returnData.message = '가입되지 않은 이메일 주소에요';
            return returnData;
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_SECRET,
            {
                expiresIn: '5m',
            }
        );

        nodeMailer.sendMail({
            to: email,
            subject: 'Farmsert 비밀번호 재설정',
            html: `
                <h1>비밀번호 재설정</h1>
                <p>아래 링크를 클릭하면 비밀번호를 재설정할 수 있어요</p>
                <br/>
                <h3 style="color: #07B1BC;">아래 링크로 이동해주세요</h3>
                <p>${process.env.FRONTEND_URL}/reset-password/${token}</p>
            `,
        });

        returnData.status = 200;
        returnData.message = '비밀번호 재설정 링크를 이메일로 보냈어요';
        returnData.responseData = {
            token,
        };

        return returnData;
    } catch (err) {
        console.log(err);
        returnData.status = 500;
        returnData.message = '서버 에러가 발생했어요';
        return returnData;
    }
};

const resetPasswordService = async (password: string, token: string) => {
    const returnData: serviceReturn = {
        status: 500,
        message: 'Internal Server Error',
        responseData: {},
    };

    if (!password) {
        returnData.status = 400;
        returnData.message = '비밀번호를 입력해주세요';
        return returnData;
    }

    if (!validatePassword(password)) {
        returnData.status = 400;
        returnData.message = '비밀번호는 6자 이상으로 설정해주세요';
        return returnData;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            returnData.status = 400;
            returnData.message = '유효하지 않은 토큰이에요';
            return returnData;
        }

        const user = await Users.findOne({
            where: {
                id: (decoded as UserAttributes).id,
            },
        });

        if (!user) {
            returnData.status = 400;
            returnData.message = '가입되지 않은 이메일 주소에요';
            return returnData;
        }

        const hashedPassword = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        await Users.update(
            {
                password: hashedPassword,
            },
            {
                where: {
                    id: (decoded as UserAttributes).id,
                },
            }
        );

        returnData.status = 200;
        returnData.message = '비밀번호를 재설정했어요';
        return returnData;
    } catch (err) {
        console.log(err);
        returnData.status = 500;
        returnData.message = '서버 에러가 발생했어요';
        return returnData;
    }
};

const getUserDataService = async (token: string) => {
    const returnData: serviceReturn = {
        status: 500,
        message: 'Internal Server Error',
        responseData: {},
    };

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            returnData.status = 401;
            returnData.message = '유효하지 않은 토큰이에요';
            return returnData;
        }

        const user = await Users.findOne({
            where: {
                id: (decoded as UserAttributes).id,
            },
            attributes: {
                exclude: ['password'],
            },
        });

        returnData.status = 200;
        returnData.message = '사용자 정보를 가져왔어요';
        returnData.responseData = {
            user,
        };

        return returnData;
    } catch (err) {
        console.log(err);
        returnData.status = 400;
        returnData.message = '토큰이 만료되었어요';
        return returnData;
    }
};

export {
    registerService,
    loginService,
    forgotPasswordService,
    resetPasswordService,
    getUserDataService,
};
