const School = require("../School.js");
const Student = require("../dto/Student.js");
const mongoose = require("mongoose");
async function addStudent() {
  const school = new School();
  console.log("Testing addStudent function");
  await school.addStudent(new Student(0, "Vaibhav Kapure", "M", "pune"));

  await school.addStudent(new Student(0, "Hemant Ingle", "M", "Mp"));

  await school.addStudent(new Student(0, "Rohit Uchit", "M", "surat"));

  await school.addStudent(new Student(0, "Rohini kele", "F", "Aurangabad"));
  console.log("Added students", await school.getStudents());
  mongoose.connection.close();
}

addStudent().then(
  () => {
    console.log("Test Completed");
  },
  () => {
    console.log("Test Failed");
  }
);
