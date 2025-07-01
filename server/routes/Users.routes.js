import express from "express";
import { CreateUser, GetUsers, GetUser, DeactivateUser, searchUserByNameOrEmail } from "../controller/Users.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const userRoutes = express.Router();

userRoutes.get('/search', validateToken, searchUserByNameOrEmail);
userRoutes.get("/", validateToken, GetUsers);
userRoutes.post("/", CreateUser);
userRoutes.get("/:id", validateToken, GetUser);
userRoutes.put("/:id", validateToken, DeactivateUser);

export default userRoutes;