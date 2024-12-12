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
exports.IncomeController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM - Income Collection
const Income_orm_1 = require("../domain/orm/Income.orm");
let IncomeController = exports.IncomeController = class IncomeController {
    /**
     * Endpoint to retreive the Incomes in the Collection "Incomes" of DB
     * @param {string} id Id of income to retreive (optional)
     * @return an income if exist
     */
    getIncomeByID(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/incomes] Get Incomes By user ID: ${id} `);
                response = yield (0, Income_orm_1.getIncomeByID)(id);
            }
            else {
                (0, logger_1.LogError)('[/api/incomes] Get Income Request WITHOUT ID');
                response = {
                    message: "Please, provide an ID to get a existing income"
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to retreive the Incomes in the Collection "Incomes" of DB
     * @param {string} userId Id of user to retreive
     * @returns All incomes by User iD
     */
    getIncomes(page, limit, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (userId) {
                (0, logger_1.LogSuccess)(`[/api/incomes] Get Incomes By user ID: ${userId} `);
                response = yield (0, Income_orm_1.getAllIncomesbyUserId)(page, limit, userId);
            }
            else {
                (0, logger_1.LogError)('[/api/incomes] Get Incomes Request WITHOUT USERID');
                response = {
                    message: "Please, provide an USERID to get existing incomes"
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to delete the Incomes in the Collection "Incomes" of DB
     * @param {string} id Id of income to delete
     * @returns message informing if deletion was correct
     */
    deleteIncome(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/incomes] Delete Incomes By ID: ${id} `);
                yield (0, Income_orm_1.deleteIncomeByID)(id).then((r) => {
                    response = {
                        message: `Income with id ${id} deleted successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/incomes] Delete User Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from database'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update the incomes in the Collection "Incomes" of DB
     * @param {string} id to update de incomes
     * @param {IIncome}income the entity to update
     * @returns message informing if updating was correct
     */
    updateIncome(id, income) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/incomes] Update Incomes By ID: ${id} `);
                yield (0, Income_orm_1.updateIncomeByID)(id, income).then((r) => {
                    response = {
                        message: `Incomes with id ${id} updated successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/incomes]  Update Incomes Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to update an existing user'
                };
            }
            return response;
        });
    }
    /**
 * Endpoint to create the incomes in the Collection "Incomes" of DB
 * @param {Iincome} income of user to create
 * @returns message informing if insertion was correct
 */
    addIncome(income) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (income) {
                (0, logger_1.LogSuccess)(`[/api/incomes] Created New Income: ${income.title} `);
                yield (0, Income_orm_1.createIncome)(income).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/incomes] Created New Income: ${income.title} `);
                    response = {
                        message: `User created successfully: ${income.title}`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/incomes] creation needs Income Entity');
                response = {
                    message: 'Income not created:  Please, provide an Income Entity to create one'
                };
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "getIncomeByID", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "getIncomes", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "deleteIncome", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "updateIncome", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "addIncome", null);
exports.IncomeController = IncomeController = __decorate([
    (0, tsoa_1.Route)("/api/incomes"),
    (0, tsoa_1.Tags)("IncomeController")
], IncomeController);
//# sourceMappingURL=IncomeController.js.map