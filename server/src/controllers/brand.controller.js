const path = require("path");
const fs = require("fs");
const { Brand } = require("../models/brand.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");

let CreateBrandHandler = asyncWrapper(async (req, res, next) => {
    const { name, description, isActive } = req.body;
    if (!name || !description || !isActive) {
        return next(new AppError("some data is missed", 400));
    }
    const existing = await Brand.findOne({ name });
    if (existing) return next(new AppError("Brand already exists", 400));
    let imageUrl = null;
    if (req.file) {
        const fileName = req.file.filename;
        const folderPath = path.join("uploads", "images", "brands");
        fs.mkdirSync(folderPath, { recursive: true });
        imageUrl = `${req.protocol}://${req.get("host")}/${folderPath.replace(/\\/g, "/")}/${fileName}`;
    }
    const brand = await Brand.create({ name, description, image: imageUrl, isActive });
    res.status(201).json({ success: true, data: brand });
});

let UpdateBrandHandler = asyncWrapper(async (req, res, next) => {
    const { brandid } = req.params;
    const { name, description, isActive } = req.body;
    // Build update object dynamically
    let updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    // If a new file is uploaded
    if (req.file) {
        const fileName = req.file.filename;
        const folderPath = path.join("uploads", "images", "brands");
        fs.mkdirSync(folderPath, { recursive: true });
        updateData.image = `${req.protocol}://${req.get("host")}/${folderPath.replace(/\\/g, "/")}/${fileName}`;
    }
    const brand = await Brand.findByIdAndUpdate(brandid, updateData, {
        new: true,
        runValidators: true,
    });
    if (!brand) return next(new AppError("Brand not found", 404));
    res.status(200).json({ success: true, data: brand });
});

let DeleteBrandHandler = asyncWrapper(async (req, res, next) => {
    const { brandid } = req.params;
    const brand = await Brand.findByIdAndDelete(brandid);
    if (!brand) return next(new AppError("Brand not found", 404));
    res.status(200).json({ success: true, message: "Brand deleted successfully" });
});

let ToggleBrandStatusHandler = asyncWrapper(async (req, res, next) => {
    const { brandid } = req.params;
    const brand = await Brand.findById(brandid);
    if (!brand) return next(new AppError("Brand not found", 404));
    brand.isActive = !brand.isActive;
    await brand.save();
    res.status(200).json({ success: true, data: brand });
});

let SearchBrandHandler = asyncWrapper(async (req, res, next) => {
    const { id, q } = req.query;
    let query = {};

    if (id && mongoose.Types.ObjectId.isValid(id)) query._id = id;
    if (q) query.$or = [{ name: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];

    const brands = await Brand.find(query);
    if (!brands.length) return res.status(404).json({ success: false, message: "No brands found" });

    res.status(200).json({ success: true, results: brands.length, data: brands });
});

let GetAllBrandsHandler = asyncWrapper(async (req, res, next) => {
    const brands = await Brand.find();
    res.status(200).json({ success: true, results: brands.length, data: brands });
});

let GetBrandByIdHandler = asyncWrapper(async (req, res, next) => {
    const { brandid } = req.params;
    const brand = await Brand.findById(brandid);
    if (!brand) return next(new AppError("Brand not found", 404));
    res.status(200).json({ success: true, data: brand });
});


let GetActiveBrandsHandler = asyncWrapper(async (req, res, next) => {
    const brands = await Brand.find({ isActive: true });
    res.status(200).json({ success: true, results: brands.length, data: brands });
});




module.exports = {
    CreateBrandHandler,
    UpdateBrandHandler,
    DeleteBrandHandler,
    ToggleBrandStatusHandler,
    GetAllBrandsHandler,
    GetActiveBrandsHandler,
    GetBrandByIdHandler,
    SearchBrandHandler,
};
