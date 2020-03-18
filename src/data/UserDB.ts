import { BaseDB } from "./BaseDataBase";
import { User } from "../bussiness/entities/User";

export class UserDB extends BaseDB{
    private userTableName = "user";
    private relationTableName = "relations"

    private mapDBUserToUser(input?: any): User | undefined {
        return (
            input &&
            new User(
                input.id,
                input.email,
                input.password
            )
        )
    }

    public async SignUp(user: User): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.userTableName} (id, email, password)
            VALUES(
                '${user.getId()}',
                '${user.getEmail()}',
                '${user.getPassword()}'
            )
        `);
    }
    

    public async getUserByEmail(email: string): Promise<User | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE email='${email}'
        `)

        if(!result[0][0]){
            return undefined;
        }

        return this.mapDBUserToUser(result[0][0])
    }

    public async getUserById(id: string): Promise<User | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE id='${id}'
        `)

        if(!result[0][0]){
            return undefined;
        };

        return this.mapDBUserToUser(result[0][0])
    }

    public async createFollowRelation(userId: string, followerId: string): Promise<void>{

        await this.connection.raw(`
            INSERT INTO ${this.relationTableName}(userId, followerID)
            VALUES ('${userId}', '${followerId}')
        `)
    }

    public async getAllUsers(): Promise<User[] | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            ORDER BY email ASC
        `)

        if(!result[0][0]){
            return undefined
        };

        return result[0].map((res:any) => this.mapDBUserToUser(res)!);
    }
}