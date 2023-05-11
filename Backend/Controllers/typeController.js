const typeModel = require("../Models/typeModel");



// get all types
const getTypes = async (req, res) => {
  const types = await typeModel.find();

  res.status(200).json(types);
};

//get by Id
const getTypeById = async (req, res) => {
  try {
    const type = await typeModel.findById(req.params.id);
    if (!type) {
      return res.status(404).send();
    }
    res.json(type);
  } catch (error) {
    res.status(500).send(error);
  }
};

const setType = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({ message: "Error" });
    } else {
      const type = await typeModel.create({
        name: req.body.name,

      });

      return res.status(200).json({ message: "Type created successfully" });
    }
  } catch (err) {
    console.log("error ", err);
  }
};



const updateType = async (req, res) => {
  const id  = req.params.id; 
  const  name  = req.body.name; 

    
  
try{
  
    const updatedType = await typeModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    
    );


    if (updatedType) {
      res.status(200).json(updatedType);
    } else {
      res.status(404).json({ message: "Type not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};




const deleteType =  async(req, res) => {
    const type =await typeModel.findById(req.params.id)

if (!type){
    res.status(400)
    throw new Error('type not found')
}
 await typeModel.deleteOne({ _id: req.params.id })
    res.status(200).json({id: req.params.id})
}



module.exports = {
  getTypes,
  getTypeById,
  setType,
  updateType,
  deleteType,
};