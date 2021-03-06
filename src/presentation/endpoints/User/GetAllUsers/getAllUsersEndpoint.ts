import { Request, Response } from "express";
import { UserDB } from "../../../../data/UserDB";
import * as jwt from "jsonwebtoken";
import { GetAllUsersUC } from "../../../../bussiness/usecase/User/getAllUsers";

export const GetAllUsersEndpoint = async (req: Request, res: Response) => {
  try {
    const signupUC = new GetAllUsersUC(new UserDB());

    const jwtSecret:string = process.env.JWT_SECRET || "";
    
    const token_verify = jwt.verify(req.headers.authorization as string, jwtSecret) as { id: string }

    if (token_verify === token_verify) {
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