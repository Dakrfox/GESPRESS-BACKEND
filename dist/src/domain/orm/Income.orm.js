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
exports.createIncome = exports.updateIncomeByID = exports.deleteIncomeByID = exports.getIncomeByID = exports.getAllIncomesbyUserId = void 0;
const Income_entity_1 = require("../entities/Income.entity");
const logger_1 = require("../../utils/logger");
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration of environment variables
dotenv_1.default.config();
// CRUD
/**
 * Method to obtain all Incomes from Collection "Incomes" in Mongo Server
 */
const getAllIncomesbyUserId = (page, limit, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incomeModel = (0, Income_entity_1.incomeEntity)();
        let response = {};
        // Search all Incomes (using pagination)
        yield incomeModel.find({ userId: userID })
            .select('amount description title status created_at updated_at')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((incomes) => {
            response.incomes = incomes;
        });
        // Count total documents in collection "Incomes"
        yield incomeModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All incomes by UserId: ${error}`);
    }
});
exports.getAllIncomesbyUserId = getAllIncomesbyUserId;
// - Get Income By ID
const getIncomeByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incomeModel = (0, Income_entity_1.incomeEntity)();
        // Search Income By ID
        return yield incomeModel.findById(id).select('amount description title status created_at updated_at');
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
});
exports.getIncomeByID = getIncomeByID;
// - Delete Income By ID
const deleteIncomeByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incomeModel = (0, Income_entity_1.incomeEntity)();
        // Delete Income BY ID
        return yield incomeModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }
});
exports.deleteIncomeByID = deleteIncomeByID;
// - Update Income By ID
const updateIncomeByID = (id, income) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incomeModel = (0, Income_entity_1.incomeEntity)();
        // Update Income
        return yield incomeModel.findByIdAndUpdate(id, income);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
});
exports.updateIncomeByID = updateIncomeByID;
// Create new Income
const createIncome = (income) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incomeModel = (0, Income_entity_1.incomeEntity)();
        // Create / Insert new Income
        return yield incomeModel.create(income);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);
    }
});
exports.createIncome = createIncome;
//# sourceMappingURL=Income.orm.js.map