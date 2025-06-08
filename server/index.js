import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/App.routes.js';
import conn from './database/Mysql.database.js';
import './model/User.model.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware configuration
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', apiRoutes);

conn.sync()
.then(() => app.listen(PORT, () => {
  console.log(`Database connected and server is running on http://localhost:${PORT}`);
}))
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});

