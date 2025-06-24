import express from "express";
import { CreateUser, GetUsers, GetUser, DeactivateUser} from "../controller/Users.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const userRoutes = express.Router();

userRoutes.get("/", validateToken, GetUsers);
userRoutes.post("/", validateToken, CreateUser);
userRoutes.get("/:id", validateToken, GetUser);
userRoutes.put("/:id", validateToken, DeactivateUser);

export default userRoutes;