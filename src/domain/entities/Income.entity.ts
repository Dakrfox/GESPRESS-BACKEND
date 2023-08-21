import mongoose from "mongoose";
import { Iincome } from "../interfaces/Iincome.interface";


export const incomeEntity = () => {

    let incomeSchema = new mongoose.Schema<Iincome>(
        {
        /*      user
                amount:number,
                description:string,
                title:string,
                status:string,
                created_at:Date,
                updated_at:Date,
                TODO categorias 
                */
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            amount: { type: Number, required: true },
            description: { type: String, required: true },
            title: { type: String, required: true },
            status: { type: String, required: true },
            created_at: { type: Date, required: true },
            updated_at: { type: Date, required: true }
        }
        
    );

    return mongoose.models.Incomes || mongoose.model<Iincome>('Incomes', incomeSchema);

}