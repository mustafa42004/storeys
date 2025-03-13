// importing utils modules
const ApiFeature = require("../utils/ApiFeature");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

// handle get all docs function with API features
module.exports.getAllDocs = (Model, isFindUserQuery = false) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.propertyId) filter = { property: req.params.propertyId };

    const features = new ApiFeature(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .search();

    const docs = await Model.paginate(features.query, {
      page: req.query.page || 1,
      limit: req.query.limit || 50,
    });

    res
      .status(200)
      .json({ status: "success", results: docs.length, data: docs });
  });

// get a single doc function
module.exports.getDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new ApiError("Document does not exists", 404));
    }

    res.status(200).json({ status: "success", data: doc });
  });

// create doc function
module.exports.createDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({ status: "success", data: doc });
  });

// update doc function
module.exports.updateDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedDoc) {
      return next(new ApiError("Document does not exists", 404));
    }

    res.status(200).json({ status: "success", data: updatedDoc });
  });

// delete doc functions
module.exports.deleteDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new ApiError("Document does not exists", 404));
    }

    res.status(204).json({ status: "success" });
  });
