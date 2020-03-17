import { BaseDB } from "./BaseDataBase";
import { Recipe } from "../bussiness/entities/Recipe";

export class RecipeDB extends BaseDB{
    private recipeTableName = "recipes";

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        const hour = input.getHours();
        const minute = input.getMinutes();
        const second = input.getSeconds();
        return `${year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second }`;
    }

    private mapDbDateToDate(input: string): Date {
        return new Date(input);
    }

    public async createRecipe(recipe: Recipe): Promise<void>{
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
}