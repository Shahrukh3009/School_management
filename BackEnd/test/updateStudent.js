const School = require("../School.js");
const Student = require("../dto/Student.js");
const mongoose = require("mongoose");
async function updateStudent() {
  const school = new School();
  console.log("Testing updateStudent function");
  await school.updateStudent(
    new Student(1, "Vaibhav Kapure", "M", "Aurangabad")
  );
  console.log("Student details after update : ", await school.getStudent(1));
  mongoose.connection.close();
}

updateStudent().then(
  () => {
    console.log("Test Completed");
  },
  () => {
    console.log("Test Failed");
  }
);



