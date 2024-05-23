import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    HasMany,
    ForeignKey
} from 'sequelize-typescript';
import { Address } from './address.entity';
import { Customer } from './customer.entity';

@Table({
    tableName: 'CustomerAddress',
    timestamps: false,
    freezeTableName: true,
    schema: 'SalesLT',
})

export class CustomerAddress extends Model {
    @ForeignKey(() => Customer)
    @Column({
        field: 'CustomerID',
        type: DataType.INTEGER,
        allowNull: false,
    })
    kh_id: number;

    @ForeignKey(() => Address)
    @Column({
        field: 'AddressID',
        primaryKey: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    dc_id: number;

    @Column({
        field: 'AddressType',
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50],
        }
    })
    ldc: string;

    @Column({
        field: 'ModifiedDate',
        type: DataType.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    updated_date: Date;

    @HasMany(() => Address, { foreignKey: 'dc_id' })
    addresses: Address[];

    @HasMany(() => Customer, { foreignKey: 'kh_id' })
    customers: Customer[];
}