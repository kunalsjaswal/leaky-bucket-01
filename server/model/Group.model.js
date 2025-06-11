import { DataTypes } from "sequelize";
import conn from "../database/Mysql.database.js";
import userTable from "./User.model.js";

const groupTable = conn.define("master_group", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    isActive: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userTable, 
            key: 'id',
        },
        defaultValue: 1,
    },
});

export default groupTable;