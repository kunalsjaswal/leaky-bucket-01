import express from "express";
import { CreateGroup, GetAllGroups, GetGroupDetails} from "../controller/Group.controller.js";

const groupRoutes = express.Router();

groupRoutes.post("/", CreateGroup);
groupRoutes.get("/", GetAllGroups);
groupRoutes.get("/:groupId", GetGroupDetails);

export default groupRoutes;