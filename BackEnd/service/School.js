const StudentModel = require("../model/Student.js");
const Student = require("../dto/Student.js");

class School {
  static rollNumberCount = 1;
  constructor() {
    // this.students = [];
  }

  copyStudent(student) {
    return new Student(
      student.rollNumber,
      student.name,
      student.gender,
      student.address
    );
  }

  async getStudents() {
    try {
      let _students = await StudentModel.find();
      let students = [];
      for (let student of _students) {
        students.push(this.copyStudent(student));
      }
      return students;
    } catch (error) {
      return null;
    }
  }

  async getStudent(rollNumber) {
    try {
      let _student = await StudentModel.findOne({ rollNumber });
      const student = this.copyStudent(_student);
      return student;
    } catch (error) {
      return null;
    }
  }

  async addStudent(student) {
    try {
      student.setRollNumber(School.rollNumberCount++);
      await StudentModel.create(student);
      return student;
    } catch (error) {
      return null;
    }
  }

  async deleteStudent(rollNumber) {
    try {
      let _student = await StudentModel.findOne({ rollNumber });
      await StudentModel.deleteOne({ rollNumber });
      const student = this.copyStudent(_student);
      return student;
    } catch (error) {
      return null;
    }
  }

  async updateStudent(student) {
    try {
      await StudentModel.updateOne(
        { rollNumber: student.getRollNumber() },
        {
          name: student.getName(),
          gender: student.getGender(),
          address: student.getAddress(),
        }
      );
      return student;
    } catch (error) {
      throw error;
      // return null;
    }
  }
}
module.exports = School;
