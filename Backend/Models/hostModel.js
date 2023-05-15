const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const HostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    Describtion: {
      type: String,
      required: true,
    },

    cityId: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: [true, "Please include a city"],
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },

  {
    timestamps: true,
  }
);

const HostModel = mongoose.model("hosts", HostSchema);

module.exports = HostModel;
