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
exports.createOutgoing = exports.updateOutgoingByID = exports.deleteOutgoingByID = exports.getOutgoingByID = exports.getAllOutgoingsbyUserId = void 0;
const outgoing_entity_1 = require("../entities/outgoing.entity");
const logger_1 = require("../../utils/logger");
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration of environment variables
dotenv_1.default.config();
// CRUD
/**
 * Method to obtain all outgoings from Collection "outgoings" in Mongo Server
 */
const getAllOutgoingsbyUserId = (page, limit, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outgoingModel = (0, outgoing_entity_1.outgoingEntity)();
        let response = {};
        // Search all outgoings (using pagination)
        yield outgoingModel.find({ userId: userID })
            .select('amount description title status created_at updated_at')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((outgoings) => {
            response.outgoings = outgoings;
        });
        // Count total documents in collection "outgoings"
        yield outgoingModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All outgoings by UserId: ${error}`);
    }
});
exports.getAllOutgoingsbyUserId = getAllOutgoingsbyUserId;
// - Get outgoing By ID
const getOutgoingByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outgoingModel = (0, outgoing_entity_1.outgoingEntity)();
        // Search outgoing By ID
        return yield outgoingModel.findById(id).select('amount description title status created_at updated_at');
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
});
exports.getOutgoingByID = getOutgoingByID;
// - Delete outgoing By ID
const deleteOutgoingByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outgoingModel = (0, outgoing_entity_1.outgoingEntity)();
        // Delete outgoing BY ID
        return yield outgoingModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }
});
exports.deleteOutgoingByID = deleteOutgoingByID;
// - Update outgoing By ID
const updateOutgoingByID = (id, outgoing) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outgoingModel = (0, outgoing_entity_1.outgoingEntity)();
        // Update outgoing
        return yield outgoingModel.findByIdAndUpdate(id, outgoing);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
});
exports.updateOutgoingByID = updateOutgoingByID;
// Create new outgoing
const createOutgoing = (outgoing) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outgoingModel = (0, outgoing_entity_1.outgoingEntity)();
        // Create / Insert new outgoing
        return yield outgoingModel.create(outgoing);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);
    }
});
exports.createOutgoing = createOutgoing;
//# sourceMappingURL=outgoing.orm.js.map