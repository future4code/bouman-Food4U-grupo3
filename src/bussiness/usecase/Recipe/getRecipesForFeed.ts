import { RecipeDB } from "../../../data/RecipeDB";

export class GetRecipesForFeedUC {
    constructor(
        private recipeDB: RecipeDB
    ){}

    public async execute(input: GetRecipesForFeedUCInput): Promise<GetRecipesForFeedUCOutputUser[]>{
        const recipes = await this.recipeDB.getRecipesForFeed(input.id)

        if(!recipes){
            throw new Error("recipes empty")
        }

        return recipes.map(recipe => {
                return {
                    id: recipe.getId(),
                    title: recipe.getTitle(),
                    description: recipe.getDescription(),
                    creationDate: recipe.getCreationDate(),
                    userId: recipe.getUserId(),
                    name: recipe.getName()
                }
        })
    }
}

export interface GetRecipesForFeedUCInput{
    id: string
}

export interface GetRecipesForFeedUCOutputUser{
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    userId: string;
    name: string;
}