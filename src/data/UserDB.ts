import { BaseDB } from "./BaseDataBase";
import { User } from "../bussiness/entities/User";

export class UserDB extends BaseDB {
    private userTableName = "user";
    private relationTableName = "user_relations"

    private mapDBUserToUser(input?: any): User | undefined {
        return (
            input &&
            new User(
                input.id,
                input.name,
                input.birthDate,
                input.email,
                input.password
            )
        )
    }

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    public async SignUp(user: User): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.userTableName} (id, name, birthDate, email, password)
            VALUES(
                '${user.getId()}',
                '${user.getName()}',
                '${user.getBirthDate()}',
                '${user.getEmail()}',
                '${user.getPassword()}'
            )
        `);
    }


    public async getUserByEmail(email: string): Promise<User | undefined> {
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE email='${email}'
        `)

        if (!result[0][0]) {
            return undefined;
        }

        return this.mapDBUserToUser(result[0][0])
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const result = await this.connection.raw(`
            SELECT id, name, birthDate, email
            FROM ${this.userTableName}
            WHERE id='${id}'
        `)

        if (!result[0][0]) {
            return undefined;
        };

        return this.mapDBUserToUser(result[0][0])
    }

    public async createFollowRelation(followerId: string, followedId: string): Promise<void> {

        await this.connection.raw(`
            INSERT INTO ${this.relationTableName}(followerId, followedId)
            VALUES ('${followerId}', '${followedId}')
        `)
    }

    public async getAllUsers(): Promise<User[] | undefined> {
        const result = await this.connection.raw(`
            SELECT id, name, birthDate, email
            FROM ${this.userTableName}
            ORDER BY email ASC
        `)

        if (!result[0][0]) {
            return undefined
        };

        return result[0].map((res: any) => this.mapDBUserToUser(res)!);
    }

    public async updateUserPassword(id: string, password: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.userTableName}
            SET password = '${password}'
            WHERE id='${id}'
        `)
    }
}