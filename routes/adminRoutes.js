const express = require("express")
const adminRouter = express.Router();
const {loginFaculty,addFaculty,deleteFaculty,getAllFaculties,addSubject,deleteSubject,getAllSubjects,assignFacultyToSubject} = require("../controller/adminController")

// adminRouter.post("/registerfaculty", registerFaculty)

adminRouter.post("/loginfaculty", loginFaculty)

adminRouter.post("/addfaculty", addFaculty)

adminRouter.post("/deletefaculty", deleteFaculty)

adminRouter.get("/getallfaculty", getAllFaculties)

adminRouter.post("/addsubject", addSubject)

adminRouter.post("/deletesubject", deleteSubject)

adminRouter.get("/getallsubject", getAllSubjects)

adminRouter.post("/assignfacultytosubject", assignFacultyToSubject)

module.exports = adminRouter




// 6846f8e3b932aed729a6ddfa