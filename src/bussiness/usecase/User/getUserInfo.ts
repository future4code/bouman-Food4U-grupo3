import { UserDB } from "../../../data/UserDB";

export class GetUserInfoUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: GetUserInfoUCInput): Promise<GetUserInfoUCOutput> {
        const user = await this.userDB.getUserById(input.id)

        if (!user) {
            throw new Error("User not found")
        }

        return {
            id: user.getId(),
            name: user.getName(),
            birthDate: user.getBirthDate(),
            email: user.getEmail()
        }
    }

}

export interface GetUserInfoUCInput {
    id: string
}

export interface GetUserInfoUCOutput {
    id: string,
    name: string,
    birthDate: Date,
    email: string
}