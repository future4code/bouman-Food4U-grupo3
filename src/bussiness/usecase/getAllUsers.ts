import { UserDB } from "../../data/UserDB";

export class GetAllUsersUC {
    constructor(
        private userDB: UserDB
    ){}

    public async execute(): Promise<GetAllUsersUCOutput>{
        const users = await this.userDB.getAllUsers()

        if(!users){
            throw new Error("Users not found")
        }

        return{
            users: users.map(user => ({
                id: user.getId(),
                email: user.getEmail()
            }))
        }
    }
}

export interface GetAllUsersUCOutput{
    users: GetAllUsersUCOutputUser[];
}

export interface GetAllUsersUCOutputUser{
    id: string;
    email: string;
}