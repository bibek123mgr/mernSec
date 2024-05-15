import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
    })
    declare username: string

    @Column({
        type: DataType.STRING
    })
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare password: string

    @Column({
        type: DataType.ENUM('admin', 'customer'),
        allowNull: false,
        defaultValue: 'customer',
    })
    declare role: string
    @Column({
        type: DataType.STRING
    })
    declare otp: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare isVerifiedOtp: boolean
}

export default User;
