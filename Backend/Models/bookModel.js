const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },

    hostId: {
      type: Schema.Types.ObjectId,
      ref: "hosts",
      required: [true, "Please include a host"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Please include a user"],
    },
    
  },

  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
