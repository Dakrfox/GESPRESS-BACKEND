import express, {Express}from 'express';

// Swagger
import swaggerUi from 'swagger-ui-express';

//security
import cors from 'cors';
import helmet from 'helmet';

// TODO: Router 

// mongoose
import mongoose from 'mongoose';

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

/**
 * server.use(
    '/api',
    rootRuter
    );
 */

//static server
server.use(express.static('public'));

//mongoose connection
mongoose.connect('mongodb://localhost:27017/codeverification')

