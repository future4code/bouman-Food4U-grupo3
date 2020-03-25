export class Relation {
    constructor(
        private followerId: string,
        private followedId: string
    ) { }

    public getFollowerId(): string {
        return this.followerId;
    }

    public setFollowerId(followerId: string): void {
        this.followerId = followerId;
    }

    public getFollowedId(): string {
        return this.followedId;
    }

    public setFollowedId(followedId: string): void {
        this.followedId = followedId;
    }
}