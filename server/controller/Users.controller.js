import userTable from "../model/User.model.js";

export const GetUsers = async (req, res) => {
  try {
    const users = await userTable.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({status: 200, data: users, message: 'Users fetched successfully'});
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching users:', error);
    res.status(500).json({ status: 500, data: [], message: 'Internal Server Error' });
  }
}

export const CreateUser = async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: 400, message: 'Name and email are required' });
  }

  try {
    const newUser = await userTable.create({ name, email, password});
    res.status(201).json({ status: 201, data: {userId: newUser.id}, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ status: 500, data: [], message: error.errors[0].message || 'Internal Server Error' });
  }
}