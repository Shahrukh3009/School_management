class Student {
  constructor(rollNumber, name, gender, address) {
    this.rollNumber = rollNumber;
    this.name = name;
    this.gender = gender;
    this.address = address;
  }

  getRollNumber() {
    return this.rollNumber;
  }
  getName() {
    return this.name;
  }
  getGender() {
    return this.gender;
  }
  getAddress() {
    return this.address;
  }
  setName(name) {
    this.name = name;
  }
  setGender(gender) {
    this.gender = gender;
  }
  setAddress(address) {
    this.address = address;
  }
  setRollNumber(rollNumber) {
    this.rollNumber = rollNumber;
  }
}

module.exports = Student;
