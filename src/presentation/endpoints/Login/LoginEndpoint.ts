import { Request, Response } from "express";
import { UserDB } from "../../../data/UserDB";
import { LoginUC } from "../../../bussiness/usecase/User/Login";

export const LoginEndpoint = async (req: Request, res: Response) => {
    try {
        const loginUc = new LoginUC(new UserDB());
        const result = await loginUc.execute({
            email: req.body.email,
            password: req.body.password
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}