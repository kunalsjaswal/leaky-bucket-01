import express from 'express';
import userRoutes from './Users.routes.js';

const apiRoutes = express.Router();

apiRoutes.use('/users', userRoutes);

export default apiRoutes;