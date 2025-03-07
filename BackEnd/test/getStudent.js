const School = require("../School.js");
const Student = require("../dto/Student.js");
const mongoose = require("mongoose");
async function getStudent() {
  const school = new School();
  console.log("Testing getStudent function");
  console.log("Roll Number 0 :", await school.getStudent(0));
  console.log("Roll Number 1 :", await school.getStudent(1));
  console.log("Roll Number 2 :", await school.getStudent(2));
  console.log("Roll Number 3 :", await school.getStudent(3));
  console.log("Roll Number 4 :", await school.getStudent(4));
  console.log("Roll Number 5 :", await school.getStudent(5));
  mongoose.connection.close();
}

getStudent().then(
  () => {
    console.log("Test Completed");
  },
  () => {
    console.log("Test Failed");
  }
);


