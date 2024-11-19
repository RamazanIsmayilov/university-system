const Student = require("../models/student.models");
const University = require("../models/university.models");
const Faculty = require("../models/faculty.models");

exports.getAllStudent = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("university", "title address -_id")
      .populate("faculty", "title -_id");

    res.status(200).json({ data: students });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

exports.singleStudent = async (req, res) => {
  try {
    const singleStudent = await Student.find()
      .populate("university", "title address")
      .populate("faculty", "title");

    res.status(200).json({ data: singleStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, surname, age, universityId, facultyId } = req.body;

    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const newStudent = new Student({
      name,
      surname,
      age,
      university: universityId,
      faculty: [facultyId],
    });

    await newStudent.save();
    faculty.students.push(newStudent._id);
    await faculty.save();
    res
      .status(201)
      .json({ message: "Student added successfully", data: newStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding student", error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({ message: "Student updated successfully", data: updatedStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    await Faculty.updateMany({ students: req.params.id }, { $pull: { students: req.params.id } });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};
