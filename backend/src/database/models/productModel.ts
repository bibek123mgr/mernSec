import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'products',
    modelName: 'Product',
    timestamps: true
})
class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare productName: string;

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare productPrice: number;

    @Column({
        type: DataType.TEXT
    })
    declare productDescription: string;

    @Column({
        type: DataType.STRING,
        defaultValue: 'public'
    })
    declare productStatus: 'public' | 'private'

    @Column({
        type: DataType.INTEGER
    })
    declare productStockQty: number;

    @Column({
        type: DataType.STRING
    })
    declare productImage: string;
}

export default Product;
