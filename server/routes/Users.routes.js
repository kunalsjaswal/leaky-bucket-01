import express from "express";
import { CreateUser, GetUsers, GetUser, DeactivateUser} from "../controller/Users.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", GetUsers);
userRoutes.post("/", CreateUser);
userRoutes.get("/:id", GetUser);
userRoutes.put("/:id", DeactivateUser);

export default userRoutes;