import { RecipeDB } from "../../data/RecipeDB";

export class GetAllRecipesUC {
    constructor(
        private recipeDB: RecipeDB
    ){}

    public async execute(): Promise<GetAllRecipesUCOutput>{
        const recipes = await this.recipeDB.getAllRecipes()

        if(!recipes){
            throw new Error("Recipes not found")
        }

        return{
            recipes: recipes.map(recipe => ({
                id: recipe.getId(),
                title: recipe.getTitle(),
                description: recipe.getDescription(),
                creation_Date: recipe.getCreation_Date()
            }))
        }
    }
}

export interface GetAllRecipesUCOutput{
    recipes: GetAllRecipesUCOutputRecipe[];
}

export interface GetAllRecipesUCOutputRecipe{
    id: string;
    title: string;
    description: string;
    creation_Date: Date;
}