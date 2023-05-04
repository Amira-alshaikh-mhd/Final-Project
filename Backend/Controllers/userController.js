const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/usermodel');

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if email is already taken
    const emailTaken = await User.isEmailTaken(email);
    if (emailTaken) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone
    });
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }




};

  // Function to get all users
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  
  const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(500).send('Server Error');
    }
  };

  const logout = async (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie('token');
      res.status(200).json({ msg: 'Logged out successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Check if user is an admin or superadmin
      if (user.role === 'admin' || user.role === 'superadmin') {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
  
      // Remove user from database
      await user.deleteOne();
  
      res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  

module.exports = { register, login,getAllUsers,getUserById,logout,deleteUser };
