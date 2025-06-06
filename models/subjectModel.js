const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: String,
  code: String,
  semester: String,
  programName: String,
  otherProgram: String,
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }
},{
  timestamps : true,
});

module.exports = mongoose.model("Subject", subjectSchema);
