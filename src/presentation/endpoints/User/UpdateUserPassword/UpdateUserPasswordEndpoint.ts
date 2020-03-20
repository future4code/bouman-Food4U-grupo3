import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserDB } from "../../../../data/UserDB";
import { UpdateUserPasswordUC } from "../../../../bussiness/usecase/User/updateUserPassword";

export const UpdateUserPasswordEndpoint = async (req: Request, res: Response) => {
    try {
        const updateUserPasswordUC = new UpdateUserPasswordUC(new UserDB());

        const jwtSecret:string = process.env.JWT_SECRET || "";
        
        const token_verify = jwt.verify(req.headers.authorization as string, jwtSecret) as { id: string }

        const result = await updateUserPasswordUC.execute({
            id: token_verify.id,
            currentPassword: req.body.currentPassword,
            newPassword: req.body.newPassword
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}