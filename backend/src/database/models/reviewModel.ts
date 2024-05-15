import { DataType, Table, Model, Column } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({
    tableName: 'reviews',
    modelName: 'Review',
    timestamps:true
})
class Review extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: UUIDV4
    })
    declare id: String
    
    @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 3
    })
    declare rating: number;

    
    @Column({
        type: DataType.TEXT,
        allowNull:false
    })
    declare comment: string
    
}

export default Review
