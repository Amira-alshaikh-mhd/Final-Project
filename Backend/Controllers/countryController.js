const countryModel = require("../Models/countryModel");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get all countries
const getContries = async (req, res) => {
  const countries = await countryModel.find();

  res.status(200).json(countries);
};

//get by Id
const getCountryById = async (req, res) => {
  try {
    const country = await countryModel.findById(req.params.id);
    if (!country) {
      return res.status(404).send();
    }
    res.json(country);
  } catch (error) {
    res.status(500).send(error);
  }
};

const setcountry = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {
      const country = await countryModel.create({
        name: req.body.name,
        userId: req.body.userId,

        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      return res.status(200).json({ message: "country created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};



const updateCountry = async (req, res) => {
  const id  = req.params.id; 
  const  name  = req.body.name; 
  const userId = req.body.userId;
    const image = await cloudinary.uploader.upload(req.file.path);
    
  
try{
  
    const updatedCountry = await countryModel.findByIdAndUpdate(
      id,
      { name,userId,
     image: {
        public_id: image.public_id,
        url: image.secure_url,
      },},
      { new: true }
    
    );


    if (updatedCountry) {
      res.status(200).json(updatedCountry);
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};






























const deleteCountry =  async(req, res) => {
    const country =await countryModel.findById(req.params.id)

if (!country){
    res.status(400)
    throw new Error('country not found')
}
 await countryModel.deleteOne()
    res.status(200).json({id: req.params.id})
}

module.exports = {
  getContries,
  getCountryById,
  setcountry,
  updateCountry,
  deleteCountry,
};
