import { BaseDB } from "./BaseDataBase";
import { Recipe } from "../bussiness/entities/Recipe";
import { Feed } from "../bussiness/entities/feed";

export class RecipeDB extends BaseDB {
    private recipeTableName = "recipes";
    private userTableName = "user";
    private relationTableName = "user_relations";

    private mapDBRecipeToRecipe(input?: any): Recipe | undefined {
        return (
            input &&
            new Recipe(
                input.id,
                input.title,
                input.description,
                input.creationDate,
                input.userId
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
        try {
            await this.connection.raw(`
            INSERT INTO ${this.recipeTableName} (id, title, description, creationDate, userId)
            VALUES (
                '${recipe.getId()}',
                '${recipe.getTitle()}',
                '${recipe.getDescription()}',
                STR_TO_DATE('${this.mapDateToDbDate(recipe.getCreationDate())}', '%Y-%m-%d %H:%i:%s'),
                '${recipe.getUserId()}'
            )
        `)
        } catch (err) {
            if (err) {

            }
        }
    }

    public async getAllRecipes(): Promise<Recipe[] | undefined> {
        const result = await this.connection.raw(`
            SELECT u.email, r.id, r.title, r.description, r.creationDate, r.userId
            FROM ${this.recipeTableName} r
            JOIN ${this.userTableName} u
            ON u.id = r.userId
            ORDER BY userId
        `)

        if (!result[0][0]) {
            return undefined;
        }


        return result[0].map((res: any) => this.mapDBRecipeToRecipe(res)!);
    }

    public async getRecipesForFeed(id: string): Promise<Feed[] | undefined> {
        const result = await this.connection.raw(`
            SELECT r.*, u.email
            FROM ${this.relationTableName} ur
            JOIN ${this.userTableName} u
            ON ur.followerId = u.id
            JOIN ${this.recipeTableName} r
            ON ur.followerId = r.userId
            WHERE userId = '${id}'
            ORDER BY r.creationDate DESC;
        `)

        if (!result[0][0]) {
            return undefined;
        }

        return result[0].map((recipe: any) => {
            return new Feed(
                recipe.id,
                recipe.title,
                recipe.description,
                recipe.creationDate,
                recipe.userId,
                recipe.email
            )
        })
    }
}