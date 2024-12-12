import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IGoalController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Goals Collection
import { getAllGoalsbyUserId, getGoalByID, deleteGoalByID, updateGoalByID, createGoal } from "../domain/orm/goal.orm";
import { Igoal } from "@/domain/interfaces/Igoal.interface";


@Route("/api/goals")
@Tags("GoalController")
export class GoalController implements IGoalController {
    /**
     * Endpoint to retreive the Goals in the Collection "Goals" of DB 
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by iD
     */
    @Get("/")
    public async getGoalByID(@Query()page: number, @Query()limit: number, @Query()id: string): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/goals] Get Goals By user ID: ${id} `);
            response = await getGoalByID(id);
        }else {
            LogError('[/api/goals] Get Goal Request WITHOUT ID')
            response = {
                message : "Please, provide an ID to get a existing Goal"
            }
        }
        
        return response;
    }
    /**
     * Endpoint to retreive the Goals in the Collection "Goals" of DB 
     * @param {string} userIdid Id of user to retreive (optional)
     * @returns All Goals by User iD
     */
    @Get("/")
    public async getGoals(@Query()page: number, @Query()limit: number, @Query()userId?: string): Promise<any> {
        
        let response: any = '';
        
        if(userId){
            LogSuccess(`[/api/goals] Get goals By user ID: ${userId} `);
            response = await getAllGoalsbyUserId(page, limit, userId);
        }else {
            LogError('[/api/goals] Get goals Request WITHOUT USERID')
            response = {
                message : "Please, provide an USERID to get existing Goals"
            }
        }
        
        return response;
    }
    /**
     * Endpoint to delete the Goal in the Collection "Goal" of DB 
     * @param {string} id Id of user to delete (optional)
     * @returns message informing if deletion was correct
     */
    @Delete("/")
    public async deleteGoal(@Query()id?: string): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/goals] Delete Goals By ID: ${id} `);
            await deleteGoalByID(id).then((r) => {
                response =  {
                    message: `Goal with id ${id} deleted successfully`
                }
            })
        }else {
            LogWarning('[/api/goals] Delete User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }
        
        return response;
    }
    /**
     * Endpoint to update the Goals in the Collection "Goals" of DB 
     * @param {string} id to update de Goals
     * @param {IGoal}Goal the entity to update
     * @returns message informing if updating was correct
     */
    @Put("/")
    public async updateGoal(@Query()id: string, @Query()goal: Igoal): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/goals] Update Goals By ID: ${id} `);
            await updateGoalByID(id, goal).then((r) => {
                response =  {
                    message: `Goals with id ${id} updated successfully`
                }
            })
        }else {
            LogWarning('[/api/Goals]  Update Goals Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }
        
        return response;
    }
        /**
     * Endpoint to create the Goals in the Collection "Goals" of DB 
     * @param {IGoal} Goal of user to create 
     * @returns message informing if insertion was correct
     */
    @Post("/")
    public async addGoal(@Query()goal: Igoal): Promise<any> {
        
        let response: any = '';

        if(goal){
            LogSuccess(`[/api/Goals] Created New Goal: ${goal.title} `);
            await createGoal(goal).then((r) => {
                LogSuccess(`[/api/Goals] Created New Goal: ${goal.title} `);
                response = {
                    message: `User created successfully: ${goal.title}`
                }
            });
        }else {
            LogWarning('[/api/goals] creation needs Goal Entity')
            response = {
                message: 'Goal not created:  Please, provide an Goal Entity to create one'
            }
        }
        return response;
    }
 
}