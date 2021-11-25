import { config } from './config/config';
import Server from './server';
const PORT = config.port;

const main = async () => {
    try {
        const server = new Server(PORT || 5000);
        server.run();
    } catch (error) {
        console.error(error);
    }
};

main();