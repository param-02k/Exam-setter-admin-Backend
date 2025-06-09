const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  name: {type : String, required : true},
  employeeCode: {type : String, required : true, unique : true},
  password : {type : String, required : true}
},{
    timestamps: true,
});

module.exports = mongoose.model("Faculty", facultySchema);
