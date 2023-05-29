const reviewModel = require("../Models/reviewModel");
const cityModel = require ("../Models/cityModel")
const typeModel = require ("../Models/typeModel")
const cloudinary = require("cloudinary").v2;
const path = require("path");
const ReviewModel = require("../Models/reviewModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// get all 
const getReviews = async (req, res) => {

    try {
        const Reviews = await reviewModel.find().populate("userId");
       
        res.send(Reviews);
      } catch (error) {
        res.status(500).send(error);
      }



};

//get by Id
const getReviewById = async (req, res) => {
  try {
    const Review = await reviewModel.findById(req.params.id);
    if (!Review) {
      return res.status(404).send();
    }
    res.json(Review);
  } catch (error) {
    res.status(500).send(error);
  }
};



const getReviewByPlaceName = async (req, res) => {
  
    try{
    const {id } = req.params
    console.log(id)
  
    const review = await ReviewModel.find({ placeId: id }).populate("placeId").populate("userId");
  
    res.status(200).json(review);
    }
    catch(err){
    res.json({ message: err });
    }
    };
  
//     try {
//        const placeName = req.params.placeName;
//        const review = await reviewModel.aggregate([
//          {
//            $lookup: {
//              from: "places",
//              localField: "placeId",
//              foreignField: "_id",
//              as: "placeId",
//            },
//          },
//          {
//            $unwind: "$placeId",
//          },
//          {
//            $match: {
//              "placeId.name": placeName,
//            },
//          },
//        ]);
    
//        res.status(200).json(review);
//      } catch (err) {
//        res.json({ message: err });
//     }
// }


// get by 
const getReviewsByHostName = async (req, res) => {

  try{
    const {id } = req.params
    console.log(id)
  
    const review = await ReviewModel.find({ hostId: id }).populate("hostId").populate("userId");
  
    res.status(200).json(review);
    } 
    catch(err){
    res.json({ message: err });
    }


  // try {

  //    const hostName = req.params.hostName;
  //    const review = await reviewModel.aggregate([
  //      {
  //        $lookup: {
  //          from: "hosts",
  //          localField: "hostId",
  //          foreignField: "_id",
  //          as: "hostId",
  //        },
  //      },
  //      {
  //        $unwind: "$hostId",
  //      },
  //      {
  //        $match: {
  //          "hostId.name": hostName,
  //        },
  //      },
  //    ]);
  
  //    res.status(200).json(review);
  //  } catch (err) {
  //    res.json({ message: err });
  // }
}







const setReview = async (req, res) => {
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
      const review = await reviewModel.create({
        comment: req.body.comment,
        placeId: req.body.placeId,
        userId : req.body.userId,
        hostId : req.body.hostId,
        rating : req.body.rating,
        image: images,
        

      
      });

      return res.status(200).json({ message: "Review created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};





// Update 

const updateReview = async (req, res) => {
  const id  = req.params.id; 
  const  comment  = req.body.comment; 
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
  
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      { comment,
        rating,
        image: images,
    },
      { new: true }
    
    );


    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};




// Delete 

const deleteReview =  async(req, res) => {
    const review =await reviewModel.findByIdAndDelete(req.params.id)

if (!review){
    res.status(400)
    throw new Error('review not found')
}

    res.status(200).json({id: req.params.id})
}

module.exports = {
getReviews,
getReviewById,
getReviewByPlaceName,
getReviewsByHostName,
setReview,
updateReview,
deleteReview,
};