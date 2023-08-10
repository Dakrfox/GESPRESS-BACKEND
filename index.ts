import dotenv from 'dotenv';
import server from './src/server';
import { LogSuccess, LogError } from './src/utils/logger';
//configuracion de dotnev
dotenv.config();

const port = process.env.PORT || 8080;

server.listen(port, () => {
    LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`);
});

// * Control SERVER ERROR
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
});