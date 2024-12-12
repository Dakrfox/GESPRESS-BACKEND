"use strict";
/**
 * Root Router
 * Redirections to Routers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../utils/logger");
const UserRouter_1 = __importDefault(require("./UserRouter"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
// Server instance
let server = (0, express_1.default)();
// Router instance
let rootRouter = express_1.default.Router();
// Activate for requests to http://localhost:8000/api
// GET: http://.../api/
rootRouter.get('/', (req, res) => {
    (0, logger_1.LogInfo)('GET: http://.../api/');
    // Send Hello World
    res.send('Welcome to my API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');
});
// Redirections to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8000/api/
// Add more routes to the app
server.use('/users', UserRouter_1.default);
; // http://localhost:8000/api/users --> UserRouter
// Auth routes
server.use('/auth', AuthRouter_1.default); // http://localhost:8000/api/auth --> AuthRouter
exports.default = server;
//# sourceMappingURL=index.js.map