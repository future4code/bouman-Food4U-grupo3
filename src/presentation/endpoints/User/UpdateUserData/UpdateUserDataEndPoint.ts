import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserDB } from "../../../../data/UserDB";
import { UpdateUserDataUC } from "../../../../bussiness/usecase/User/updateUserData";

export const UpdateUserDataEndpoint = async (req: Request, res: Response) => {
    try {
        const updateUserDataUC = new UpdateUserDataUC(new UserDB());

        const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as { id: string }

        const result = await updateUserDataUC.execute({
            id: token_verify.id,
            name: req.body.name,
            birthDate: req.body.birthDate,
            email: req.body.email
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}