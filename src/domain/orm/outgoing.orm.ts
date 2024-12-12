import { outgoingEntity } from "../entities/outgoing.entity";

import { LogSuccess, LogError } from "../../utils/logger";
import { Ioutgoing } from "../interfaces/Ioutgoing.interface";

// Environment variables
import dotenv from 'dotenv';

// Configuration of environment variables
dotenv.config();


// CRUD

/**
 * Method to obtain all outgoings from Collection "outgoings" in Mongo Server
 */
export const getAllOutgoingsbyUserId = async (page: number, limit: number, userID: string): Promise<any[] | undefined> => {
    try {
        let outgoingModel: any= outgoingEntity();

        let response: any = {};

        // Search all outgoings (using pagination)
        await outgoingModel.find({userId: userID })
            .select('amount description title status created_at updated_at')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((outgoings: Ioutgoing[]) => {
                response.outgoings = outgoings;
            });
        
        // Count total documents in collection "outgoings"
        await outgoingModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All outgoings by UserId: ${error}`);
    }
}

// - Get outgoing By ID
export const getOutgoingByID = async (id: string) : Promise<any | undefined> => {

    try {
        let outgoingModel: any= outgoingEntity();

        // Search outgoing By ID
        return await outgoingModel.findById(id).select('amount description title status created_at updated_at');

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }

}

// - Delete outgoing By ID
export const deleteOutgoingByID = async (id: string): Promise<any | undefined> => {

    try {
        let outgoingModel: any= outgoingEntity();

        // Delete outgoing BY ID
        return await outgoingModel.deleteOne({ _id: id })

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }

}

// - Update outgoing By ID
export const updateOutgoingByID = async (id: string, outgoing: Ioutgoing): Promise<any | undefined> => {

    try {
        
        let outgoingModel: any= outgoingEntity();

        // Update outgoing
        return await outgoingModel.findByIdAndUpdate(id, outgoing);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }

}

// Create new outgoing
export const createOutgoing = async (outgoing: Ioutgoing): Promise<any | undefined> => {
    try {
        
        let outgoingModel: any= outgoingEntity();

        // Create / Insert new outgoing
        return await outgoingModel.create(outgoing);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }

}

