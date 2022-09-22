import { Request, Response } from 'express';
import { UUIDV4 } from 'sequelize';
import { Users } from '../models/user';
import type { UserAttributes } from '../types/user';
class Register {
    constructor() {
        this.register = this.register.bind(this);
    }

    async register (req: Request, res: Response) {
        const { name, email, password } = req.body;
        const id = UUIDV4();
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill all the fields',
            });
        }
        Users.create({
            name,
            email,
            password,
        }).then((user: UserAttributes) => {
            return res.status(200).json({
                message: 'User created successfully',
                user,
            });
        }).catch((err: Error) => {
            return res.status(500).json({
                err,
            });
        });
    }
}

export default new Register();
