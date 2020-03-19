export class Relation {
    constructor(
        private user_id: string,
        private follower_id: string
    ) { }

    public getUser_Id(): string {
        return this.user_id;
    }

    public setUser_Id(user_id: string): void {
        this.user_id = user_id;
    }

    public getFollower_Id(): string {
        return this.follower_id;
    }

    public setFollower_Id(follower_id: string): void {
        this.follower_id = follower_id;
    }
}