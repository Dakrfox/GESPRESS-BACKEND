"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
// BCRYPT for passwords
const bcrypt_1 = __importDefault(require("bcrypt"));
// JWT Verifier MiddleWare
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
// Body Parser (Read JSON from Body in Requests)
const body_parser_1 = __importDefault(require("body-parser"));
// Middleware to read JSON in Body
let jsonParser = body_parser_1.default.json();
// Router from express
let authRouter = express_1.default.Router();
authRouter.route('/register')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req === null || req === void 0 ? void 0 : req.body;
    let hashedPassword = '';
    if (name && password && email) {
        //deleting spaces on email
        email = email.trim();
        // Obtain the password in request and cypher
        hashedPassword = bcrypt_1.default.hashSync(password, 8);
        let newUser = {
            name: name,
            email: email,
            password: hashedPassword,
        };
        // Controller Instance to excute method
        const controller = new AuthController_1.AuthController();
        // Obtain Response
        const response = yield controller.registerUser(newUser);
        // Send to the client the response
        return res.status(200).send(response);
    }
    else {
        // Send to the client the response
        return res.status(400).send({
            message: '[ERROR User Data missing]: No user can be registered'
        });
    }
}));
authRouter.route('/login')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req === null || req === void 0 ? void 0 : req.body;
    if (email && password) {
        //deleting spaces on email
        email = email.trim();
        // Controller Instance to excute method
        const controller = new AuthController_1.AuthController();
        let auth = {
            email: email,
            password: password
        };
        // Obtain Response
        const response = yield controller.loginUser(auth);
        // Send to the client the response which includes the JWT to authorize requests
        return res.status(200).send(response);
    }
    else {
        // Send to the client the response
        return res.status(400).send({
            message: '[ERROR User Data missing]: No user can be registered'
        });
    }
}));
// Route Protected by VERIFY TOKEN Middleware
authRouter.route('/me')
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtain the ID of user to check it's data
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    console.log(id);
    if (id) {
        // Controller: Auth Controller
        const controller = new AuthController_1.AuthController();
        // Obtain response from Controller
        let response = yield controller.userData(id);
        // If user is authorised:
        return res.status(200).send(response);
    }
    else {
        return res.status(401).send({
            message: 'You are not authorised to perform this action'
        });
    }
}));
exports.default = authRouter;
//# sourceMappingURL=AuthRouter.js.map