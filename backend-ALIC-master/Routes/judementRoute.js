const express = require("express");
const route =express.Router();
const judegementConrtoller = require("../Controller/JudementController");


route.post("/create", judegementConrtoller.judegemntcreate);
route.get("/display", judegementConrtoller.judegementdiplay);
route.get("/course/:id", judegementConrtoller.getProductById);
route.get("/course/category/:id", judegementConrtoller.getCourseById);
route.get("/editdisplay", judegementConrtoller.editDisplay);
route.put("/editsave/:id", judegementConrtoller.editDataSave);


route.delete("/:id", judegementConrtoller.RecordDelete);
















module.exports =route;