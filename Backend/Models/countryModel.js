const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const CountrySchema =new mongoose.Schema({
    name:{
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


const CountryModel = mongoose.model("countries", CountrySchema)

module.exports = CountryModel