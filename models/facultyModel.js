const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  name: String,
  employeeCode: String,
},{
    timestamps: true,
});

module.exports = mongoose.model("Faculty", facultySchema);
