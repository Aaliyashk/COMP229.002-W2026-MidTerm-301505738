let BookModel = require('../models/books');

// GET ONE BOOK
module.exports.getBook = async function (req, res, next) {
  try {
    let book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
        data: null
      });
    }

    let obj = book.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    res.json({
      success: true,
      message: "Book retrieved successfully.",
      data: obj
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


// CREATE BOOK
module.exports.create = async function (req, res, next) {
  try {
    let result = await BookModel.create(req.body);

    let obj = result.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    res.json({
      success: true,
      message: "Book created successfully.",
      data: obj
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


// GET ALL BOOKS
module.exports.getAll = async function (req, res, next) {
  try {
    let list = await BookModel.find();

    let formattedList = list.map(book => {
      let obj = book.toObject();
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;
      return obj;
    });

    res.json({
      success: true,
      message: "Book list retrieved successfully.",
      data: formattedList
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


// UPDATE BOOK
module.exports.update = async function (req, res, next) {
  try {
    let updated = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

    res.json({
      success: true,
      message: "Book updated successfully."
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


// DELETE BOOK
module.exports.remove = async function (req, res, next) {
  try {
    let result = await BookModel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

    res.json({
      success: true,
      message: "Book deleted successfully."
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};