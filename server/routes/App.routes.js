import express from 'express';
import userRoutes from './Users.routes.js';
import { healthCheck } from '../controller/App.controller.js';

const apiRoutes = express.Router();

apiRoutes.get('/health', healthCheck)
apiRoutes.use('/users', userRoutes);

export default apiRoutes;