import { DataTypes } from "sequelize";
import conn from "../database/Mysql.database.js";

const userTable = conn.define("master_user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(200),
    validate: {
      isEmail: true,
    },
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(200),
    validate: {
      len: [6, 100], // Password must be between 6 and 100 characters
    },
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default userTable;