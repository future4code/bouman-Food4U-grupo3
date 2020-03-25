import { UserDB } from "../../../data/UserDB";

export class FollowUserRelationUC {
    constructor(
        private userDB: UserDB
    ) { }

    public async execute(input: FollowUserRelationUCInput): Promise<FollowUserRelationUCOutput> {
        await this.userDB.createFollowRelation(input.followerId, input.followedId)

        return {
            message: "User Followed Successfully"
        }
    }
}

export interface FollowUserRelationUCInput {
    followerId: string,
    followedId: string
}

export interface FollowUserRelationUCOutput {
    message: string
}