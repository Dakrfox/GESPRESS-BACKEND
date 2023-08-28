/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst server_1 = __importDefault(__webpack_require__(/*! ./src/server */ \"./src/server/index.ts\"));\nconst logger_1 = __webpack_require__(/*! ./src/utils/logger */ \"./src/utils/logger.ts\");\n//configuracion de dotnev\ndotenv_1.default.config();\nconst port = process.env.PORT || 8080;\nserver_1.default.listen(port, () => {\n    (0, logger_1.LogSuccess)(`[SERVER ON]: Running in http://localhost:${port}/api`);\n});\n// * Control SERVER ERROR\nserver_1.default.on('error', (error) => {\n    (0, logger_1.LogError)(`[SERVER ERROR]: ${error}`);\n});\n\n\n//# sourceURL=webpack://api-budget-managment/./index.ts?");

/***/ }),

/***/ "./src/controllers/AuthController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/AuthController.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AuthController = void 0;\nconst tsoa_1 = __webpack_require__(/*! tsoa */ \"tsoa\");\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\n// ORM imports\nconst User_orm_1 = __webpack_require__(/*! ../domain/orm/User.orm */ \"./src/domain/orm/User.orm.ts\");\nlet AuthController = exports.AuthController = class AuthController {\n    registerUser(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = '';\n            if (user) {\n                (0, logger_1.LogSuccess)(`[/api/auth/register] Register New User: ${user.email} `);\n                yield (0, User_orm_1.registerUser)(user).then((r) => {\n                    (0, logger_1.LogSuccess)(`[/api/auth/register] Created User: ${user.email} `);\n                    response = {\n                        message: `User created successfully: ${user.name}`\n                    };\n                });\n            }\n            else {\n                (0, logger_1.LogWarning)('[/api/auth/register] Register needs User Entity');\n                response = {\n                    message: 'User not Registered: Please, provide a User Entity to create one'\n                };\n            }\n            return response;\n        });\n    }\n    loginUser(auth) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response;\n            if (auth) {\n                (0, logger_1.LogSuccess)(`[/api/auth/login] Login User: ${auth.email} `);\n                let data = yield (0, User_orm_1.loginUser)(auth);\n                response = {\n                    token: data.token,\n                    id: `${data.user.id}`,\n                    message: `Welcome, ${data.user.name}`\n                };\n            }\n            else {\n                (0, logger_1.LogWarning)('[/api/auth/login] Login needs Auth Entity (email && password');\n                response = {\n                    error: '[AUTH ERROR]: Email & Password are needed',\n                    message: 'Please, provide a email && password to login'\n                };\n            }\n            return response;\n        });\n    }\n    /**\n     * Endpoint to retreive the User in the Collection \"Users\" of DB\n     * Middleware: Validate JWT\n     * In headers you must add the x-access-token with a valid JWT\n     * @param {string} id Id of user to retreive (optional)\n     * @returns All user o user found by iD\n     */\n    userData(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = '';\n            if (id) {\n                (0, logger_1.LogSuccess)(`[/api/users] Get User Data By ID: ${id} `);\n                response = yield (0, User_orm_1.getUserByID)(id);\n            }\n            return response;\n        });\n    }\n    logoutUser() {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = '';\n            // TODO: Close Session of user\n            throw new Error(\"Method not implemented.\");\n        });\n    }\n};\n__decorate([\n    (0, tsoa_1.Post)(\"/register\"),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"registerUser\", null);\n__decorate([\n    (0, tsoa_1.Post)(\"/login\"),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"loginUser\", null);\n__decorate([\n    (0, tsoa_1.Get)(\"/me\"),\n    __param(0, (0, tsoa_1.Query)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"userData\", null);\n__decorate([\n    (0, tsoa_1.Post)(\"/logout\"),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"logoutUser\", null);\nexports.AuthController = AuthController = __decorate([\n    (0, tsoa_1.Route)(\"/api/auth\"),\n    (0, tsoa_1.Tags)(\"AuthController\")\n], AuthController);\n\n\n//# sourceURL=webpack://api-budget-managment/./src/controllers/AuthController.ts?");

/***/ }),

