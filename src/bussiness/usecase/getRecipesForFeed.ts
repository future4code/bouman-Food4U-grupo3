import { RecipeDB } from "../../data/RecipeDB";

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
                    creation_Date: recipe.getCreation_Date(),
                    user_id: recipe.getUser_id(),
                    email: recipe.getEmail()
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
    creation_Date: Date;
    user_id: string;
}