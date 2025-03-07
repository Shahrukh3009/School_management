const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/school");
const { Schema } = mongoose;
const studentSchema = new Schema({
  rollNumber: Number,
  name: String,
  gender: String,
  address: String,
});
const Student = mongoose.model("student", studentSchema);
module.exports = Student;
