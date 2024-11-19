const { Schema, default: mongoose } = require("mongoose");

const universitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  faculty: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

module.exports = mongoose.model("University", universitySchema);
