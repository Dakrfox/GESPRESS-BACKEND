import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IOutgoingController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Outgoing Collection
import { getAllOutgoingsbyUserId, getOutgoingByID, deleteOutgoingByID, updateOutgoingByID, createOutgoing } from "../domain/orm/outgoing.orm";
import { Ioutgoing } from "@/domain/interfaces/Ioutgoing.interface";


@Route("/api/outgoing")
@Tags("outgoingController")
export class OutgoingController implements IOutgoingController {
    /**
     * Endpoint to retreive the Outgoings in the Collection "Outgoings" of DB 
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by iD
     */
    @Get("/")
    public async getOutgoingByID(@Query()page: number, @Query()limit: number, @Query()id: string): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/Outgoings] Get Outgoings By user ID: ${id} `);
            response = await getOutgoingByID(id);
        }else {
            LogError('[/api/outgoings] Get Outgoing Request WITHOUT ID')
            response = {
                message : "Please, provide an ID to get a existing Outgoing"
            }
        }
        
        return response;
    }
    /**
     * Endpoint to retreive the Outgoings in the Collection "Outgoings" of DB 
     * @param {string} userIdid Id of user to retreive (optional)
     * @returns All Outgoings by User iD
     */
    @Get("/")
    public async getOutgoings(@Query()page: number, @Query()limit: number, @Query()userId?: string): Promise<any> {
        
        let response: any = '';
        
        if(userId){
            LogSuccess(`[/api/outgoings] Get Outgoings By user ID: ${userId} `);
            response = await getAllOutgoingsbyUserId(page, limit, userId);
        }else {
            LogError('[/api/outgoings] Get Outgoings Request WITHOUT USERID')
            response = {
                message : "Please, provide an USERID to get existing outgoings"
            }
        }
        
        return response;
    }
    /**
     * Endpoint to delete the Outgoing in the Collection "Outgoing" of DB 
     * @param {string} id Id of user to delete (optional)
     * @returns message informing if deletion was correct
     */
    @Delete("/")
    public async deleteOutgoing(@Query()id?: string): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/outgoings] Delete Outgoings By ID: ${id} `);
            await deleteOutgoingByID(id).then((r) => {
                response =  {
                    message: `Outgoing with id ${id} deleted successfully`
                }
            })
        }else {
            LogWarning('[/api/outgoings] Delete User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }
        
        return response;
    }
    /**
     * Endpoint to update the outgoings in the Collection "outgoings" of DB 
     * @param {string} id to update de outgoings
     * @param {Ioutgoing}outgoing the entity to update
     * @returns message informing if updating was correct
     */
    @Put("/")
    public async updateOutgoing(@Query()id: string, @Query()outgoing: Ioutgoing): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/outgoings] Update Outgoings By ID: ${id} `);
            await updateOutgoingByID(id, outgoing).then((r) => {
                response =  {
                    message: `Outgoings with id ${id} updated successfully`
                }
            })
        }else {
            LogWarning('[/api/outgoings]  Update Outgoings Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }
        
        return response;
    }
        /**
     * Endpoint to create the outgoings in the Collection "Outgoings" of DB 
     * @param {Ioutgoing} outgoing of user to create 
     * @returns message informing if insertion was correct
     */
    @Post("/")
    public async addOutgoing(@Query()outgoing: Ioutgoing): Promise<any> {
        
        let response: any = '';

        if(outgoing){
            LogSuccess(`[/api/outgoings] Created New Outgoing: ${outgoing.title} `);
            await createOutgoing(outgoing).then((r) => {
                LogSuccess(`[/api/Outgoings] Created New Outgoing: ${outgoing.title} `);
                response = {
                    message: `User created successfully: ${outgoing.title}`
                }
            });
        }else {
            LogWarning('[/api/outgoings] creation needs outgoing Entity')
            response = {
                message: 'Outgoing not created:  Please, provide an Outgoing Entity to create one'
            }
        }
        return response;
    }
 
}