/***/ "./src/controllers/UsersController.ts":
/*!********************************************!*\
  !*** ./src/controllers/UsersController.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserController = void 0;\nconst tsoa_1 = __webpack_require__(/*! tsoa */ \"tsoa\");\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\n// ORM - Users Collection\nconst User_orm_1 = __webpack_require__(/*! ../domain/orm/User.orm */ \"./src/domain/orm/User.orm.ts\");\nlet UserController = exports.UserController = class UserController {\n    /**\n     * Endpoint to retreive the Users in the Collection \"Users\" of DB\n     * @param {string} id Id of user to retreive (optional)\n     * @returns All user o user found by iD\n     */\n    getUsers(page, limit, id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = '';\n            if (id) {\n                (0, logger_1.LogSuccess)(`[/api/users] Get User By ID: ${id} `);\n                response = yield (0, User_orm_1.getUserByID)(id);\n            }\n            else {\n                (0, logger_1.LogSuccess)('[/api/users] Get All Users Request');\n                response = yield (0, User_orm_1.getAllUsers)(page, limit);\n            }\n            return response;\n        });\n    }\n    /**\n     * Endpoint to delete the Users in the Collection \"Users\" of DB\n     * @param {string} id Id of user to delete (optional)\n     * @returns message informing if deletion was correct\n     */\n    deleteUser(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = '';\n            if (id) {\n                (0, logger_1.LogSuccess)(`[/api/users] Delete User By ID: ${id} `);\n                yield (0, User_orm_1.deleteUserByID)(id).then((r) => {\n                    response = {\n                        message: `User with id ${id} deleted successfully`\n                    };\n                });\n            }\n            else {\n                (0, logger_1.LogWarning)('[/api/users] Delete User Request WITHOUT ID');\n                response = {\n                    message: 'Please, provide an ID to remove from database'\n                };\n            }\n            return response;\n        });\n    }\n    updateUser(id, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let response = '';\n            if (id) {\n                (0, logger_1.LogSuccess)(`[/api/users] Update User By ID: ${id} `);\n                yield (0, User_orm_1.updateUserByID)(id, user).then((r) => {\n                    response = {\n                        message: `User with id ${id} updated successfully`\n                    };\n                });\n            }\n            else {\n                (0, logger_1.LogWarning)('[/api/users] Update User Request WITHOUT ID');\n                response = {\n                    message: 'Please, provide an ID to update an existing user'\n                };\n            }\n            return response;\n        });\n    }\n};\n__decorate([\n    (0, tsoa_1.Get)(\"/\"),\n    __param(0, (0, tsoa_1.Query)()),\n    __param(1, (0, tsoa_1.Query)()),\n    __param(2, (0, tsoa_1.Query)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, Number, String]),\n    __metadata(\"design:returntype\", Promise)\n], UserController.prototype, \"getUsers\", null);\n__decorate([\n    (0, tsoa_1.Delete)(\"/\"),\n    __param(0, (0, tsoa_1.Query)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], UserController.prototype, \"deleteUser\", null);\n__decorate([\n    (0, tsoa_1.Put)(\"/\"),\n    __param(0, (0, tsoa_1.Query)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String, Object]),\n    __metadata(\"design:returntype\", Promise)\n], UserController.prototype, \"updateUser\", null);\nexports.UserController = UserController = __decorate([\n    (0, tsoa_1.Route)(\"/api/users\"),\n    (0, tsoa_1.Tags)(\"UserController\")\n], UserController);\n\n\n//# sourceURL=webpack://api-budget-managment/./src/controllers/UsersController.ts?");

/***/ }),

/***/ "./src/domain/entities/User.entity.ts":
/*!********************************************!*\
  !*** ./src/domain/entities/User.entity.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.userEntity = void 0;\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst userEntity = () => {\n    let userSchema = new mongoose_1.default.Schema({\n        name: { type: String, required: true },\n        email: { type: String, required: true },\n        password: { type: String, required: true },\n    });\n    return mongoose_1.default.models.Users || mongoose_1.default.model('Users', userSchema);\n};\nexports.userEntity = userEntity;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/domain/entities/User.entity.ts?");

/***/ }),

