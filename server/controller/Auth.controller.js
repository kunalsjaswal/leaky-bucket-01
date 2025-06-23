import jwt from "jsonwebtoken";
import userTable from "../model/User.model.js";

export const generateToken = async (user) => {
  return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "45m",
  });
};

export const generateRefreshToken = async (user) => {
  const resfreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return resfreshToken;
};

export const generateTokens = async (user) => {
  const userData = { id: user.id, name: user.name, email: user.email };

  const accessToken = await generateToken(userData);
  const refreshToken = await generateRefreshToken(userData);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token not found." });
    }
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          res.status(403).json({ message: "Invalid refresh token" });
        }
  
        const userData = { id: user.id, name: user.name, email: user.email };
        const newToken = await generateToken(userData);
  
        res.status(200).json({
          status: 200,
          data: { accessToken: newToken },
          message: "Access token refreshed successfully",
        });
      }
    );

  } catch (error) {
    console.error("Error refreshing access token:", error);

    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Email and password are required." });
    }

    const user = await userTable.findOne({
      where: { email, password, isActive: true },
      attributes: ["id", "name", "email"]
    });
    if (!user || user.length === 0) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid Credentials." });
    }

    const tokens = await generateTokens(user);

    res.status(200).json({
      status: 200,
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
