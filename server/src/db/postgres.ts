import { knex } from 'knex';
import { Sequelize } from 'sequelize';
import { DBConfig } from '../types/db-types';
import * as pg from 'pg';
import SequelizeMock from 'sequelize-mock';

const database = process.env.POSTGRES_DB;
const host = process.env.POSTGRES_HOST;
const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;
const port = parseInt(process.env.POSTGRES_PORT);
let dbConfig;

const config: DBConfig = {
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT
    }
};

if (process.env.NODE_ENV === 'test') {
    dbConfig = new SequelizeMock();

} else {
    dbConfig = new Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: 'postgres',
        dialectModule: pg

    });
}


export const db = knex(config);

export default dbConfig;
