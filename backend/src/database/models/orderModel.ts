import { UUIDV4 } from 'sequelize';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true
})

class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: UUIDV4
    })
    declare id: String

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare shippingAddress: string
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare amount: number
    @Column({
        type: DataType.ENUM('pending', 'cancelled', 'returned', 'ontheway', 'prepration','delivered'),
        defaultValue: 'pending'
    })
    declare orderStatus: string
}

export default Order