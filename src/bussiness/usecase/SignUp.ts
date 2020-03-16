import { v4 } from "uuid";
import { SignUpDB } from "../../data/SignUpDataBase";
import { SignUp } from "../entities/SignUp";

export class SignUpUC{
    constructor(
        private signUpDB: SignUpDB
    ){}

    public async execute(input: SignUpUCInput): Promise<SignUpUCOutput>{
        const id = v4();

        const user = new SignUp(
            id, 
            input.email,
            input.password
        )

        await this.signUpDB.SignUp(user)

        return {
            message: "User Created SuccessFully"
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