const UserModel = require("../Module/QueryModule");
const Course = require("../Module/Coursemodule");
const imagekit = require("../Utils/imageKit");

const Querysave = async (req, res) => {
  const { Name, Phone, State, Medium, message } = req.body;

  try {
    const User = await UserModel.create({
      Name: Name,
      Phone: Phone,
      State: State,
      Medium: Medium,
      message: message,
    });

    res.status(200).send("user succesfully registered!");
  } catch (error) {
    console.log(error);
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const data = await UserModel.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Query not found." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching query:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: "Failed to update course", error: err });
  }
};
const getAllQuery = async (req, res) => {
  try {
    const products = await UserModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const CourseSave = async (req, res) => {
  try {
    const {
      Seat,
      Semester,
      Coursename,
      StateCourse,
      Price,
      Instructor,
      Durations,
      Lessons,
      URL,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      Alttage,
      subCategory,
      subsubCategory,
      TrainerName,
      LastDate,
      size,
      category,
    } = req.body;

    // if (!Coursename || !category) {
    //   return res.status(400).json({ error: "Course name and category are required" });
    // }

    let parsedSize;
    try {
      parsedSize = typeof size === "string" ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: "Invalid size format" });
    }

    const uploadedImages = [];
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

      for (let file of files) {
        const buffer = file.data;
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate)) {
      return res.status(400).json({ error: "Invalid LastDate format" });
    }

    // NOTE: Adjust the following lines based on your actual category model if needed
    const course = await Course.create({
      Seat,
      Semester,
      Coursename,
      StateCourse,
      Price,
      Instructor,
      Durations,
      Lessons,
      URL,
      Alttage,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      TrainerName,
      LastDate: parsedLastDate,
      size: parsedSize,
      category,
      subCategory,
      subsubCategory,
      images: uploadedImages,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CourseSave error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const CourseDelete = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);

  res.status(200).send("Task deleted");
};

const QueryDelete = async (req, res) => {
  const { id } = req.params;
  await UserModel.findByIdAndDelete(id);

  res.status(200).send("Task deleted");
};

const getAllCourse = async (req, res) => {
  try {
    const products = await Course.find({ homeVisibility: true })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

// const getAllCoursedisplay = async (req, res) => {

//     try {
//         const productsall = await Course.find().populate("category");
//         res.status(200).json(productsall);
//     } catch (error) {
//         console.error("Error fetching products:", error); // Check your server logs!
//         res.status(500).json({ message: error.message });
//     }

// };

const getAllCoursedisplay = async (req, res) => {
  try {
    const productsall = await Course.find()
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory"); // Add this line to populate subcategory

    res.status(200).json(productsall);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllCourseHome = async (req, res) => {
  try {
    const product = await Course.find({ homeVisibility: true })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getsubcategory = async (req, res) => {
  try {
    const { id } = req.params.id;
    console.log("Fetching courses for subsubCategory ID:", id);

    const courses = await Course.find({ subsubCategory: id })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    console.log("Courses found:", courses);
    // console.log("Courses subsubCategory:", subsubCategory);

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by subCategory ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getproducthome = async (req, res) => {
  const { homeVisibility } = req.body;

  // Create a new variable to toggle
  const newHomeVisibility = homeVisibility;

  try {
    console.log(homeVisibility, "sdafsa");
    const updatedProduct = await Course.findByIdAndUpdate(
      req.params.id,
      { homeVisibility: homeVisibility },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating home visibility" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Course.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
// const getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate("category");
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     res.status(200).json(course);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

const getCourseById = async (req, res) => {
  try {
    // Validate the ID parameter
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await Course.findById(req.params.id)
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory"); // Add subcategory population

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Optional: Format the response data
    const responseData = {
      ...course._doc,
      category: course.category || null,
      subCategory: course.subCategory || null,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// Get related courses by category
// const getCoursesByCategory = async (req, res) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({ message: "Category ID is required" });
//     }

//     const courses = await Course.find({ category });
//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// courseController.js

const getCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  Querysave,
  CourseSave,
  getAllCourse,
  CourseDelete,
  getAllQuery,
  QueryDelete,
  getProductById,
  getCourseById,
  getCoursesByCategory,
  editDisplay,
  editDataSave,
  getAllCourseHome,
  getproducthome,
  getAllCoursedisplay,
  getsubcategory,
};
