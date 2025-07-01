import userTable from "../model/User.model.js";
import { Op } from "sequelize";

export const GetUsers = async (req, res) => {
  try {
    const users = await userTable.findAll({
      where: { isActive: true },
      attributes: ["id", "name", "email", "lastSeen", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });

    res
      .status(200)
      .json({
        status: 200,
        data: users,
        message: "Users fetched successfully",
      });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ status: 500, data: [], message: "Internal Server Error" });
  }
};

export const GetUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res
      .status(400)
      .json({ status: 400, message: "User ID is required" });
  }

  try {
    const user = await userTable.findOne({
      where: { id: userId, isActive: true },
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, data: [], message: "User not found" });
    }

    res
      .status(200)
      .json({ status: 200, data: user, message: "User fetched successfully" });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({
        status: 500,
        data: [],
        message: error.errors[0].message || "Internal Server Error",
      });
  }
};

export const searchUserByNameOrEmail = async(req, res) => {
  try {
    const { key } = req.query;
    console.log(key);
    

    if (!key) {
      return res.status(200).json({ status: 200, data: [], message: "Search key is required" });
    }

    const users = await userTable.findAll({
      where: {
        isActive: true,
        [Op.or]: [
          { name: { [Op.like]: `%${key}%` } },
          // Match if key is part of the email username (before @) only
          { email: { [Op.like]: `%${key}%@%` } },
          // Match if key is the full email address
          { email: { [Op.eq]: key } }
        ]
      },
      attributes: ["id", "name", "email", "lastSeen", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: 200,
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({
        status: 500,
        data: [],
        message: error.errors[0].message || "Internal Server Error",
      });
  }
}

export const CreateUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "Name and email are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await userTable.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({
          status: 409,
          data: [],
          message: "User with this email already exists",
        });
    }

    const newUser = await userTable.create({ name, email, password });
    res
      .status(201)
      .json({
        status: 201,
        data: { userId: newUser.id },
        message: "User created successfully",
      });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({
        status: 500,
        data: [],
        message: error.errors[0].message || "Internal Server Error",
      });
  }
};

export const DeactivateUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res
      .status(400)
      .json({ status: 400, message: "User ID is required" });
  }

  try {
    const user = await userTable.findOne({
      where: { id: userId, isActive: true },
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, data: [], message: "User not found" });
    }

    await user.update({ isActive: false });
    res
      .status(200)
      .json({
        status: 200,
        data: [],
        message: "User deactivated successfully",
      });
  } catch (error) {
    console.error("Error deactivating user:", error);
    res
      .status(500)
      .json({
        status: 500,
        data: [],
        message: error.errors[0].message || "Internal Server Error",
      });
  }
};
