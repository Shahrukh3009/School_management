const School = require("../School.js");
const mongoose = require("mongoose");
async function deleteStudent() {
  const school = new School();
  console.log("Testing deleteStudent functionality");
  await school.deleteStudent(2);
  console.log("After deleting student 2 :", await school.getStudents());
  await school.deleteStudent(1);
  console.log("After deleting student 1 :", await school.getStudents());

  mongoose.connection.close();
}
deleteStudent().then(
  () => {
    console.log("Test Completed");
  },
  () => {
    console.log("Test Failed");
  }
);
