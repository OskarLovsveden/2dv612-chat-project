import { Sequelize } from 'sequelize';
import * as pg from 'pg';
import SequelizeMock from 'sequelize-mock';

const database = process.env.POSTGRES_DB;
const host = process.env.POSTGRES_HOST;
const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;
const port = parseInt(process.env.POSTGRES_PORT);
let dbConfig;

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

export default dbConfig;
