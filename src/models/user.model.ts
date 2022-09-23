import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    AllowNull,
    Unique,
    PrimaryKey,
} from 'sequelize-typescript'

@Table({timestamps: true})
export default class Users extends Model {    
    @AllowNull(false)
    @Unique(true)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string

    @AllowNull(false)
    @Unique(true)
    @Column(DataType.STRING)
    email!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string

    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date
}