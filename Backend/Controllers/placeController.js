const PlaceModel = require("../Models/placeModel");
const cityModel = require ("../Models/cityModel")
const typeModel = require ("../Models/typeModel")
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get all places
const getPlaces = async (req, res) => {

    try {
        const places = await PlaceModel.find().populate("cityId").populate("typeId");
       
        res.send(places);
      } catch (error) {
        res.status(500).send(error);
      }



};

//get by Id
const getPlaceById = async (req, res) => {
  try {
    const place = await PlaceModel.findById(req.params.id).populate("cityId").populate("typeId");
    if (!place) {
      return res.status(404).send();
    }
    res.json(place);
  } catch (error) {
    res.status(500).send(error);
  }
};



const getPlacesByCityName = async (req, res) => {
    try {
       const cityName = req.params.cityName;
       const place = await PlaceModel.aggregate([
         {
           $lookup: {
             from: "cities",
             localField: "cityId",
             foreignField: "_id",
             as: "cityId",
           },
         },
         {
           $unwind: "$cityId",
         },
         {
           $match: {
             "cityId.name": cityName,
           },
         },
       ]);
    
       res.status(200).json(place);
     } catch (err) {
       res.json({ message: err });
    }
}


// get by Type 
const getPlacesByTypeName = async (req, res) => {
  try {
     const typeName = req.params.typeName;
     const place = await PlaceModel.aggregate([
       {
         $lookup: {
           from: "types",
           localField: "typeId",
           foreignField: "_id",
           as: "typeId",
         },
       },
       {
         $unwind: "$typeId",
       },
       {
         $match: {
           "typeId.name": typeName,
         },
       },
     ]);
  
     res.status(200).json(place);
   } catch (err) {
     res.json({ message: err });
  }
}







const setplace = async (req, res) => {
  try {

    let images = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedImage = await cloudinary.uploader.upload(req.files[i].path);
        images.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
    }
    // const result = await cloudinary.uploader.upload(req.file.path);
    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {
      const place = await PlaceModel.create({
        name: req.body.name,
        Describtion: req.body.Describtion,
        Address : req.body.Address,
        rating : req.body.rating,
        cityId : req.body.cityId,
        typeId : req.body.typeId,
        rating : req.body.rating,
        image: images,
        

      
      });

      return res.status(200).json({ message: "place created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};





// Update place

const updatePlace = async (req, res) => {
  const id  = req.params.id; 
  const  name  = req.body.name; 
  const Describtion =req.body.Describtion;
  const Address = req.body.Address;
  const rating = req.body.rating;
    // const image = await cloudinary.uploader.upload(req.file.path);
    let images = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedImage = await cloudinary.uploader.upload(req.files[i].path);
        images.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
    }
    
  
try{
  
    const updatedPlace = await PlaceModel.findByIdAndUpdate(
      id,
      { name,
        Describtion,
        Address,
        rating,
        image: images,
    },
      { new: true }
    
    );


    if (updatedPlace) {
      res.status(200).json(updatedPlace);
    } else {
      res.status(404).json({ message: "Place not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};




// Delete place

const deletePlace =  async(req, res) => {
    const place =await PlaceModel.findById(req.params.id)

if (!place){
    res.status(400)
    throw new Error('place not found')
}
 await PlaceModel.deleteOne({ _id: req.params.id });
    res.status(200).json({id: req.params.id})
}

module.exports = {
  getPlaces,
  getPlaceById,
  getPlacesByCityName,
  getPlacesByTypeName,
  setplace,
  updatePlace,
  deletePlace,
};