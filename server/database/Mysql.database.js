import sequilize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const conn = new sequilize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
)

export default conn;