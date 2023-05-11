const mongoose = require("mongoose");
const { Schema, model } = mongoose;


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

      country:{
        type:Schema.Types.ObjectId,
        ref:"countries",
        required:[true, "Please include a Country"]
    }
},

    {
    timestamps: true,
    }

)


const CityModel = mongoose.model("cities", CitySchema)

module.exports = CityModel