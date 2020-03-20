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
import { UpdateUserDataEndpoint } from "./endpoints/User/UpdateUserData/UpdateUserDataEndPoint";

const app = express();
app.use(express.json());

// send data
app.post("/signup", SignUpEndpoint);
app.post("/login", LoginEndpoint);
app.post("/recipe", CreateRecipeEndpoint);
app.post("/user/follow", FollowUserEndpoint);

// get data
app.get("/getUser", GetUserInfoEndpoint);
app.get("/getAllUsers", GetAllUsersEndpoint);
app.get("/recipes", GetAllRecipesEndpoint);
app.get("/feed", GetRecipesForFeedEndpoint);

// update data
app.put("/user/updatePassword", UpdateUserPasswordEndpoint);
app.put("/user/updateData", UpdateUserDataEndpoint);

export default app;
