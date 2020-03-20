import { UserDB } from "../../../data/UserDB";
import { User } from "../../entities/User";
import * as bcrypt from 'bcrypt'

export class UpdateUserDataUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: UpdateUserDataUCInput): Promise<UpdateUserDataUCOutput | undefined> {

        try{
           
            const birthDate = new Date(input.birthDate + " 00:00");

            if (input.email.indexOf("@") === -1){
                throw new Error("Invalid email");

            } else if (Object.is(birthDate.getFullYear(), NaN)) {
                throw new Error("Invalid date");

            } else {

                await this.userDB.updateUserData(input.id, input.name, birthDate, input.email)
            
                return {
                    message: "User data Updated Successfully!"
                }
            }    
        } catch (err){
            throw new Error(`User data update failed. ${err}`)
        }  
    }
}

export interface UpdateUserDataUCInput {
    id: string;
    name: string;
    birthDate: Date;
    email: string;
}

export interface UpdateUserDataUCOutput {
    message: string;
}