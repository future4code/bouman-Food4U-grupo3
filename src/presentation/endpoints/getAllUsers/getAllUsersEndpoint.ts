import { Request, Response } from "express";
import { GetAllUsersUC } from "../../../bussiness/usecase/getAllUsers";
import { UserDB } from "../../../data/UserDB";
import * as jwt from "jsonwebtoken";

export const GetAllUsersEndpoint = async (req: Request, res: Response) => {
  try {
    const signupUC = new GetAllUsersUC(new UserDB());

    const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as {id: string}

    if(token_verify === token_verify){
      const result = await signupUC.execute();

      res.status(200).send(result);
    }
    
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};