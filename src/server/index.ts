import express, { Request, Response, Express } from 'express';

// Swagger
import swaggerUi from 'swagger-ui-express';

//security
import cors from 'cors';
import helmet from 'helmet';


import rootRuter from '../routers';

// mongoose
import mongoose from 'mongoose';


//dotnev
import dotenv from 'dotenv';

//dotenv config
dotenv.config();

//Express configuration
const server: Express = express();

// Swagger Config and route (standard)
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
);


server.use(
    '/api',
    rootRuter
);


//mongoose connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, {

    dbName: "gespress-dev"
})

// * Server`)

// * static server
server.use(express.static('public'));

// * Security Config
server.use(helmet());
server.use(cors());

// * Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// * Redirection Config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server;

