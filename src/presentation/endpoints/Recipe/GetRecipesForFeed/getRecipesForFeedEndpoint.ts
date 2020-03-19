import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RecipeDB } from "../../../../data/RecipeDB";
import { GetRecipesForFeedUC } from "../../../../bussiness/usecase/Recipe/getRecipesForFeed";

export const GetRecipesForFeedEndpoint = async (req: Request, res: Response) => {
    try{
        const getRecipesForFeedUc = new GetRecipesForFeedUC(new RecipeDB());

        const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as {id: string}
        
        const result = await getRecipesForFeedUc.execute({
            id: token_verify.id,
        });
        
        res.status(200).send({result});
    } catch (err){
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}