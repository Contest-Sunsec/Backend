import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config').config[env];

console.log(config);

export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
    },
);
