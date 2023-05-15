const bookModel = require("../Models/bookModel");

const bookingService = require('../servises/bookServices');



// get all books
const getbooks = async (req, res) => {
  const books = await bookModel.find();

  res.status(200).json(books);
};

//get by Id
const getBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id).populate("hostId").populate("userId").populate("placeId");
    if (!book) {
      return res.status(404).send();
    }
    res.json(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get by host name

const getBooksByHostName = async (req, res) => {
    try {
       const hostName = req.params.hostName;
       const book = await bookModel.aggregate([
         {
           $lookup: {
             from: "hosts",
             localField: "hostId",
             foreignField: "_id",
             as: "hostId",
           },
         },
         {
           $unwind: "$hostId",
         },
         {
           $match: {
             "hostId.name": hostName,
           },
         },
       ]);
    
       res.status(200).json(book);
     } catch (err) {
       res.json({ message: err });
    }
  }


// get by user name
  const getBooksByUserName = async (req, res) => {
    try {
       const userName = req.params.userName;
       const book = await bookModel.aggregate([
         {
           $lookup: {
             from: "users",
             localField: "userId",
             foreignField: "_id",
             as: "userId",
           },
         },
         {
           $unwind: "$userId",
         },
         {
           $match: {
             "userId.name": userName,
           },
         },
       ]);
    
       res.status(200).json(book);
     } catch (err) {
       res.json({ message: err });
    }
  }
  





const setBook = async (req, res) => {  

  try {

    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {
      const { startDate, endDate, hostId } = req.body;
      const isHostAvailable = await bookingService.checkHostAvailability(hostId, startDate, endDate);

      if (!isHostAvailable) {
        return res.status(200).json({ message: "Host is not available for the selected dates" });
      }

      const book = await bookModel.create({
        startDate,
        endDate,
        number: req.body.number,
        hostId,
        userId: req.body.userId,

      });

      return res.status(200).json({ message: "Book created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};



const updateBook = async (req, res) => {
  const id  = req.params.id; 
  const startDate = req.body.startDate;
  const  endDate = req.body.endDate;
  const  number = req.body.number;
  const  hostId = req.body.hostId;
    
    
  
try{
  
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { startDate,endDate,number,hostId },
      { new: true }
    
    );


    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};




const deleteBook =  async(req, res) => {
    const book =await bookModel.findById(req.params.id)

if (!book){
    res.status(400)
    throw new Error('book not found')
}
 await bookModel.deleteOne({ _id: req.params.id })
    res.status(200).json({id: req.params.id})
}



module.exports = {
 getbooks,
 getBookById,
 getBooksByHostName,
 getBooksByUserName,
 setBook,
 updateBook,
 deleteBook,
};