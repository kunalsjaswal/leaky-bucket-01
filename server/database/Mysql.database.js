import sequilize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const conn = new sequilize( {
  database: process.env.DB_NAME,
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

export default conn;