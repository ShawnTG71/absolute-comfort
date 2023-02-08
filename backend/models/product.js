const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [
      200,
      "Product name cannot exceed 200 characters",
    ],
  },
  inventoryId: {
    type: String,
    required: [true, "Please enter product item ID"],
  },
  price: {
    type: Number,
    required: [true, "Please enter valid price"],
    maxLength: [
      20,
      "Product price cannot exceed 20 characters",
    ],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },

  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "Please select category for this product",
    ],
    enum: {
      values: [
        "Air Conditioning Units",
        "Air Conditioning Unit - Misc Parts",
        "Brackets",
        "Cleaning Products",
        "Compressors & Pumps",
        "Ducts & Panels",
        "Filters",
        "Fittings",
        "Grilles",
        "Insulation",
        "Line Driers",
        "Motors",
        "Pipes",
        "Refrigerants",
        "Thermostats",
        "Tools",
        "Wires",
        "Other",
      ],
      message: "Please select correct category for product",
    },
  },
  brand: {
    type: String,
    required: [true, "Please enter product brand"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [
      7,
      "Product number cannot exceed 7 characters",
    ],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
