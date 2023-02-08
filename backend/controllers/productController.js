const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create new product => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  }
);

// Get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(
  async (req, res, next) => {
    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(
      Product.find(),
      req.query
    )
      .search()
      .filter()
      .pagination(resPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      productCount,
      products,
    });
  }
);

// Get single product details  => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorHandler("Product not found", 404)
      );
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);
// Update single product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(
  async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorHandler("Product not found", 404)
      );
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  }
);

// Delete single product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorHandler("Product not found", 404)
      );
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  }
);
