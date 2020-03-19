import express, { Request, Response } from "express";
import { SignUpEndpoint } from "./endpoints/SignUp/SignUpEndpoint";
import { LoginEndpoint } from "./endpoints/Login/LoginEndpoint";
import { GetUserInfoEndpoint } from "./endpoints/GetUserInfo/getUserInfoEndpoint";
import { CreateRecipeEndpoint } from './endpoints/Recipe/createRecipeEndpoint';
import { FollowUserEndpoint } from './endpoints/FollowUser/FollowUserEndPoint';
import { GetAllUsersEndpoint } from './endpoints/getAllUsers/getAllUsersEndpoint';
import { GetAllRecipesEndpoint } from "./endpoints/getAllRecipes/getAllRecipesEndpoint";
import { GetRecipesForFeedEndpoint } from "./endpoints/getRecipesForFeed/getRecipesForFeedEndpoint";

const app = express();
app.use(express.json());

app.post("/signup", SignUpEndpoint);
app.post("/login", LoginEndpoint);
app.get("/getUser", GetUserInfoEndpoint);
app.post("/recipe", CreateRecipeEndpoint);
app.post("/user/follow", FollowUserEndpoint);
app.get("/getAllUsers", GetAllUsersEndpoint);
app.get("/recipes", GetAllRecipesEndpoint);
app.get("/feed", GetRecipesForFeedEndpoint)

export default app;
