import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const database = process.env.POSTGRES_DB || 'postgres';
const host = process.env.POSTGRES_HOST || 'pg-svc.development.svc.cluster.local';
const password = process.env.POSTGRES_PASSWORD || 'chatapp';
const username = process.env.POSTGRES_USER || 'postgres';
const port = parseInt(process.env.POSTGRES_PORT || '5432');

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    dialectModule: pg
});

export default sequelize;
