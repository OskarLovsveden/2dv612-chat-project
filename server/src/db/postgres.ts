import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const database = process.env.POSTGRES_DB;
const host = process.env.POSTGRES_HOST;
const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;
const port = parseInt(process.env.POSTGRES_PORT);

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    dialectModule: pg
});

export default sequelize;
