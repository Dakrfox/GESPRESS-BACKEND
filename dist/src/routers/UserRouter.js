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
const UsersController_1 = require("../controllers/UsersController");
const logger_1 = require("../utils/logger");
// Body Parser to read BODY from requests
const body_parser_1 = __importDefault(require("body-parser"));
let jsonParser = body_parser_1.default.json();
// JWT Verifier MiddleWare
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
// Router from express
let usersRouter = express_1.default.Router();
// http://localhost:8000/api/users?id=6253dc47f30baed4c6de7f99
usersRouter.route('/')
    // GET:
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Obtain a Query Param (ID)
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    // Pagination
    let page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
    let limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 10;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller = new UsersController_1.UserController();
    // Obtain Reponse
    const response = yield controller.getUsers(page, limit, id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    // DELETE:
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // Obtain a Query Param (ID)
    let id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller = new UsersController_1.UserController();
    // Obtain Reponse
    const response = yield controller.deleteUser(id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    .put(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    // Obtain a Query Param (ID)
    let id = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.id;
    let name = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.name;
    let email = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.email;
    let age = (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.age;
    (0, logger_1.LogInfo)(`Query Params: ${id}, ${name}, ${age}, ${email}`);
    // Controller Instance to excute method
    const controller = new UsersController_1.UserController();
    let user = {
        name: name,
        email: email,
        age: age
    };
    // Obtain Response
    const response = yield controller.updateUser(id, user);
    // Send to the client the response
    return res.status(200).send(response);
}));
// Export Users Router
exports.default = usersRouter;
/**
 *
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents =>  200 (Entity) / 204 (No return)
 *
 */
//# sourceMappingURL=UserRouter.js.map