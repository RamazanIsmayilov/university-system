const { Schema, default: mongoose } = require("mongoose");

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
});

module.exports = mongoose.model("Student", studentSchema);
