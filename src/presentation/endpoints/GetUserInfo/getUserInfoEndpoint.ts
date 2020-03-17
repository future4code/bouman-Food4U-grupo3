import { Request, Response } from "express";
import { UserDB } from "../../../data/UserDB";
import { GetUserInfoUC } from "../../../bussiness/usecase/getUserInfo";
import * as jwt from "jsonwebtoken";

export const GetUserInfoEndpoint = async (req: Request, res: Response) => {
    try{
        const loginUc = new GetUserInfoUC(new UserDB());

        const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as {id: string}
        
        const result = {
            id: token_verify.id
        };

        const userInfo = await loginUc.execute(result)
        
        res.status(200).send({user: userInfo});
    } catch (err){
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}