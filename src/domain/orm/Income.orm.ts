import { incomeEntity } from "../entities/Income.entity";

import { LogSuccess, LogError } from "../../utils/logger";
import { Iincome } from "../interfaces/Iincome.interface";

// Environment variables
import dotenv from 'dotenv';

// Configuration of environment variables
dotenv.config();


// CRUD

/**
 * Method to obtain all Incomes from Collection "Incomes" in Mongo Server
 */
export const getAllIncomesbyUserId = async (page: number, limit: number, userID: string): Promise<any[] | undefined> => {
    try {
        let incomeModel: any= incomeEntity();

        let response: any = {};

        // Search all Incomes (using pagination)
        await incomeModel.find({userId: userID })
            .select('amount description title status created_at updated_at')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((incomes: Iincome[]) => {
                response.incomes = incomes;
            });
        
        // Count total documents in collection "Incomes"
        await incomeModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All incomes by UserId: ${error}`);
    }
}

// - Get Income By ID
export const getIncomeByID = async (id: string) : Promise<any | undefined> => {

    try {
        let incomeModel: any= incomeEntity();

        // Search Income By ID
        return await incomeModel.findById(id).select('amount description title status created_at updated_at');

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }

}

// - Delete Income By ID
export const deleteIncomeByID = async (id: string): Promise<any | undefined> => {

    try {
        let incomeModel: any= incomeEntity();

        // Delete Income BY ID
        return await incomeModel.deleteOne({ _id: id })

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }

}

// - Update Income By ID
export const updateIncomeByID = async (id: string, income: Iincome): Promise<any | undefined> => {

    try {
        
        let incomeModel: any= incomeEntity();

        // Update Income
        return await incomeModel.findByIdAndUpdate(id, income);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }

}

// Create new Income
export const createIncome = async (income: Iincome): Promise<any | undefined> => {
    try {
        
        let incomeModel: any= incomeEntity();

        // Create / Insert new Income
        return await incomeModel.create(income);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }

}

