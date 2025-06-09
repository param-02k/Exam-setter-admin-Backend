const Faculty = require('../models/facultyModel');
const Subject = require('../models/subjectModel');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
// const secretKey = ""

// const registerFaculty = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existing = await Faculty.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Faculty already registered" });
//     }ww

//     const faculty = Faculty({ email, password });
//     await faculty.save();

//     res.status(201).json({ message: "Faculty registered successfully", facultyId: faculty._id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const loginFaculty = async (req, res) => {
  try {
    const {employeeCode, password } = req.body;

    if (!employeeCode || !password) {
      return res.status(400).json({ message: "Both employee code and password are required" });
    }

    const faculty = await Faculty.findOne({ employeeCode });
    if (!faculty) {
      return res.status(400).json({ message: "Invalid employee code" });
    }
    console.log(faculty);
    
    
    if (!faculty.password) {
       console.log(faculty.password);
      return res.status(500).json({ message: "This faculty account has no password set" });
    }

      const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ facultyId: faculty._id }, "exam", { expiresIn: "1d" });

    res.json({ message: "Login successful",token, faculty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addFaculty = async (req, res) => {
  try {
    const { name, employeeCode, password } = req.body;

     if (!name || !employeeCode || !password) {
      return res.status(400).json({ message: "Name, employee code, and password are required" });
    }

    const existing = await Faculty.findOne({ employeeCode });
    if (existing) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new Faculty({
      name,
      employeeCode,
      password: hashedPassword,
    });
    // const faculty = new Faculty({ name, employeeCode, password });
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
    
    console.log(facultyId);
    
    const faculty = await Faculty.findById(facultyId);
    console.log("Assigning FacultyId:", faculty);
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

const assignFacultyToSubject = async (req, res) => {
  try {
    const { subjectId, facultyId } = req.body;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    await Subject.findByIdAndUpdate(subjectId, { facultyId });
    res.json({ message: "Faculty assigned to subject successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {loginFaculty,addFaculty,deleteFaculty,getAllFaculties,addSubject,deleteSubject,getAllSubjects,assignFacultyToSubject}
