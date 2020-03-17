import express, { Request, Response } from "express";
import { SignUpEndpoint } from "./endpoints/SignUp/SignUpEndpoint";
import { LoginEndpoint } from "./endpoints/Login/LoginEndpoint";
import { GetUserInfoEndpoint } from "./endpoints/GetUserInfo/getUserInfoEndpoint";

const app = express();
app.use(express.json());

app.post("/signup", SignUpEndpoint);
app.post("/login", LoginEndpoint);
app.get("/getUser", GetUserInfoEndpoint);

export default app;
