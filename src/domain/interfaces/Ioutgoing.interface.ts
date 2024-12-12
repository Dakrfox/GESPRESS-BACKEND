import mongoose from "mongoose";

export interface Ioutgoing{
    userId: mongoose.Schema.Types.ObjectId ;
    amount:number,
    description:string,
    title:string,
    status:string,
    created_at:Date,
    updated_at:Date,
    //TODO categorias
}