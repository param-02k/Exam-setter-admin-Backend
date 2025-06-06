const express = require("express")
const adminRouter = express.Router();
const {addFaculty,deleteFaculty,getAllFaculties,addSubject,deleteSubject,getAllSubjects} = require("../controller/adminController")

adminRouter.post("/addfaculty", addFaculty)

adminRouter.post("/deletefaculty", deleteFaculty)

adminRouter.get("/getallfaculty", getAllFaculties)

adminRouter.post("/addsubject", addSubject)

adminRouter.post("/deletesubject", deleteSubject)

adminRouter.get("/getallsubject", getAllSubjects)

module.exports = adminRouter