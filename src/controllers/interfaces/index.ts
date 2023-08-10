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