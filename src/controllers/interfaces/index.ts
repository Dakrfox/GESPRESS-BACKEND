import { IUser } from "../../domain/interfaces/IUser.interface";


export interface IUserController {
    // Read all users from database || get User By ID
    getUsers(page: number, limit: number, id?: string): Promise<any>
    // Delete User By ID
    deleteUser(id?:string): Promise<any>
    // Update user
    updateUser(id:string, user: any): Promise<any>
}


export interface IAuthController {
    // register users
    registerUser(user: IUser):  Promise<any>
    // login user
    loginUser(auth: any): Promise<any>
}

export interface IIncomeController {
    //get income by id 
    getIncomeByID(page: number, limit: number, id: string): Promise<any> 
    //get incomes by user id
    getIncomes(page: number, limit: number, id?: string): Promise<any>
    //delete income by id
    deleteIncome(id?: string): Promise<any>
    //update income by id 
    updateIncome(id: string, income: any): Promise<any>
    //create income
    addIncome(income:any):Promise<any>


}
export interface IOutgoingController {
    //get Outgoing by id 
    getOutgoingByID(page: number, limit: number, id: string): Promise<any> 
    //get Outgoings by user id
    getOutgoings(page: number, limit: number, id?: string): Promise<any>
    //delete Outgoing by id
    deleteOutgoing(id?: string): Promise<any>
    //update Outgoing by id 
    updateOutgoing(id: string, outgoing: any): Promise<any>
    //create Outgoing
    addOutgoing(outgoing:any):Promise<any>


}
export interface IGoalController {
    //get Goal by id 
    getGoalByID(page: number, limit: number, id: string): Promise<any> 
    //get Goals by user id
    getGoals(page: number, limit: number, id?: string): Promise<any>
    //delete Goal by id
    deleteGoal(id?: string): Promise<any>
    //update Goal by id 
    updateGoal(id: string, goal: any): Promise<any>
    //create Goal
    addGoal(goal:any):Promise<any>


}