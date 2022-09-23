import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const env = process.env;

export const config = {
    development: {
        username: env.DB_USERNAME_DEV || 'root',
        password: env.DB_PASSWORD_DEV,
        database: env.DB_NAME_DEV,
        host: env.DB_HOST_DEV,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
    },

    test: {
        username: env.DB_USERNAME_TEST || 'root',
        password: env.DB_PASSWORD_TEST,
        database: env.DB_NAME_TEST,
        host: env.DB_HOST_TEST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
    },

    production: {
        username: env.DB_USERNAME_PROD || 'root',
        password: env.DB_PASSWORD_PROD,
        database: env.DB_NAME_PROD,
        host: env.DB_HOST_PROD,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
    },
};

export const nodeMailer = {
    sendMail: function (option: Object) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.EMAIL,
                pass: env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: env.EMAIL,
            ...option
        };

        return transporter.sendMail(mailOptions);
    }
}