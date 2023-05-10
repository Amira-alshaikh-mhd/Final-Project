const mongoose = require("mongoose");

const CitySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Describtion:{
        type:String,
        required:true,

    },
   
    image: {
        public_id:{
           type: String,
           required: true,
        },
        url:{
           type: String,
           required: true,
        }
      },
},

    {
    timestamps: true,
    }

)


const CityModel = mongoose.model("cities", CitySchema)

module.exports = CityModel