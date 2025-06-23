import express from 'express';
import userRoutes from './Users.routes.js';
import { healthCheck } from '../controller/App.controller.js';
import chatRoutes from './Chat.routes.js';
import groupRoutes from './Group.routes.js';
import authRoutes from './Auth.routes.js';

const apiRoutes = express.Router();

apiRoutes.get('/health', healthCheck)
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/messages', chatRoutes);
apiRoutes.use('/group', groupRoutes);
apiRoutes.use('/auth', authRoutes);

export default apiRoutes;