import { BaseDB } from "./BaseDataBase";
import { Recipe } from "../bussiness/entities/Recipe";

export class RecipeDB extends BaseDB {
    private recipeTableName = "recipes";

    private mapDBRecipeToRecipe(input?: any): Recipe | undefined {
        return (
            input &&
            new Recipe(
                input.id,
                input.title,
                input.description,
                input.creation_Date,
                input.user_id
            )
        )
    }

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        const hour = input.getHours();
        const minute = input.getMinutes();
        const second = input.getSeconds();
        return `${year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second}`;
    }

    public async createRecipe(recipe: Recipe): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.recipeTableName} (id, title, description, creation_Date, user_id)
            VALUES (
                '${recipe.getId()}',
                '${recipe.getTitle()}',
                '${recipe.getDescription()}',
                STR_TO_DATE('${this.mapDateToDbDate(recipe.getCreation_Date())}', '%Y-%m-%d %H:%i:%s'),
                '${recipe.getUser_id()}'
            )
        `)
    }

    public async getAllRecipes(): Promise<Recipe[] | undefined> {
        const result = await this.connection.raw(`
            SELECT id, title, description, creation_Date
            FROM recipes
        `)

        if (!result[0][0]) {
            return undefined;
        }

        return result[0].map((res: any) => this.mapDBRecipeToRecipe(res)!);
    }
}