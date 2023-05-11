const mongoose = require("mongoose");

const TypeSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   

},

    {
    timestamps: true,
    }

)


const TypeModel = mongoose.model("types", TypeSchema)

module.exports = TypeModel