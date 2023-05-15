const country = require("../Models/countryModel");
const cityModel = require ("../Models/cityModel")
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get all cities
const getCities = async (req, res) => {

    try {
        const cities = await cityModel.find().populate("country");
       
        res.send(cities);
      } catch (error) {
        res.status(500).send(error);
      }



};

//get by Id
const getCityById = async (req, res) => {
  try {
    const city = await cityModel.findById(req.params.id).populate("country");
    if (!city) {
      return res.status(404).send();
    }
    res.json(city);
  } catch (error) {
    res.status(500).send(error);
  }
};



const getCitiesByCountryName = async (req, res) => {
    try {
       const countryName = req.params.countryName;
       const city = await cityModel.aggregate([
         {
           $lookup: {
             from: "countries",
             localField: "country",
             foreignField: "_id",
             as: "country",
           },
         },
         {
           $unwind: "$country",
         },
         {
           $match: {
             "country.name": countryName,
           },
         },
       ]);
    
       res.status(200).json(city);
     } catch (err) {
       res.json({ message: err });
    }
}



const setCity = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {
      const city = await cityModel.create({
        name: req.body.name,
        Describtion: req.body.Describtion,
        country : req.body.country,
        // countries : await countryModel.findById(country),

        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      return res.status(200).json({ message: "city created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};





// Update city

const updateCity = async (req, res) => {
  const id  = req.params.id; 
  const  name  = req.body.name; 
  const Describtion =req.body.Describtion;
    const image = await cloudinary.uploader.upload(req.file.path);
    
  
try{
  
    const updatedCity = await cityModel.findByIdAndUpdate(
      id,
      { name,
        Describtion,
     image: {
        public_id: image.public_id,
        url: image.secure_url,
      },},
      { new: true }
    
    );


    if (updatedCity) {
      res.status(200).json(updatedCity);
    } else {
      res.status(404).json({ message: "City not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};




// Delete city

const deleteCity =  async(req, res) => {
    const city =await cityModel.findById(req.params.id)

if (!city){
    res.status(400)
    throw new Error('city not found')
}
 await cityModel.deleteOne();
    res.status(200).json({id: req.params.id})
}

module.exports = {
  getCities,
  getCityById,
  getCitiesByCountryName,
  setCity,
  updateCity,
  deleteCity,
};
