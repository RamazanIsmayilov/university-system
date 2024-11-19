const Faculty = require("../models/faculty.models");
const University = require("../models/university.models");
const Student = require("../models/student.models");

exports.getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("students", "name surname age -_id");
    res.status(200).json({ data: faculties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching faculties", error: error.message });
  }
};

exports.singleFaculty = async (req, res) => {
  try {
    const singleFaculty = await Faculty.findById(req.params.id).populate("students", "name surname age -_id");
    res.status(200).json({ data: singleFaculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching faculties", error: error.message });
  }
};

exports.createFaculty = async (req, res) => {
  try {
    const { title, universityId } = req.body;
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    
    const newFaculty = new Faculty({title});
    await newFaculty.save();
    university.faculty.push(newFaculty._id);
    await university.save();
    res
      .status(201)
      .json({ message: "Faculty added successfully", data: newFaculty });
  } catch (error) {
    console.log(error.message);
    
    res
      .status(500)
      .json({ message: "Error adding faculty", error: error.message });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res
      .status(200)
      .json({ message: "Faculty updated successfully", data: updatedFaculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating faculty", error: error.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    await University.updateMany({ faculty: req.params.id }, { $pull: { faculty: req.params.id } });
    await Student.updateMany({ faculty: req.params.id }, { $pull: { faculty: req.params.id } });
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting faculty", error: error.message });
  }
};
