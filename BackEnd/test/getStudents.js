const School = require("../School.js");
const mongoose = require("mongoose");
async function getStudents() {
  const school = new School();
  console.log("Testing getStudents function");
  console.log(await school.getStudents());
  mongoose.connection.close();
}

getStudents().then(
  () => {
    console.log("Test Completed");
  },
  () => {
    console.log("Test Failed");
  }
);
