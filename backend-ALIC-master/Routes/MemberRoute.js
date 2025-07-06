const express = require("express");
const route =express.Router();
const QueryController = require("../Controller/MemberController");


route.post("/create", QueryController.Sucesserstudent);
route.get("/display", QueryController.Successerdisplay);
route.delete("/:id", QueryController. StoryDelete);
route.get("/editdisplay", QueryController.editDisplay);
route.put("/editsave/:id", QueryController.editDataSave);
route.get("/:id", QueryController.getMemberById);





module.exports =route;