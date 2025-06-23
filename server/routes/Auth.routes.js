import express from 'express';
import { loginUser, refreshAccessToken } from '../controller/Auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/login', loginUser);
authRoutes.post('/refresh-token', refreshAccessToken);

export default authRoutes;