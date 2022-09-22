import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models';

const PORT = process.env.SERVICE_PORT || 3000;

async function bootstrap() {
    const app = express();
    dotenv.config();
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);

        await sequelize
            .sync({ force: true })
            .then(async () => {
                console.log('Database connected');
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

bootstrap();
