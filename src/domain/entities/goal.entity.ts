import mongoose from "mongoose";
import { Igoal } from "../interfaces/Igoal.interface";


export const goalEntity = () => {

    let goalSchema = new mongoose.Schema<Igoal>(
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
            amount_target: { type: Number, required: true },
            description: { type: String, required: true },
            title: { type: String, required: true },
            status: { type: String, required: true },
            created_at: { type: Date, required: true },
            updated_at: { type: Date, required: true }
        }
        
    );

    return mongoose.models.Goals || mongoose.model<Igoal>('Goals', goalSchema);

}