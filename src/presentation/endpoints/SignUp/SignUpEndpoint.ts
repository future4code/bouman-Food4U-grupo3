import { Request, Response } from "express";
import { UserDB } from "../../../data/UserDB";
import { SignUpUC } from "../../../bussiness/usecase/User/SignUp";

export const SignUpEndpoint = async (req: Request, res: Response) => {
    try {
        const signUpUC = new SignUpUC(new UserDB());
        const result = await signUpUC.execute({
            name: req.body.name,
            birthDate: req.body.birthDate,
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