export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private creation_Date: Date,
        private user_id: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getCreation_Date(): Date {
        return this.creation_Date;
    }

    public setCreation_Date(creation_Date: Date) {
        this.creation_Date = creation_Date;
    }

    public getUser_id(): string {
        return this.user_id;
    }

    public setUser_id(user_id: string) {
        this.user_id = user_id
    }
}