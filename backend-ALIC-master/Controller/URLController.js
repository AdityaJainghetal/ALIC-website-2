// const Course = require("../Module/URLModuel"); // fixed typo in filename

// const CourseSave = async (req, res) => {
//   try {
//     const { URL } = req.body;

//     // Basic validation
//     if (!URL) {
//       return res.status(400).json({ error: "URL is required" });
//     }

//     const course = await Course.create({ URL });

//     res.status(201).json(course);
//   } catch (error) {
//     console.error('CourseSave error:', error);
//     res.status(500).json({ error: error.message || 'Internal Server Error' });
//   }
// };

// const ContactDisplay = async (req, res) => {
//     try {
//         const myData = await Course.find();
//         res.status(200).json({
//             success: true,
//             data: myData
//         });
//     } catch (error) {
//         console.error("Fetching enquiries error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch enquiries",
//             error: error.message
//         });
//     }
// };


// const URLDeleted = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const course = await Course.findByIdAndDelete(id);

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         error: "WhatsNew entry not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "WhatsNew entry deleted successfully",
//     });

//   } catch (error) {
//     console.error("WhatsNewDelete error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Internal Server Error",
//     });
//   }
// };


// const editDisplay = async (req, res) => {
//   try {
//     const { id } = req.query;
//     if (!id) return res.status(400).json({ message: "ID is required." });

//     // Remove .populate if no 'category' ref in your model
//     const record = await Course.findById(id);
//     if (!record) return res.status(404).json({ message: "Record not found." });

//     res.status(200).json(record);
//   } catch (error) {
//     console.error("Error fetching record for edit:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const editDataSave = async (req, res) => {
//   try {
//     const { id, Coursename, category } = req.body;
//     if (!id) return res.status(400).json({ message: "ID is required." });

//     let PDFbrochure = req.body.PDFbrochure; // existing PDF url (if any)
//     if (req.files?.PDFbrochure) {
//       const file = req.files.PDFbrochure;
//       const uploadResponse = await imagekit.upload({
//         file: file.data,
//         fileName: file.name,
//       });
//       PDFbrochure = uploadResponse.url;
//     }

//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       {
//         Coursename,
//         category,
//         PDFbrochure,
//       },
//       { new: true }
//     );

//     if (!updatedCourse) {
//       return res.status(404).json({ message: "Record not found." });
//     }

//     res.status(200).json({ message: "Record updated successfully", data: updatedCourse });
//   } catch (error) {
//     console.error("Error updating record:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


// module.exports = {
//   CourseSave,
//   ContactDisplay,
//   URLDeleted,
//   editDisplay,
//   editDataSave
// };







// const URLModel = require("../Module/URLModuel");

// const URLSave = async (req, res) => {
//   try {
//     const { URL } = req.body;

//     if (!URL) {
//       return res.status(400).json({ error: "URL is required" });
//     }

//     const url = await URLModel.create({ URL });
//     res.status(201).json(url);
//   } catch (error) {
//     console.error('URLSave error:', error);
//     res.status(500).json({ error: error.message || 'Internal Server Error' });
//   }
// };

// const URLDisplay = async (req, res) => {
//   try {
//     const urls = await URLModel.find();
//     res.status(200).json({
//       success: true,
//       data: urls
//     });
//   } catch (error) {
//     console.error("Fetching URLs error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch URLs",
//       error: error.message
//     });
//   }
// };

// const URLDisplayById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const url = await URLModel.findById(id);
    
//     if (!url) {
//       return res.status(404).json({ message: "URL not found" });
//     }
    
//     res.status(200).json(url);
//   } catch (error) {
//     console.error("Error fetching URL:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const URLUpdate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { URL } = req.body;

//     if (!URL) {
//       return res.status(400).json({ message: "URL is required" });
//     }

//     const updatedURL = await URLModel.findByIdAndUpdate(
//       id,
//       { URL },
//       { new: true }
//     );

//     if (!updatedURL) {
//       return res.status(404).json({ message: "URL not found" });
//     }

//     res.status(200).json({
//       message: "URL updated successfully",
//       data: updatedURL
//     });
//   } catch (error) {
//     console.error("Error updating URL:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const URLDelete = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedURL = await URLModel.findByIdAndDelete(id);

//     if (!deletedURL) {
//       return res.status(404).json({
//         success: false,
//         error: "URL not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "URL deleted successfully",
//     });
//   } catch (error) {
//     console.error("URLDelete error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Internal Server Error",
//     });
//   }
// };

// module.exports = {
//   URLSave,
//   URLDisplay,
//   URLDisplayById,
//   URLUpdate,
//   URLDelete
// };



const URLModel = require("../Module/URLModuel");

const URLSave = async (req, res) => {
    try {
        const { URL, altText } = req.body;

        if (!URL) {
            return res.status(400).json({ error: "URL is required" });
        }

        const url = await URLModel.create({ URL, altText });
        res.status(201).json(url);
    } catch (error) {
        console.error('URLSave error:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const URLDisplay = async (req, res) => {
    try {
        const urls = await URLModel.find();
        res.status(200).json({
            success: true,
            data: urls
        });
    } catch (error) {
        console.error("Fetching URLs error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch URLs",
            error: error.message
        });
    }
};

const URLDisplayById = async (req, res) => {
    try {
        const { id } = req.params;
        const url = await URLModel.findById(id);

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.status(200).json(url);
    } catch (error) {
        console.error("Error fetching URL:", error);
        res.status(500).json({ message: error.message });
    }
};

const URLUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { URL, altText } = req.body;

        if (!URL) {
            return res.status(400).json({ message: "URL is required" });
        }

        const updatedURL = await URLModel.findByIdAndUpdate(
            id,
            { URL, altText },
            { new: true }
        );

        if (!updatedURL) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.status(200).json({
            message: "URL updated successfully",
            data: updatedURL
        });
    } catch (error) {
        console.error("Error updating URL:", error);
        res.status(500).json({ message: error.message });
    }
};

const URLDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedURL = await URLModel.findByIdAndDelete(id);

        if (!deletedURL) {
            return res.status(404).json({
                success: false,
                error: "URL not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "URL deleted successfully",
        });
    } catch (error) {
        console.error("URLDelete error:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    URLSave,
    URLDisplay,
    URLDisplayById,
    URLUpdate,
    URLDelete
};