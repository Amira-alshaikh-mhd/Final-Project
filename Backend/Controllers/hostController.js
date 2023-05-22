const hostModel = require("../Models/hostModel");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get all hosts
const getHosts = async (req, res) => {
  const hosts = await hostModel.find().populate("cityId");

  res.status(200).json(hosts);
};

//get by Id
const getHostById = async (req, res) => {
  try {
    const host = await hostModel.findById(req.params.id).populate("cityId");
    if (!host) {
      return res.status(404).send();
    }
    res.json(host);
  } catch (error) {
    res.status(500).send(error);
  }
};

const setHost = async (req, res) => {
  try {

    const result = await cloudinary.uploader.upload(req.file.path);
    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

      const host = await hostModel.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        Description: req.body.Description,
        price: req.body.price,
        cityId: req.body.cityId,

        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      const token = jwt.sign(
        { hostId: host._id, email: host.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token});
    }
  } catch (err) {
    console.log("error ", err);
  }
};


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const host = await hostModel.findOne({ email });
      if (!host) {
        return res.status(401).json({ message: 'Invalid ' });
      }
  
      // Check if password is correct
      const validPassword = await bcrypt.compare(password, host.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { hostId: host._id, email: host.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
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













const updateHost = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const Description = req.body.Description;
  const price = req.body.price;
  const cityId = req.body.cityId;
  const image = await cloudinary.uploader.upload(req.file.path);

  try {
    const updatedHost = await hostModel.findByIdAndUpdate(
      id,
      {
        name,phone,Description,price,cityId,email,password,
        image: {
          public_id: image.public_id,
          url: image.secure_url,
        },
      },
      { new: true }
    );

    if (updatedHost) {
      res.status(200).json(updatedHost);
    } else {
      res.status(404).json({ message: "Host not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteHost = async (req, res) => {
  const host = await hostModel.findByIdAndDelete(req.params.id);

  if (!host) {
    res.status(400);
    throw new Error("Host not found");
  }
  
  res.status(200).json({ id: req.params.id });
};

module.exports = {
getHosts,
getHostById,
setHost,
login,
logout,
updateHost,
deleteHost,
};
