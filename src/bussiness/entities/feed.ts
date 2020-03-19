import { Recipe } from "./Recipe";

export class Feed extends Recipe{
    constructor(
        id: string,
        title: string,
        description: string,
        creation_Date: Date,
        user_id: string,
        private email: string

    ){
        super(id, title, description, creation_Date, user_id)
    }

    public getEmail(){
        return this.email
    }
}