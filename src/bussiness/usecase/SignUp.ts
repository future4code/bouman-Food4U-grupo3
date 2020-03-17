import { v4 } from "uuid";
import { User } from "../entities/User";
import { UserDB } from "../../data/UserDB";
import * as bcrypt from "bcrypt";

export class SignUpUC{
    constructor(
        private userDB: UserDB
    ){}

    public async execute(input: SignUpUCInput): Promise<SignUpUCOutput>{
        try{
            const id = v4();

            if (input.password.length < 6){
                throw new Error("Minimun password length is 6")
            } else {
                const hashPassword = await bcrypt.hash(input.password, 15);
    
                const user = new User(
                    id, 
                    input.email,
                    hashPassword
                )
        
                await this.userDB.SignUp(user)
        
                return {
                    message: "User Created SuccessFully"
                }
            }
            
        } catch(err){
            console.log(err)
            throw new Error("Error. Fail User Create")
        }
        
    }

}

export interface SignUpUCInput{
    email: string,
    password: string
}

export interface SignUpUCOutput{
    message: string
}