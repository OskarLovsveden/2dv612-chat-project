import { config } from './config/config';
import Server from './server';
const PORT = config.port;
import dotenv from 'dotenv';
import dbConfig from './db/postgres';

dotenv.config();

const main = async () => {
    try {
        await dbConfig.authenticate();
        console.log('Database connected');
        const server = new Server(PORT || 5000);
        server.run();
    } catch (error) {
        console.error(error);
    }
};

main();