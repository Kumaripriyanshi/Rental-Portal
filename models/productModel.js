import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
    },

    bedcount: {
      type: Number,
      required: true,
    },
    bathcount: {
      type: Number,
      required: true,
    },
    nearby: {
      type: String,
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      default: 0,
    },
    seller: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
