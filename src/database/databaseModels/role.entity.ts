import {
    Table, 
    Column, 
    Model, 
    DataType, 
    HasMany,
    ForeignKey
} from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({
    tableName: 'Role',
    timestamps: false,
    freezeTableName: true,
    schema: 'SalesLT',
})

export class Role extends Model {
    @ForeignKey(() => Customer)
    @Column({
        field: 'RoleID',
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    role_id: number;

    @Column({
        field: 'RoleName',
        type: DataType.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 10],
        }
    })
    role_name: string;

    @Column({
        field: 'Description',
        type: DataType.TEXT,
        allowNull: true,
        validate: {
            notEmpty: false,
        }
    })
    description: string;

    @HasMany(() => Customer, { foreignKey: 'role_id' })
    customers: Customer[];
}