/***/ "./src/domain/orm/User.orm.ts":
/*!************************************!*\
  !*** ./src/domain/orm/User.orm.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.logoutUser = exports.loginUser = exports.registerUser = exports.updateUserByID = exports.deleteUserByID = exports.getUserByID = exports.getAllUsers = void 0;\nconst User_entity_1 = __webpack_require__(/*! ../entities/User.entity */ \"./src/domain/entities/User.entity.ts\");\nconst logger_1 = __webpack_require__(/*! ../../utils/logger */ \"./src/utils/logger.ts\");\n// Environment variables\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\n// BCRYPT for passwords\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\n// JWT\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\n// Configuration of environment variables\ndotenv_1.default.config();\n// Obtain Secret key to generate JWT\nconst secret = process.env.SECRETKEY || 'MYSECRETKEY';\n// CRUD\n/**\n * Method to obtain all Users from Collection \"Users\" in Mongo Server\n */\nconst getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let userModel = (0, User_entity_1.userEntity)();\n        let response = {};\n        // Search all users (using pagination)\n        yield userModel.find( /*{isDeleted: false}*/)\n            .select('name email')\n            .limit(limit)\n            .skip((page - 1) * limit)\n            .exec().then((users) => {\n            response.users = users;\n        });\n        // Count total documents in collection \"Users\"\n        yield userModel.countDocuments().then((total) => {\n            response.totalPages = Math.ceil(total / limit);\n            response.currentPage = page;\n        });\n        return response;\n    }\n    catch (error) {\n        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Users: ${error}`);\n    }\n});\nexports.getAllUsers = getAllUsers;\n// - Get User By ID\nconst getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let userModel = (0, User_entity_1.userEntity)();\n        // Search User By ID\n        return yield userModel.findById(id).select('name email');\n    }\n    catch (error) {\n        (0, logger_1.LogError)(`[ORM ERROR]: Getting User By ID: ${error}`);\n    }\n});\nexports.getUserByID = getUserByID;\n// - Delete User By ID\nconst deleteUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let userModel = (0, User_entity_1.userEntity)();\n        // Delete User BY ID\n        return yield userModel.deleteOne({ _id: id });\n    }\n    catch (error) {\n        (0, logger_1.LogError)(`[ORM ERROR]: Deleting User By ID: ${error}`);\n    }\n});\nexports.deleteUserByID = deleteUserByID;\n// - Update User By ID\nconst updateUserByID = (id, user) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let userModel = (0, User_entity_1.userEntity)();\n        // Update User\n        return yield userModel.findByIdAndUpdate(id, user);\n    }\n    catch (error) {\n        (0, logger_1.LogError)(`[ORM ERROR]: Updating User ${id}: ${error}`);\n    }\n});\nexports.updateUserByID = updateUserByID;\n// Register User\nconst registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let userModel = (0, User_entity_1.userEntity)();\n        // Create / Insert new User\n        return yield userModel.create(user);\n    }\n    catch (error) {\n        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);\n    }\n});\nexports.registerUser = registerUser;\n// Login User\nconst loginUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let userModel = (0, User_entity_1.userEntity)();\n        let userFound = undefined;\n        let token = undefined;\n        // Check if user exists by Unique Email\n        yield userModel.findOne({ email: auth.email }).then((user) => {\n            userFound = user;\n        }).catch((error) => {\n            console.error(`[ERROR Authentication in ORM]: User Not Found`);\n            throw new Error(`[ERROR Authentication in ORM]: User Not Found: ${error}`);\n        });\n        // Check if Password is Valid (compare with bcrypt)\n        let validPassword = bcrypt_1.default.compareSync(auth.password, userFound.password);\n        if (!validPassword) {\n            console.error(`[ERROR Authentication in ORM]: Password Not Valid`);\n            throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`);\n        }\n        // Generate our JWT\n        token = jsonwebtoken_1.default.sign({ email: userFound.email }, secret, {\n            expiresIn: \"2h\"\n        });\n        return {\n            user: userFound,\n            token: token\n        };\n    }\n    catch (error) {\n        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);\n    }\n});\nexports.loginUser = loginUser;\n// Logout User\nconst logoutUser = () => __awaiter(void 0, void 0, void 0, function* () {\n    // TODO: NOT IMPLEMENTED\n});\nexports.logoutUser = logoutUser;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/domain/orm/User.orm.ts?");

/***/ }),

/***/ "./src/middlewares/verifyToken.middleware.ts":
/*!***************************************************!*\
  !*** ./src/middlewares/verifyToken.middleware.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.verifyToken = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\n// Config dotenv to read environment variables\ndotenv_1.default.config();\nconst secret = process.env.SECRETKEY || 'MYSECRETKEY';\n/**\n *\n * @param { Request } req Original request previous middleware of verification JWT\n * @param { Response } res Response to verification of JWT\n * @param { NextFunction } next Next function to be executed\n * @returns Errors of verification or next execution\n */\nconst verifyToken = (req, res, next) => {\n    // Check HEADER from Request for 'x-access-token'\n    let token = req.headers['x-access-token'];\n    // Verify if jwt is present\n    if (!token) {\n        return res.status(403).send({\n            authenticationError: 'Missing JWT in request',\n            message: 'Not authorised to consume this endpoint'\n        });\n    }\n    // Verify the token obtained. We pass the secret\n    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {\n        if (err) {\n            return res.status(500).send({\n                authenticationError: 'JWT verification failed',\n                message: 'Failed to verify JWT token in request'\n            });\n        }\n        // Execute Next Function -> Protected Routes will be executed\n        next();\n    });\n};\nexports.verifyToken = verifyToken;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/middlewares/verifyToken.middleware.ts?");

/***/ }),

