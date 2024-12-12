"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM imports
const User_orm_1 = require("../domain/orm/User.orm");
let AuthController = exports.AuthController = class AuthController {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (user) {
                (0, logger_1.LogSuccess)(`[/api/auth/register] Register New User: ${user.email} `);
                yield (0, User_orm_1.registerUser)(user).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/auth/register] Created User: ${user.email} `);
                    response = {
                        message: `User created successfully: ${user.name}`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/auth/register] Register needs User Entity');
                response = {
                    message: 'User not Registered: Please, provide a User Entity to create one'
                };
            }
            return response;
        });
    }
    loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (auth) {
                (0, logger_1.LogSuccess)(`[/api/auth/login] Login User: ${auth.email} `);
                let data = yield (0, User_orm_1.loginUser)(auth);
                response = {
                    token: data.token,
                    id: `${data.user.id}`,
                    message: `Welcome, ${data.user.name}`
                };
            }
            else {
                (0, logger_1.LogWarning)('[/api/auth/login] Login needs Auth Entity (email && password');
                response = {
                    error: '[AUTH ERROR]: Email & Password are needed',
                    message: 'Please, provide a email && password to login'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to retreive the User in the Collection "Users" of DB
     * Middleware: Validate JWT
     * In headers you must add the x-access-token with a valid JWT
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by iD
     */
    userData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Get User Data By ID: ${id} `);
                response = yield (0, User_orm_1.getUserByID)(id);
            }
            return response;
        });
    }
    logoutUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            // TODO: Close Session of user
            throw new Error("Method not implemented.");
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, tsoa_1.Get)("/me"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userData", null);
__decorate([
    (0, tsoa_1.Post)("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutUser", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/api/auth"),
    (0, tsoa_1.Tags)("AuthController")
], AuthController);
//# sourceMappingURL=AuthController.js.map