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
exports.createGoal = exports.updateGoalByID = exports.deleteGoalByID = exports.getGoalByID = exports.getAllGoalsbyUserId = void 0;
const goal_entity_1 = require("../entities/goal.entity");
const logger_1 = require("../../utils/logger");
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration of environment variables
dotenv_1.default.config();
// CRUD
/**
 * Method to obtain all goals from Collection "goals" in Mongo Server
 */
const getAllGoalsbyUserId = (page, limit, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let goalModel = (0, goal_entity_1.goalEntity)();
        let response = {};
        // Search all goals (using pagination)
        yield goalModel.find({ userId: userID })
            .select('amount description title status created_at updated_at')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((goals) => {
            response.goals = goals;
        });
        // Count total documents in collection "goals"
        yield goalModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All goals by UserId: ${error}`);
    }
});
exports.getAllGoalsbyUserId = getAllGoalsbyUserId;
// - Get goal By ID
const getGoalByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let goalModel = (0, goal_entity_1.goalEntity)();
        // Search goal By ID
        return yield goalModel.findById(id).select('amount description title status created_at updated_at');
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
});
exports.getGoalByID = getGoalByID;
// - Delete goal By ID
const deleteGoalByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let goalModel = (0, goal_entity_1.goalEntity)();
        // Delete goal BY ID
        return yield goalModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }
});
exports.deleteGoalByID = deleteGoalByID;
// - Update goal By ID
const updateGoalByID = (id, goal) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let goalModel = (0, goal_entity_1.goalEntity)();
        // Update goal
        return yield goalModel.findByIdAndUpdate(id, goal);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
});
exports.updateGoalByID = updateGoalByID;
// Create new goal
const createGoal = (goal) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let goalModel = (0, goal_entity_1.goalEntity)();
        // Create / Insert new goal
        return yield goalModel.create(goal);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);
    }
});
exports.createGoal = createGoal;
//# sourceMappingURL=goal.orm.js.map