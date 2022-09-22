import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env;

export const JWT_SECRET = env.JWT_SECRET as string;
