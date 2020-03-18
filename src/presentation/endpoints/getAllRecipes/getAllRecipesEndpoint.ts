import { Request, Response } from "express";
import { GetAllRecipesUC } from "../../../bussiness/usecase/getAllRecipes";
import { RecipeDB } from "../../../data/RecipeDB";
import * as jwt from "jsonwebtoken";


export const GetAllRecipesEndpoint = async (req: Request, res: Response) => {
  try {
    const getAllRecipesUC = new GetAllRecipesUC(new RecipeDB());

    const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as {id: string}

    if(token_verify === token_verify){
        const result = await getAllRecipesUC.execute();

        res.status(200).send(result);
    }
    
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};