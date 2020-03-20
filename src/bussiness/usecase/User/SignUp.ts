import { v4 } from "uuid";
import { User } from "../../entities/User";
import { UserDB } from "../../../data/UserDB";
import * as bcrypt from "bcrypt";

export class SignUpUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: SignUpUCInput): Promise<SignUpUCOutput> {
        try {
            const id = v4();

            const birthDate = new Date(input.birthDate + " 00:00");

            if (input.password.length < 6) {
                throw new Error("Minimun password length is 6")

            } else if (input.email.indexOf("@") === -1){
                throw new Error("Invalid email");

            } else if (Object.is(birthDate.getFullYear(), NaN)) {
                throw new Error("Invalid date");

            } else {
                const hashPassword = await bcrypt.hash(input.password, 15);

                const user = new User(
                    id,
                    input.name,
                    birthDate,
                    input.email,
                    hashPassword
                )

                await this.userDB.SignUp(user)

                return {
                    message: "User Created SuccessFully"
                }
            }

        } catch (err) {
            console.log(err)
            throw new Error(`Error. Fail User Create. ${err}`)
        }

    }

}

export interface SignUpUCInput {
    name: string,
    birthDate: Date,
    email: string,
    password: string
}

export interface SignUpUCOutput {
    message: string
}