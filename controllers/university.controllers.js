const University = require("../models/university.models");

exports.getAllUniversity = async (req, res) => {
  try {
    const allUniversities = await University.find().populate({
      path: "faculty",
      select: "title -_id",
      populate: {
        path: "students",
        select: "name surname age -_id",
      },
    });
    res.status(200).json(allUniversities);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching allUniversities",
        error: error.message,
      });
  }
};

exports.singleUniversity = async (req, res) => {
  try {
    const singleUniversity = await University.findById(req.params.id).populate({
      path: "faculty",
      select: "title -_id",
      populate: {
        path: "students",
        select: "name surname age -_id",
      },
    });
    res.status(200).json({ data: singleUniversity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching universities", error: error.message });
  }
};

exports.createUniversity = async (req, res) => {
  try {
    const newUniversity = new University(req.body);
    await newUniversity.save();
    res
      .status(201)
      .json({ message: "University added successfully", data: newUniversity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding university", error: error.message });
  }
};

exports.updateUniversity = async (req, res) => {
  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({
      message: "University updated successfully",
      data: updatedUniversity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating university", error: error.message });
  }
};

exports.deleteUniversity = async (req, res) => {
  try {
    const deletedUniversity = await University.findByIdAndDelete(req.params.id);
    if (!deletedUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting university", error: error.message });
  }
};
