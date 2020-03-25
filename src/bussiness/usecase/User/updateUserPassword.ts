import { UserDB } from "../../../data/UserDB";
import { User } from "../../entities/User";
import * as bcrypt from 'bcrypt'

export class UpdateUserPasswordUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: UpdateUserPasswordUCInput): Promise<UpdateUserPasswordUCOutput> {

        try{

            let message: string = "" 

            const user = await this.userDB.getUserById(input.id)

            if (!user) {
                throw new Error("user not found")
            }


            const comparePassword = await bcrypt.compare(input.currentPassword, user.getPassword())

            if (!comparePassword) {
                throw new Error("Wrong Password")
                
            } 

            
            if (input.newPassword.length < 6) {
                throw new Error("Minimun password length is 6.")
        
            } 
                    
            const newHashPassword = await bcrypt.hash(input.newPassword, 15);

            await this.userDB.updateUserPassword(input.id, newHashPassword)

            message = "Password updated successfully"        
                
            return {
                message: `${message}`
            }
                

        } catch (err){
            throw new Error(`Password update failed. ${err}`)
        }  
    }
}

export interface UpdateUserPasswordUCInput {
    id: string,
    currentPassword: string,
    newPassword: string,
}

export interface UpdateUserPasswordUCOutput {
    message: string
}