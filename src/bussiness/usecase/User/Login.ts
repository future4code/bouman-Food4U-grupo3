import { UserDB } from "../../../data/UserDB";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

export class LoginUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: LoginUCInput): Promise<LoginUCOutput> {

        if (!(input.email && input.email.indexOf("@") !== -1)) {
            throw new Error("Invalid email");
        }

        const user = await this.userDB.getUserByEmail(input.email)

        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(input.password, user.getPassword())

        if (!isPasswordCorrect) {
            throw new Error("Wrong Password")
        }

        const token = jwt.sign({ id: user.getId() }, "biotonico Fontoura", {
            expiresIn: '1h'
        })

        return {
            message: "User Logged SuccessFully",
            token: token
        }
    }
}

export interface LoginUCInput {
    email: string,
    password: string
}

export interface LoginUCOutput {
    message: string
    token: string
}