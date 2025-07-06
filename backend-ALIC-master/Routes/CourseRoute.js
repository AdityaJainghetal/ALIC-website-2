const express = require("express");
const route = express.Router();
const CourseController = require("../Controller/CourseController");

route.post("/course", CourseController.CourseSave);
route.get("/allcourse", CourseController.getAllCourse);

route.get("/alldisplay", CourseController.getAllCoursedisplay);

route.get("/:id", CourseController.getProductById);
route.get("/get/:id", CourseController.getsubcategory);

route.delete("/coursedelte/:id", CourseController.CourseDelete);
route.get("/courses/:id", CourseController.getCourseById);
route.get("/courses/category/:id", CourseController.getCoursesByCategory);
route.get("/editdisplay", CourseController.editDisplay);
route.put("/editsave/:id", CourseController.editDataSave);
route.post("/:id", CourseController.getAllCourseHome);
route.put("/:id/home-visibility", CourseController.getproducthome);

module.exports = route;
