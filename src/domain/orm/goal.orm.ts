import { goalEntity } from "../entities/goal.entity";

import { LogSuccess, LogError } from "../../utils/logger";
import { Igoal } from "../interfaces/Igoal.interface";

// Environment variables
import dotenv from 'dotenv';

// Configuration of environment variables
dotenv.config();


// CRUD

/**
 * Method to obtain all goals from Collection "goals" in Mongo Server
 */
export const getAllgoalsbyUserId = async (page: number, limit: number, userID: string): Promise<any[] | undefined> => {
    try {
        let goalModel: any= goalEntity();

        let response: any = {};

        // Search all goals (using pagination)
        await goalModel.find({userId: userID })
            .select('amount description title status created_at updated_at')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((goals: Igoal[]) => {
                response.goals = goals;
            });
        
        // Count total documents in collection "goals"
        await goalModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All goals by UserId: ${error}`);
    }
}

// - Get goal By ID
export const getgoalByID = async (id: string) : Promise<any | undefined> => {

    try {
        let goalModel: any= goalEntity();

        // Search goal By ID
        return await goalModel.findById(id).select('amount description title status created_at updated_at');

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }

}

// - Delete goal By ID
export const deletegoalByID = async (id: string): Promise<any | undefined> => {

    try {
        let goalModel: any= goalEntity();

        // Delete goal BY ID
        return await goalModel.deleteOne({ _id: id })

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }

}

// - Update goal By ID
export const updategoalByID = async (id: string, goal: Igoal): Promise<any | undefined> => {

    try {
        
        let goalModel: any= goalEntity();

        // Update goal
        return await goalModel.findByIdAndUpdate(id, goal);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }

}

// Create new goal
export const creategoal = async (goal: Igoal): Promise<any | undefined> => {
    try {
        
        let goalModel: any= goalEntity();

        // Create / Insert new goal
        return await goalModel.create(goal);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }

}

