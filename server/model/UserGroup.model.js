import { DataTypes } from "sequelize";
import conn from "../database/Mysql.database.js";
import userTable from "./User.model.js";
import groupTable from "./Group.model.js";

const userGroupTable = conn.define("master_user_group", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userTable, // Reference to the user table
            key: 'id',
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: groupTable, // Reference to the group table
            key: 'id',
        },
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
});

export default userGroupTable;