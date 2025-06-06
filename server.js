const express = require("express")
const adminRouter = require("./routes/adminRoutes")
const server = require("./app")

server.use(express.json())
server.use(adminRouter)