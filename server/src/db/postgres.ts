import { knex } from 'knex';
import { Sequelize } from 'sequelize';
import { DBConfig } from '../types/db-types';
import * as pg from 'pg';

const database = process.env.POSTGRES_DB;
const host = process.env.POSTGRES_HOST;
const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;
const port = parseInt(process.env.POSTGRES_PORT);


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

export const dbConfig = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    dialectModule: pg

});

export const db = knex(config);


