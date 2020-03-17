import { RecipeDB } from "../../data/RecipeDB";
import { v4 } from "uuid";
import { Recipe } from "../entities/Recipe";

export class CreateRecipeUC {
    constructor(
        private recipeDB: RecipeDB
    ){}

    public async execute(input: RecipeUCInput): Promise<RecipeUCOutPut>{
        try{
            const id = v4()
            console.log("CHEGOU AQUI")
            const recipe = new Recipe(
                id,
                input.title,
                input.description,
                new Date(),
                input.user_id
            )

            await this.recipeDB.createRecipe(recipe)

            return{
                message: "Recipe Created SuccessFully"
            }

        } catch(err){
            console.log(err)
            throw new Error("Error. Fail Recipe Create")
        }
        
    }
}

export interface RecipeUCInput{
    title: string,
    description: string,
    user_id: string
}

export interface RecipeUCOutPut{
    message: string
}