import { UserDB } from "../../data/UserDB";

export class FollowUserRelationUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: FollowUserRelationUCInput): Promise<FollowUserRelationUCOutput> {
        await this.userDB.createFollowRelation(input.userId, input.followerId)

        return {
            message: "User Followed Successfully"
        }
    }
}

export interface FollowUserRelationUCInput {
    userId: string,
    followerId: string
}

export interface FollowUserRelationUCOutput {
    message: string
}