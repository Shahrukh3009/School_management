const mongoose = require("mongoose");

function connectDataBase() {
  // mongoose.connect("mongodb://localhost:27017/school");
  mongoose.connect('mongodb://127.0.0.1:27017/school', { useNewUrlParser: true, useUnifiedTopology: true });

}

function disconnectDataBase() {
  mongoose.connection.close();
}

module.exports ={connectDataBase,disconnectDataBase};