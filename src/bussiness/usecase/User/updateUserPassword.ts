import { UserDB } from "../../../data/UserDB";
import { User } from "../../entities/User";
import * as bcrypt from 'bcrypt'

export class UpdateUserPasswordUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: UpdateUserPasswordUCInput): Promise<UpdateUserPasswordUCOutput | undefined> {

        try{
           
            if (input.password.length < 6) {
                throw new Error("Minimun password length is 6.")
        
            } else {

                const newHashPassword = await bcrypt.hash(input.password, 15);
    
                await this.userDB.updateUserPassword(input.id, newHashPassword)
             
                return {
                    message: "User Password Updated Successfully!"
                }
            }
        } catch (err){
            throw new Error(`Password update failed. ${err}`)
        }  
    }
}

export interface UpdateUserPasswordUCInput {
    id: string,
    password: string,
}

export interface UpdateUserPasswordUCOutput {
    message: string
}