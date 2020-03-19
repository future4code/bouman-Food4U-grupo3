import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { FollowUserRelationUC } from "../../../bussiness/usecase/FollowUser";
import { UserDB } from "../../../data/UserDB";

export const FollowUserEndpoint = async (req: Request, res: Response) => {
    try {
        const followUserRelationUC = new FollowUserRelationUC(new UserDB());

        const token_verify = jwt.verify(req.headers.authorization as string, "biotonico Fontoura") as { id: string }

        const result = await followUserRelationUC.execute({
            userId: token_verify.id,
            followerId: req.body.followerId
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(err.errorCode || 400).send({
            message: err.message
        });
    }
}