/***/ "./src/routers/AuthRouter.ts":
/*!***********************************!*\
  !*** ./src/routers/AuthRouter.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst AuthController_1 = __webpack_require__(/*! ../controllers/AuthController */ \"./src/controllers/AuthController.ts\");\n// BCRYPT for passwords\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\n// JWT Verifier MiddleWare\nconst verifyToken_middleware_1 = __webpack_require__(/*! ../middlewares/verifyToken.middleware */ \"./src/middlewares/verifyToken.middleware.ts\");\n// Body Parser (Read JSON from Body in Requests)\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\n// Middleware to read JSON in Body\nlet jsonParser = body_parser_1.default.json();\n// Router from express\nlet authRouter = express_1.default.Router();\nauthRouter.route('/register')\n    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    let { name, email, password } = req === null || req === void 0 ? void 0 : req.body;\n    let hashedPassword = '';\n    if (name && password && email) {\n        //deleting spaces on email\n        email = email.trim();\n        // Obtain the password in request and cypher\n        hashedPassword = bcrypt_1.default.hashSync(password, 8);\n        let newUser = {\n            name: name,\n            email: email,\n            password: hashedPassword,\n        };\n        // Controller Instance to excute method\n        const controller = new AuthController_1.AuthController();\n        // Obtain Response\n        const response = yield controller.registerUser(newUser);\n        // Send to the client the response\n        return res.status(200).send(response);\n    }\n    else {\n        // Send to the client the response\n        return res.status(400).send({\n            message: '[ERROR User Data missing]: No user can be registered'\n        });\n    }\n}));\nauthRouter.route('/login')\n    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    let { email, password } = req === null || req === void 0 ? void 0 : req.body;\n    if (email && password) {\n        //deleting spaces on email\n        email = email.trim();\n        // Controller Instance to excute method\n        const controller = new AuthController_1.AuthController();\n        let auth = {\n            email: email,\n            password: password\n        };\n        // Obtain Response\n        const response = yield controller.loginUser(auth);\n        // Send to the client the response which includes the JWT to authorize requests\n        return res.status(200).send(response);\n    }\n    else {\n        // Send to the client the response\n        return res.status(400).send({\n            message: '[ERROR User Data missing]: No user can be registered'\n        });\n    }\n}));\n// Route Protected by VERIFY TOKEN Middleware\nauthRouter.route('/me')\n    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _a;\n    // Obtain the ID of user to check it's data\n    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;\n    console.log(id);\n    if (id) {\n        // Controller: Auth Controller\n        const controller = new AuthController_1.AuthController();\n        // Obtain response from Controller\n        let response = yield controller.userData(id);\n        // If user is authorised:\n        return res.status(200).send(response);\n    }\n    else {\n        return res.status(401).send({\n            message: 'You are not authorised to perform this action'\n        });\n    }\n}));\nexports[\"default\"] = authRouter;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/routers/AuthRouter.ts?");

/***/ }),

/***/ "./src/routers/UserRouter.ts":
/*!***********************************!*\
  !*** ./src/routers/UserRouter.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst UsersController_1 = __webpack_require__(/*! ../controllers/UsersController */ \"./src/controllers/UsersController.ts\");\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\n// Body Parser to read BODY from requests\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nlet jsonParser = body_parser_1.default.json();\n// JWT Verifier MiddleWare\nconst verifyToken_middleware_1 = __webpack_require__(/*! ../middlewares/verifyToken.middleware */ \"./src/middlewares/verifyToken.middleware.ts\");\n// Router from express\nlet usersRouter = express_1.default.Router();\n// http://localhost:8000/api/users?id=6253dc47f30baed4c6de7f99\nusersRouter.route('/')\n    // GET:\n    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _a, _b, _c;\n    // Obtain a Query Param (ID)\n    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;\n    // Pagination\n    let page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;\n    let limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 10;\n    (0, logger_1.LogInfo)(`Query Param: ${id}`);\n    // Controller Instance to excute method\n    const controller = new UsersController_1.UserController();\n    // Obtain Reponse\n    const response = yield controller.getUsers(page, limit, id);\n    // Send to the client the response\n    return res.status(200).send(response);\n}))\n    // DELETE:\n    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _d;\n    // Obtain a Query Param (ID)\n    let id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;\n    (0, logger_1.LogInfo)(`Query Param: ${id}`);\n    // Controller Instance to excute method\n    const controller = new UsersController_1.UserController();\n    // Obtain Reponse\n    const response = yield controller.deleteUser(id);\n    // Send to the client the response\n    return res.status(200).send(response);\n}))\n    .put(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _e, _f, _g, _h;\n    // Obtain a Query Param (ID)\n    let id = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.id;\n    let name = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.name;\n    let email = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.email;\n    let age = (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.age;\n    (0, logger_1.LogInfo)(`Query Params: ${id}, ${name}, ${age}, ${email}`);\n    // Controller Instance to excute method\n    const controller = new UsersController_1.UserController();\n    let user = {\n        name: name,\n        email: email,\n        age: age\n    };\n    // Obtain Response\n    const response = yield controller.updateUser(id, user);\n    // Send to the client the response\n    return res.status(200).send(response);\n}));\n// Export Users Router\nexports[\"default\"] = usersRouter;\n/**\n *\n * Get Documents => 200 OK\n * Creation Documents => 201 OK\n * Deletion of Documents => 200 (Entity) / 204 (No return)\n * Update of Documents =>  200 (Entity) / 204 (No return)\n *\n */\n\n\n//# sourceURL=webpack://api-budget-managment/./src/routers/UserRouter.ts?");

