import { knex } from 'knex';
import { DBConfig } from '../types/db-types';

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

export const db = knex(config);


