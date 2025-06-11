import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/App.routes.js';
import conn from './database/Mysql.database.js';
import mongoConnect from './database/Mongo.database.js';
import './model/User.model.js';
import './model/Group.model.js';
import './model/UserGroup.model.js';
import './model/Message.model.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware configuration
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', apiRoutes);

const startServer = async() =>{
  try{
    await conn.sync()
    console.log('MySQL database connected successfully');

    await mongoConnect()
    console.log('MongoDB database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
  catch(error){
    console.error('Error starting the server:', error);
  }
}

startServer();

