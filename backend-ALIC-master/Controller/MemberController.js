// const Banner = require("../Module/MemberModule");
// const imagekit = require("../Utils/imageKit");

// const Sucesserstudent = async (req, res) => {
//   try {
//     const {
//        Membername,
//      phone,
//      email,
//      address,
//      desciption,
//       Teamposition,
//       size,

//     } = req.body;

//     const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;

//     // Handle image uploads
//     const uploadedImages = [];
//     const files = Array.isArray(req.files?.images)
//       ? req.files.images
//       : [req.files?.images].filter(Boolean); // Ensure single file still gets handled

//     for (let file of files) {
//       const buffer = file.data;
//       const uploadResponse = await imagekit.upload({
//         file: buffer,
//         fileName: file.name,
//       });
//       uploadedImages.push(uploadResponse.url);
//     }


//     const banner = await Banner.create({
//        Membername,
//       Teamposition,
//       phone,
//       email,
//       address,
//       desciption,
//       images: uploadedImages,
//       size: parsedSize
//     });

//     res.status(201).json(banner);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };


// const Successerdisplay = async (req, res) => {
//     try {
//         const products = await Banner.find();
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// const StoryDelete = async(req, res)=>{

//      const {id} = req.params;
//    await Banner.findByIdAndDelete(id);

//     res.status(200).send("Task deleted")
// }


// const getMemberById = async (req, res) => {
//   try {
//     const product = await Banner.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const editDisplay = async (req, res) => {
//   try {
//     const { id } = req.query;
//     if (!id) return res.status(400).json({ message: "ID is required." });

//     const record = await Banner.findById(id);
//     if (!record) return res.status(404).json({ message: "Record not found." });

//     res.status(200).json(record);
//   } catch (error) {
//     console.error("Error fetching record for edit:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const editDataSave = async (req, res) => {
//   try {
//     // Check if req.body exists
//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Request body is missing or empty." 
//       });
//     }

//     // Destructure the required fields
//     const { 
//       id,
//       Membername,
//       Teamposition,
//       phone,
//       email,
//       address,
//       desciption,
//       size
//     } = req.body;

//     // Validate required fields
//     if (!id) {
//       return res.status(400).json({ 
//         success: false,
//         message: "ID is required." 
//       });
//     }

//     if (!Membername || !Teamposition) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Member name and position are required." 
//       });
//     }

//     // Prepare update data
//     const updateData = {
//       Membername,
//       Teamposition,
//       phone: phone || "",
//       email: email || "",
//       address: address || "",
//       desciption: desciption || "",
//       size: size || {}
//     };

//     // Handle image upload if a new image is provided
//     if (req.files?.images) {
//       const file = req.files.images;
//       const buffer = file.data;
//       const uploadResponse = await imagekit.upload({
//         file: buffer,
//         fileName: file.name,
//       });
//       updateData.images = [uploadResponse.url];
//     }

//     // Update the record in the database
//     const updatedRecord = await Banner.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true } // Return the updated document
//     );

//     if (!updatedRecord) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Member not found." 
//       });
//     }

//     // Success response
//     res.status(200).json({ 
//       success: true,
//       message: "Member updated successfully.",
//       data: updatedRecord 
//     });

//   } catch (error) {
//     console.error("Error updating member:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Internal server error.",
//       error: error.message 
//     });
//   }
// };

// module.exports = {
//   Sucesserstudent,
//   Successerdisplay,
//   StoryDelete,
//   getMemberById,
//   editDisplay,
//   editDataSave
// };








const Banner = require("../Module/MemberModule");
const imagekit = require("../Utils/imageKit");

const Sucesserstudent = async (req, res) => {
  try {
    const {
      Membername,
      phone,
      email,
      address,
      desciption,
      Teamposition,
      size,
      altText
    } = req.body;

    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;

    // Handle image uploads
    const uploadedImages = [];
    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean);

    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }

    const banner = await Banner.create({
      Membername,
      Teamposition,
      phone,
      email,
      address,
      desciption,
      altText,
      images: uploadedImages,
      size: parsedSize
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const Successerdisplay = async (req, res) => {
  try {
    const products = await Banner.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const StoryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const product = await Banner.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Banner.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found." });

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const files = req.files;

    // Find existing member
    const existingMember = await Banner.findById(id);
    if (!existingMember) {
      return res.status(404).json({ message: "Member not found." });
    }

    // Prepare update data
    const updateData = {
      Membername: formData.Membername || existingMember.Membername,
      Teamposition: formData.Teamposition || existingMember.Teamposition,
      phone: formData.phone || existingMember.phone,
      email: formData.email || existingMember.email,
      address: formData.address || existingMember.address,
      desciption: formData.desciption || existingMember.desciption,
      altText : formData.altText || existingMember.altText,
      images: existingMember.images, // Keep existing images by default
      size: formData.size ? JSON.parse(formData.size) : existingMember.size
    };

    // Handle image upload if new images are provided
    if (files && files.images) {
      const uploadedImages = [];
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      
      for (let file of imageFiles) {
        const uploadResponse = await imagekit.upload({
          file: file.data,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }

      // Combine new images with existing ones (or replace based on your requirement)
      updateData.images = [...existingMember.images, ...uploadedImages];
    }

    const updatedRecord = await Banner.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Member updated successfully.",
      data: updatedRecord
    });

  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  Sucesserstudent,
  Successerdisplay,
  StoryDelete,
  getMemberById,
  editDisplay,
  editDataSave
};