/***/ }),

/***/ "./src/routers/index.ts":
/*!******************************!*\
  !*** ./src/routers/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n/**\n * Root Router\n * Redirections to Routers\n */\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\nconst UserRouter_1 = __importDefault(__webpack_require__(/*! ./UserRouter */ \"./src/routers/UserRouter.ts\"));\nconst AuthRouter_1 = __importDefault(__webpack_require__(/*! ./AuthRouter */ \"./src/routers/AuthRouter.ts\"));\n// Server instance\nlet server = (0, express_1.default)();\n// Router instance\nlet rootRouter = express_1.default.Router();\n// Activate for requests to http://localhost:8000/api\n// GET: http://.../api/\nrootRouter.get('/', (req, res) => {\n    (0, logger_1.LogInfo)('GET: http://.../api/');\n    // Send Hello World\n    res.send('Welcome to my API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');\n});\n// Redirections to Routers & Controllers\nserver.use('/', rootRouter); // http://localhost:8000/api/\n// Add more routes to the app\nserver.use('/users', UserRouter_1.default);\n; // http://localhost:8000/api/users --> UserRouter\n// Auth routes\nserver.use('/auth', AuthRouter_1.default); // http://localhost:8000/api/auth --> AuthRouter\nexports[\"default\"] = server;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/routers/index.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n// Swagger\nconst swagger_ui_express_1 = __importDefault(__webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\"));\n//security\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nconst routers_1 = __importDefault(__webpack_require__(/*! ../routers */ \"./src/routers/index.ts\"));\n// mongoose\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\n//dotnev\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\n//dotenv config\ndotenv_1.default.config();\n//INIT CORS\nconst whitelist = ['http://localhost:3000', 'http://localhost:3001'];\n//Express configuration\nconst server = (0, express_1.default)();\n// Swagger Config and route (standard)\nserver.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {\n    swaggerOptions: {\n        url: \"/swagger.json\",\n        explorer: true\n    }\n}));\nserver.use((0, cors_1.default)({\n    origin: whitelist\n}));\nserver.use('/api', routers_1.default);\n//mongoose connection\nmongoose_1.default.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, {\n    dbName: \"gespress-dev\"\n});\n// * Server`)\n// * static server\nserver.use(express_1.default.static('public'));\n// * Security Config\nserver.use((0, helmet_1.default)());\nserver.use((0, cors_1.default)());\n// * Content Type Config\nserver.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));\nserver.use(express_1.default.json({ limit: '50mb' }));\n// * Redirection Config\n// http://localhost:8000/ --> http://localhost:8000/api/\nserver.get('/', (req, res) => {\n    res.redirect('/api');\n});\nexports[\"default\"] = server;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/server/index.ts?");

/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LogError = exports.LogWarning = exports.LogSuccess = exports.LogInfo = void 0;\nconst LogInfo = (message) => {\n    console.log(`Info: ${message}`);\n};\nexports.LogInfo = LogInfo;\nconst LogSuccess = (message) => {\n    console.log(`Success: ${message}`);\n};\nexports.LogSuccess = LogSuccess;\nconst LogWarning = (message) => {\n    console.log(`Warning: ${message}`);\n};\nexports.LogWarning = LogWarning;\nconst LogError = (message) => {\n    console.log(`Error: ${message}`);\n};\nexports.LogError = LogError;\n\n\n//# sourceURL=webpack://api-budget-managment/./src/utils/logger.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("swagger-ui-express");

/***/ }),

/***/ "tsoa":
/*!***********************!*\
  !*** external "tsoa" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("tsoa");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;