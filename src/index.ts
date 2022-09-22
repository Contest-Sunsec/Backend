import express from 'express';
import dotenv from 'dotenv';

// eslint-disable-next-line require-jsdoc
async function bootstrap() {
    const app = express();
    dotenv.config();
    app.listen(process.env.SERVICE_PORT, async () => {
        console.log(`Server is running on port ${process.env.SERVICE_PORT}`);
    });
}

bootstrap();
