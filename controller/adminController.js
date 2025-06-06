const Faculty = require('../models/facultyModel');
const Subject = require('../models/subjectModel')

const addFaculty = async (req, res) => {
  try {
    const { name, employeeCode } = req.body;
    const faculty = new Faculty({ name, employeeCode });
    await faculty.save();
    res.status(201).json({ message: "Faculty added successfully", faculty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    await Faculty.findByIdAndDelete(id);
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addSubject = async (req, res) => {
  try {
    const { name, code, semester, programName, otherProgram, facultyId } = req.body;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    const subject = Subject({
      name,
      code,
      semester,
      programName,
      otherProgram,
      facultyId
    });

    await subject.save();
    res.status(201).json({ message: "Subject added successfully", subject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await Subject.findByIdAndDelete(id);
    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("facultyId", "name employeeCode");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {addFaculty,deleteFaculty,getAllFaculties,addSubject,deleteSubject,getAllSubjects}
