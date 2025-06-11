import express from 'express';
import { addMessage, getMessages } from '../controller/Chat.controller.js';

const chatRoutes = express.Router();

chatRoutes.post("/", addMessage);
chatRoutes.get("/:groupId", getMessages);

export default chatRoutes;