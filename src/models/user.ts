import {
    DataTypes, 
    Model,
} from 'sequelize';
import { sequelize } from './index'
import type { UserAttributes } from '../types/user';

export class Users extends Model<UserAttributes> {
    public readonly id!: string;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        modelName: 'users',
        tableName: 'users',
        sequelize,
    }
)

