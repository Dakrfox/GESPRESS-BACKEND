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
exports.GoalController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM - Goals Collection
const goal_orm_1 = require("../domain/orm/goal.orm");
let GoalController = exports.GoalController = class GoalController {
    /**
     * Endpoint to retreive the Goals in the Collection "Goals" of DB
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by iD
     */
    getGoalByID(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/goals] Get Goals By user ID: ${id} `);
                response = yield (0, goal_orm_1.getGoalByID)(id);
            }
            else {
                (0, logger_1.LogError)('[/api/goals] Get Goal Request WITHOUT ID');
                response = {
                    message: "Please, provide an ID to get a existing Goal"
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to retreive the Goals in the Collection "Goals" of DB
     * @param {string} userIdid Id of user to retreive (optional)
     * @returns All Goals by User iD
     */
    getGoals(page, limit, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (userId) {
                (0, logger_1.LogSuccess)(`[/api/goals] Get goals By user ID: ${userId} `);
                response = yield (0, goal_orm_1.getAllGoalsbyUserId)(page, limit, userId);
            }
            else {
                (0, logger_1.LogError)('[/api/goals] Get goals Request WITHOUT USERID');
                response = {
                    message: "Please, provide an USERID to get existing Goals"
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to delete the Goal in the Collection "Goal" of DB
     * @param {string} id Id of user to delete (optional)
     * @returns message informing if deletion was correct
     */
    deleteGoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/goals] Delete Goals By ID: ${id} `);
                yield (0, goal_orm_1.deleteGoalByID)(id).then((r) => {
                    response = {
                        message: `Goal with id ${id} deleted successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/goals] Delete User Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from database'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update the Goals in the Collection "Goals" of DB
     * @param {string} id to update de Goals
     * @param {IGoal}Goal the entity to update
     * @returns message informing if updating was correct
     */
    updateGoal(id, goal) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/goals] Update Goals By ID: ${id} `);
                yield (0, goal_orm_1.updateGoalByID)(id, goal).then((r) => {
                    response = {
                        message: `Goals with id ${id} updated successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/Goals]  Update Goals Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to update an existing user'
                };
            }
            return response;
        });
    }
    /**
 * Endpoint to create the Goals in the Collection "Goals" of DB
 * @param {IGoal} Goal of user to create
 * @returns message informing if insertion was correct
 */
    addGoal(goal) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (goal) {
                (0, logger_1.LogSuccess)(`[/api/Goals] Created New Goal: ${goal.title} `);
                yield (0, goal_orm_1.createGoal)(goal).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/Goals] Created New Goal: ${goal.title} `);
                    response = {
                        message: `User created successfully: ${goal.title}`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/goals] creation needs Goal Entity');
                response = {
                    message: 'Goal not created:  Please, provide an Goal Entity to create one'
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
], GoalController.prototype, "getGoalByID", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "getGoals", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "deleteGoal", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "updateGoal", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "addGoal", null);
exports.GoalController = GoalController = __decorate([
    (0, tsoa_1.Route)("/api/goals"),
    (0, tsoa_1.Tags)("GoalController")
], GoalController);
//# sourceMappingURL=GoalController.js.map