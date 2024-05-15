import { Column, Table, DataType, Model } from 'sequelize-typescript';

@Table({
    tableName: 'paymentdetails',
    modelName: 'PaymentDetail',
    timestamps: true
})

class PaymentDetail extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.ENUM('cod', 'khalti', 'esewa'),
        allowNull: false
    })
    declare paymentMethod: string

    @Column({
        type: DataType.ENUM('paid', 'unpaid', 'refund'),
        defaultValue: 'unpaid'
    })
    declare paymentStatus: string

    @Column({
        type: DataType.STRING
    })
    declare pidx: string
}
export default PaymentDetail