const express = require("express");
const School = require("../service/School.js");
const Student = require("../dto/Student.js");
const { connectDataBase, disconnectDataBase } = require("../dbSwitch.js");
connectDataBase();
const app = express();
const school = new School();

app.use(express.json());

app.post("/student/add", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, gender, address } = req.body;

    // Validate the input fields
    if (!name || !gender || !address) {
      return res.status(400).json({ error: "All fields (name, gender, address) are required" });
    }

    // Generate a unique roll number based on existing students
    const allStudents = await school.getStudents(); // Ensure this method exists
    const maxRollNumber = allStudents.reduce((max, student) => Math.max(max, student.rollNumber), 0);
    const rollNumber = maxRollNumber + 1;

    // Create a new Student instance
    const student = new Student(rollNumber, name, gender, address);

    // Add the student to the school
    await school.addStudent(student);

    // Send success response
    res.status(200).json({
      message: "Student Added",
      student: { rollNumber, name, gender, address },
    });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Unable to add student. Please try again later." });
  }
});


app.patch("/student/update", async (req, res) => {
  try {
    const { rollNumber, name, gender, address } = req.body;
    const student = new Student(rollNumber, name, gender, address);
    await school.updateStudent(student);
    res.status(200).send("Student Upadated");
  } catch (error) {
    res.status(400).send("Unable to Update");
  }
});

app.delete("/student/delete/:rollNumber", async (req, res) => {
  try {
    const { rollNumber } = req.params;
    await school.deleteStudent(rollNumber);
    res.status(200).send("student deleted Succesfully!");
  } catch (error) {
    res.status(400).send("Not able to delete student try again later");
  }
});

app.get("/student/:rollNumber", async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;
    let student = await school.getStudent(rollNumber);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).send("try again later");
  }
});
app.get("/students", async (req, res) => {
  try {
    let students = await school.getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).send("try again later");
  }
});

app.listen(8000, () => {
  console.log("Server Started on port 8000.");
});
