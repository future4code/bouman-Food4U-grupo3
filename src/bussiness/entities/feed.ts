import { Recipe } from "./Recipe";

export class Feed extends Recipe{
    constructor(
        id: string,
        title: string,
        description: string,
        creationDate: Date,
        userId: string,
        private name: string

    ){
        super(id, title, description, creationDate, userId)
    }

    public getName(){
        return this.name
    }
}