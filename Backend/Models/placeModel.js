const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const PlaceSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Describtion:{
        type:String,

    },
    Address:{
        type:String,
    },
   
    image: [{
        public_id:{
           type: String,
           
        },
        url:{
           type: String,
           
        }
      }],

      cityId:{
        type:Schema.Types.ObjectId,
        ref:"cities",
        required:[true, "Please include a City"]
    },

    typeId:{
        type:Schema.Types.ObjectId,
        ref:"types",
        required:[true, "Please include a Type"]
    },

    rating: {
        type: Number,
        default: 0,
      },

},

    {
    timestamps: true,
    }

)


const PlaceModel = mongoose.model("places", PlaceSchema)

module.exports = PlaceModel