const path = require("path");
const mongoose = require("mongoose");
const slugify = require("slugify");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const { SubCategory } = require("../models/subcategory.model");
const { Brand } = require("../models/brand.model");

let createProductHandler = asyncWrapper(async (req, res, next) => {
    const {
        name,
        description,
        richDescription,
        price,
        category,
        subCategory,
        brand,
        countInStock,
        dimensions,
        variants,
        sku,
        tags 
    } = req.body;
    // Check if product with same name or SKU already exists
    const existingProduct = await Product.findOne({
        $or: [{ name }, { sku }]
    });
    if (existingProduct) {
        return next(new AppError("Product already exists", 400));
    }
    // Validate category
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
        return next(new AppError("Category not found", 404));
    }
    // Validate subCategory
    const subCategoryDoc = await SubCategory.findById(subCategory);
    if (!subCategoryDoc) {
        return next(new AppError("SubCategory not found", 404));
    }
    // Validate brand
    const brandDoc = await Brand.findById(brand);
    if (!brandDoc) {
        return next(new AppError("Brand not found", 404));
    }
    // Upload images
    let mainImageUrl = null;
    if (req.files?.mainImage && req.files.mainImage[0]) {
        const file = req.files.mainImage[0];
        mainImageUrl = `${req.protocol}://${req.get("host")}/${file.destination.replace(/\\/g, "/")}/${file.filename}`;
    }
    let galleryUrls = [];
    if (req.files?.gallery) {
        galleryUrls = req.files.gallery.map((file) => {
            return `${req.protocol}://${req.get("host")}/${file.destination.replace(/\\/g, "/")}/${file.filename}`;
        });
    }
    const product = await Product.create({
        name,
        description,
        richDescription,
        price,
        category: categoryDoc._id,
        subCategory: subCategoryDoc._id,
        brand: brandDoc._id,
        sku,
        image: mainImageUrl,
        images: galleryUrls,
        countInStock,
        dimensions,
        variants,
        slug: slugify(name, { lower: true, strict: true }),
        tags 
    });
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
    });
});

let updateProductHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    let updateData = { ...req.body };
    const existing = await Product.findById(productId);
    if (!existing) return next(new AppError("Product not found", 404));
    if (req.files?.mainImage && req.files.mainImage[0]) {
        const file = req.files.mainImage[0];
        const mainImageUrl = `${req.protocol}://${req.get("host")}/${file.destination.replace(/\\/g, "/")}/${file.filename}`;
        if (existing.image === mainImageUrl) {
            return next(new AppError("This main image already exists for this product", 400));
        }

        updateData.image = mainImageUrl;
    }
    if (req.files?.gallery) {
        const newGalleryUrls = req.files.gallery.map((file) => {
            return `${req.protocol}://${req.get("host")}/${file.destination.replace(/\\/g, "/")}/${file.filename}`;
        });
        const duplicates = newGalleryUrls.filter((url) =>
            existing.images.includes(url)
        );
        if (duplicates.length > 0) {
            return next(
                new AppError(`These gallery images already exist: ${duplicates.join(", ")}`, 400)
            );
        }

        updateData.images = [...existing.images, ...newGalleryUrls];
    }
    const product = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: product });
});

let deleteProductHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return next(new AppError("Product not found", 404));
    res.status(200).json({ success: true, message: "Product deleted successfully" });
});

let toggleProductHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));
    product.isActive = !product.isActive;
    await product.save();
    res.status(200).json({ success: true, data: product });
});

let deleteProductImageHandler = asyncWrapper(async (req, res, next) => {
    const { productId, imageIndex } = req.params;
    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));
    if (!product.images[imageIndex]) return next(new AppError("Image not found", 404));
    product.images.splice(imageIndex, 1);
    await product.save();
    res.status(200).json({ success: true, data: product });
});

let getAllProductsHandler = asyncWrapper(async (req, res) => {
    const products = await Product.find().populate("category subCategory brand");
    res.status(200).json({ success: true, count: products.length, data: products });
});

let getActiveProductsHandler = asyncWrapper(async (req, res) => {
    const products = await Product.find({ isActive: { $eq: true } })
        .populate("category subCategory brand");
    console.log(products)
    res.status(200).json({ success: true, count: products.length, data: products });
});

let searchProductsHandler = asyncWrapper(async (req, res, next) => {
    const { id, q, category, subCategory, brand } = req.query;
    let query = {};

    if (id && mongoose.Types.ObjectId.isValid(id)) {
        query._id = id;
    }
    if (q) {
        query.$or = [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { richDescription: { $regex: q, $options: "i" } }
        ];
    }
    if (category && mongoose.Types.ObjectId.isValid(category)) {
        query.category = category;
    }
    if (subCategory && mongoose.Types.ObjectId.isValid(subCategory)) {
        query.subCategory = subCategory;
    }
    if (brand && mongoose.Types.ObjectId.isValid(brand)) {
        query.brand = brand;
    }
    const products = await Product.find(query)
        .populate("category subCategory brand");
    if (!products.length) {
        return res.status(404).json({
            success: false,
            message: "No products found"
        });
    }
    res.status(200).json({
        success: true,
        results: products.length,
        data: products
    });
});

let getProductByIdHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId)
    if (!product) return next(new AppError("Product not found", 404));
    res.status(200).json({ success: true, data: product });
});

let tagsupdateProductTagHandler = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    let { tags } = req.body;
    if (!tags) {
      return next(new AppError("Tags are required", 400));
    }
    // Ensure tags is an array
    if (!Array.isArray(tags)) {
      tags = [tags];
    }
    // Normalize input to match enum
    const normalizedTags = tags.map(tag => tag.trim()).map(tag => {
      switch (tag.toLowerCase()) {
        case "newarrival":
        case "newarrivals":
          return "newArrival";
        case "topdeal":
        case "topdeals":
          return "topDeal";
        case "maxdeal":
        case "maxdeals":
          return "maxDeal";
        default:
          return tag; 
      }
    });
  
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { tags: normalizedTags } },
      { new: true, runValidators: true }
    );
  
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "Product tags updated successfully",
      data: product,
    });
  });

module.exports = {
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    toggleProductHandler,
    deleteProductImageHandler,
    getAllProductsHandler,
    getActiveProductsHandler,
    searchProductsHandler,
    getProductByIdHandler,
    tagsupdateProductTagHandler
};