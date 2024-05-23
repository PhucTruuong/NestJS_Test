import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    HasMany,
    ForeignKey
} from 'sequelize-typescript';
import { CustomerAddress } from './customer_address.entity';

@Table({
    tableName: 'Address',
    timestamps: false,
    freezeTableName: true,
    schema: 'SalesLT',
})

export class Address extends Model {
    @ForeignKey(() => CustomerAddress)
    @Column({
        field: 'AddressID',
        primaryKey: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    dc_id: number;

    @Column({
        field: 'AddressLine1',
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 60],
            sync: false,
        }
    })
    dc1: string;

    @Column({
        field: 'AddressLine2',
        type: DataType.STRING(60),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 60],
            sync: false,
        }
    })
    dc2: string;

    @Column({
        field: 'City',
        type: DataType.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 30],
            sync: false,
        }
    })
    tp: string;

    @Column({
        field: 'StateProvince',
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50],
            sync: false,
        }
    })
    tt: string;

    @Column({
        field: 'CountryRegion',
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50],
        }
    })
    dn: string;

    @Column({
        field: 'PostalCode',
        type: DataType.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 15],
            sync: false,
        }
    })
    mbc: string;

    @Column({
        field: 'rowguid',
        type: DataType.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
            sync: false,
        }
    })
    rowguid: string;

    @Column({
        field: 'ModifiedDate',
        type: DataType.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            sync: false,
        }
    })
    updated_date: Date;

    @HasMany(() => CustomerAddress, { foreignKey: 'dc_id', as: 'relatedCustomerAddresses' })
    relatedAddresses: CustomerAddress[];
};