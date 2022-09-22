import { AbstractDataType } from 'sequelize';

export interface UserAttributes {
    id: AbstractDataType;
    name: string;
    email: string;
    password: string;
}

export default UserAttributes;
