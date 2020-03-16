import { BaseDB } from "./BaseDataBase";
import { SignUp } from "../bussiness/entities/SignUp";

export class SignUpDB extends BaseDB{
    private singUpDB = "singup";

    public async SignUp(signup: SignUp): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.singUpDB} (id, email, password)
            VALUES(
                '${signup.getId()}',
                '${signup.getEmail()}',
                '${signup.getPassword()}'
            )
        `);
    }
}