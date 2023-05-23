const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },

    image: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Please include a user"],
    },

    hostId: {
      type: Schema.Types.ObjectId,
      ref: "hosts",
      // required: [true, "Please include a host"],
    },

    placeId: {
      type: Schema.Types.ObjectId,
      ref: "places",
      // required: [true, "Please include a place"],
    },
  },

  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model("reviews", ReviewSchema);

module.exports = ReviewModel;
