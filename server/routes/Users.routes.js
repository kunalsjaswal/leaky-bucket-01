import express from "express";
import { CreateUser, GetUsers } from "../controller/Users.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", GetUsers);
userRoutes.post("/", CreateUser);

export default userRoutes;