import { 
    Table, 
    Column, 
    Model,
    DataType, 
    HasMany,
    ForeignKey
} from 'sequelize-typescript';
import { CustomerAddress } from './customer_address.entity';

DataType.DATE.prototype._stringify = function(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
}.bind(DataType.DATE.prototype);

@Table({
    tableName: 'Customer',
    timestamps: false,
    freezeTableName: true,
    schema: 'SalesLT',
})

export class Customer extends Model {
    @ForeignKey(() => CustomerAddress)
    @Column({
        field: 'CustomerID',
        primaryKey: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    kh_id: number;

    @Column({
        field: 'NameStyle',
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    name_style: Buffer;

    @Column({
        field: 'Title',
        type: DataType.STRING(8),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 8],
        }
    })
    td: string;

    @Column({
        field: 'FirstName',
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50],
        }
    })
    th: string;

    @Column({
        field: 'MiddleName',
        type: DataType.STRING(50),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 50],
        }
    })
    tl: string;

    @Column({
        field: 'LastName',
        type: DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50],
        }
    })
    tc: string;

    @Column({
        field: 'Suffix',
        type: DataType.STRING(10),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 10],
        }
    })
    surffix: string;

    @Column({
        field: 'CompanyName',
        type: DataType.STRING(128),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 128],
        }
    })
    tct: string;

    @Column({
        field: 'SalesPerson',
        type: DataType.STRING(256),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 256],
        }
    })
    nv: string;

    @Column({
        field: 'EmailAddress',
        type: DataType.STRING(50),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 50],
        }
    })
    email: string;

    @Column({
        field: 'Phone',
        type: DataType.STRING(25),
        allowNull: true,
        validate: {
            notEmpty: false,
            len: [1, 25],
        }
    })
    phone: string;

    @Column({
        field: 'PasswordHash',
        type: DataType.STRING(128),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 128],
        }
    })
    mk: string;

    @Column({
        field: 'PasswordSalt',
        type: DataType.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 10],
        }
    })
    salt: string;

    @Column({
        field: 'rowguid',
        type: DataType.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    rowguid: string;

    @Column({
        field: 'ModifiedDate',
        type: DataType.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    changed_date: string;

    @HasMany(() => CustomerAddress, { foreignKey: 'kh_id' })
    customer_addresses: CustomerAddress[];
};