import { UserDB } from "../../../data/UserDB";
import { User } from "../../entities/User";
import * as bcrypt from 'bcrypt'

export class UpdateUserPasswordUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: UpdateUserPasswordUCInput): Promise<UpdateUserPasswordUCOutput> {

        if (input.password.length < 6) {
            throw new Error("Minimun password length is 6")
        } else {
            const hashPassword = await bcrypt.hash(input.password, 15);

            await this.userDB.updateUserPassword(input.id, hashPassword)

            return {
                message: "User Password Updated Successfully"
            }
        }
    }
}

export interface UpdateUserPasswordUCInput {
    id: string,
    password: string
}

export interface UpdateUserPasswordUCOutput {
    message: string
}