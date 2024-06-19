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
        type: DataType.STRING
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
        type:DataType.ENUM('male','female','others')
    })
    declare gender:'male'| 'female' | 'others'
    
    @Column({
        type:DataType.INTEGER
    })
    declare number:number
    
    @Column({
        type:DataType.INTEGER
    })
    declare otpRequestTime: number
    
    @Column({
        type:DataType.STRING
    })
    declare address:string

    @Column({
        type: DataType.ENUM('admin', 'customer'),
        defaultValue: 'customer',
    })
    declare role: 'customer' | 'admin'
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
