"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const incomeEntity = () => {
    let incomeSchema = new mongoose_1.default.Schema({
        /*      user
                amount:number,
                description:string,
                title:string,
                status:string,
                created_at:Date,
                updated_at:Date,
                TODO categorias
                */
        userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Users' },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
        status: { type: String, required: true },
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true }
    });
    return mongoose_1.default.models.Incomes || mongoose_1.default.model('Incomes', incomeSchema);
};
exports.incomeEntity = incomeEntity;
//# sourceMappingURL=Income.entity.js.map