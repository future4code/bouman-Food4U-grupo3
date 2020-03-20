import express, { Request, Response } from "express";
import { SignUpEndpoint } from "./endpoints/User/SignUp/SignUpEndpoint";
import { LoginEndpoint } from "./endpoints/User/Login/LoginEndpoint";
import { GetUserInfoEndpoint } from "./endpoints/User/GetUserInfo/getUserInfoEndpoint";
import { CreateRecipeEndpoint } from './endpoints/Recipe/CreateRecipe/createRecipeEndpoint';
import { FollowUserEndpoint } from './endpoints/User/FollowUser/FollowUserEndPoint';
import { GetAllUsersEndpoint } from './endpoints/User/GetAllUsers/getAllUsersEndpoint';
import { GetAllRecipesEndpoint } from "./endpoints/Recipe/GetAllRecipes/getAllRecipesEndpoint";
import { GetRecipesForFeedEndpoint } from "./endpoints/Recipe/GetRecipesForFeed/getRecipesForFeedEndpoint";
import { UpdateUserPasswordEndpoint } from "./endpoints/User/UpdateUserPassword/UpdateUserPasswordEndpoint";

const app = express();
app.use(express.json());

app.post("/signup", SignUpEndpoint);
app.post("/login", LoginEndpoint);
app.get("/getUser", GetUserInfoEndpoint);
app.post("/recipe", CreateRecipeEndpoint);
app.post("/user/follow", FollowUserEndpoint);
app.get("/getAllUsers", GetAllUsersEndpoint);
app.get("/recipes", GetAllRecipesEndpoint);
app.get("/feed", GetRecipesForFeedEndpoint);
app.put("/user/updatePassword", UpdateUserPasswordEndpoint)

export default app;
