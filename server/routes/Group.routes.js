import express from "express";
import { CreateGroup, GetAllGroups, GetAllUserGroups, GetGroupDetails} from "../controller/Group.controller.js";
import { validateToken } from '../middleware/validateToken.js';

const groupRoutes = express.Router();

groupRoutes.post("/", validateToken ,CreateGroup);
groupRoutes.get("/", validateToken, GetAllGroups);
groupRoutes.get("/user/:userId", validateToken, GetAllUserGroups);
groupRoutes.get("/:groupId", validateToken, GetGroupDetails);

export default groupRoutes;