const { Schema, default: mongoose } = require("mongoose");

const facultySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Faculty", facultySchema);
