import mongoose from "mongoose";

export interface Igoal{
    userId: mongoose.Schema.Types.ObjectId;
    amount_target:number,
    description:string,
    title:string,
    status:string,
    created_at:Date,
    updated_at:Date,
    //TODO categorias
}