import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models';
import router from './routes';
import cors from 'cors';

const app = express();
const PORT = process.env.SERVICE_PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/', router);

async function bootstrap() {
    dotenv.config();
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);

        await sequelize
            .sync({ force: false })
            .then(async () => {
                console.log('Database connected');
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

bootstrap();
