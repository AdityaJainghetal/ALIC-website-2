const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  Seat: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],

  Semester: {
    type: Number,
  },
  Coursename: {
    type: String,
  },
  StateCourse: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Instructor: {
    type: String,
  },
  URL: {
    type: String,
  },
  Durations: {
    type: String,
  },
  Alttage: {
    type: String,
  },
  Lessons: {
    type: Number,
  },
  TotalStudent: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },

  subsubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subsubcategory",
  },
  language: {
    type: String,
  },
  Certification: {
    // Corrected the typo here
    type: String,
  },
  CourseDescription: {
    type: String,
  },
  InstructorCourse: {
    type: String,
  },
  Review: {
    type: String,
  },
  homeVisibility: { type: Boolean, default: false },
  TrainerName: {
    type: String,
  },
  LastDate: {
    // Changed to Date if it's a date field
    type: Date,
  },
});

module.exports = mongoose.model("coursedata", courseSchema);
