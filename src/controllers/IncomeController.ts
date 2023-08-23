import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IIncomeController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Income Collection
import { getAllIncomesbyUserId, getIncomeByID, deleteIncomeByID, updateIncomeByID, createIncome } from "../domain/orm/Income.orm";
import { Iincome } from "@/domain/interfaces/Iincome.interface";


@Route("/api/incomes")
@Tags("IncomeController")
export class IncomeController implements IIncomeController {
    /**
     * Endpoint to retreive the Incomes in the Collection "Incomes" of DB 
     * @param {string} id Id of income to retreive (optional)
     * @return an income if exist
     */
    @Get("/")
    public async getIncomeByID(@Query()page: number, @Query()limit: number, @Query()id: string): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/incomes] Get Incomes By user ID: ${id} `);
            response = await getIncomeByID(id);
        }else {
            LogError('[/api/incomes] Get Income Request WITHOUT ID')
            response = {
                message : "Please, provide an ID to get a existing income"
            }
        }
        
        return response;
    }
    /**
     * Endpoint to retreive the Incomes in the Collection "Incomes" of DB 
     * @param {string} userId Id of user to retreive
     * @returns All incomes by User iD
     */
    @Get("/")
    public async getIncomes(@Query()page: number, @Query()limit: number, @Query()userId?: string): Promise<any> {
        
        let response: any = '';
        
        if(userId){
            LogSuccess(`[/api/incomes] Get Incomes By user ID: ${userId} `);
            response = await getAllIncomesbyUserId(page, limit, userId);
        }else {
            LogError('[/api/incomes] Get Incomes Request WITHOUT USERID')
            response = {
                message : "Please, provide an USERID to get existing incomes"
            }
        }
        
        return response;
    }
    /**
     * Endpoint to delete the Incomes in the Collection "Incomes" of DB 
     * @param {string} id Id of income to delete 
     * @returns message informing if deletion was correct
     */
    @Delete("/")
    public async deleteIncome(@Query()id?: string): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/incomes] Delete Incomes By ID: ${id} `);
            await deleteIncomeByID(id).then((r) => {
                response =  {
                    message: `Income with id ${id} deleted successfully`
                }
            })
        }else {
            LogWarning('[/api/incomes] Delete User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }
        
        return response;
    }
    /**
     * Endpoint to update the incomes in the Collection "Incomes" of DB 
     * @param {string} id to update de incomes
     * @param {IIncome}income the entity to update
     * @returns message informing if updating was correct
     */
    @Put("/")
    public async updateIncome(@Query()id: string, @Query()income: Iincome): Promise<any> {
        
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/incomes] Update Incomes By ID: ${id} `);
            await updateIncomeByID(id, income).then((r) => {
                response =  {
                    message: `Incomes with id ${id} updated successfully`
                }
            })
        }else {
            LogWarning('[/api/incomes]  Update Incomes Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }
        
        return response;
    }
        /**
     * Endpoint to create the incomes in the Collection "Incomes" of DB 
     * @param {Iincome} income of user to create 
     * @returns message informing if insertion was correct
     */
    @Post("/")
    public async addIncome(@Query()income: Iincome): Promise<any> {
        
        let response: any = '';

        if(income){
            LogSuccess(`[/api/incomes] Created New Income: ${income.title} `);
            await createIncome(income).then((r) => {
                LogSuccess(`[/api/incomes] Created New Income: ${income.title} `);
                response = {
                    message: `User created successfully: ${income.title}`
                }
            });
        }else {
            LogWarning('[/api/incomes] creation needs Income Entity')
            response = {
                message: 'Income not created:  Please, provide an Income Entity to create one'
            }
        }
        return response;
    }
 
}