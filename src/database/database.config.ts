import { IDatabaseConfig } from "./dbConfig.interface";
import { Dialect } from "@sequelize/core";

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: 'sa',
        password: '12345',
        database: 'test_db_data' as string,
        host: "localhost" as string,
        port: process.env.DB_PORT,
        dialect: 'mssql' as Dialect,
        dialectOptions: {
            useUTC: true
        },
        quoteIdentifiers: false,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mssql' as Dialect,
        dialectOptions: {
            useUTC: true
        },
        quoteIdentifiers: false,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_PRODUCTION,
        host: process.env.DB_HOST,
        dialect: 'mssql' as Dialect,
        dialectOptions: {
            useUTC: true
        },
        quoteIdentifiers: false,
    },
}