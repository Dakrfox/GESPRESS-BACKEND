"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//security
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routers_1 = __importDefault(require("../routers"));
// mongoose
const mongoose_1 = __importDefault(require("mongoose"));
//dotnev
const dotenv_1 = __importDefault(require("dotenv"));
//dotenv config
dotenv_1.default.config();
//Express configuration
const server = (0, express_1.default)();
// Swagger Config and route (standard)
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
        explorer: true
    }
}));
server.use('/api', routers_1.default);
//mongoose connection
mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, {
    dbName: "gespress-dev"
});
// * Server`)
// * static server
server.use(express_1.default.static('public'));
// * Security Config
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
// * Content Type Config
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
// * Redirection Config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req, res) => {
    res.redirect('/api');
});
exports.default = server;
//# sourceMappingURL=index.js.map