import dotenv from 'dotenv';
import server from './server';

//configuracion de dotnev
dotenv.config();

const port = process.env.PORT || 8080;