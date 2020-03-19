import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CreateRecipeUC } from "../../../bussiness/usecase/CreateRecipe";
import { RecipeDB } from "../../../data/RecipeDB";

export const CreateRecipeEndpoint = async (req: Request, res: Response) => {
    try {
        const createRecipeUC = new CreateRecipeUC(new RecipeDB());

        const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as { id: string }

        const result = await createRecipeUC.execute({
            title: req.body.title,
            description: req.body.description,
            user_id: token_verify.id
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}