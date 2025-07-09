// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Save,
//   X,
//   Tag,
//   Upload,
//   CheckCircle,
// } from "lucide-react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const SubsubCategoryManagement = () => {

//   const [editName, setEditName] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [editImageFiles, setEditImageFiles] = useState([]);
//   const [editImagePreviews, setEditImagePreviews] = useState([]);

// const handleEditImageChange = (e) => {
//   const files = Array.from(e.target.files);

//   if (files.length > 5) {
//     toast.error("You can upload a maximum of 1 images");
//     return;
//   }

//   setEditImageFiles(files.slice(0, 5)); // Replace old files

//   const newPreviews = [];
//   let loadedCount = 0;

//   files.slice(0, 5).forEach((file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       newPreviews.push(e.target.result);
//       loadedCount++;
//       if (loadedCount === files.slice(0, 5).length) {
//         setEditImagePreviews(newPreviews); // Replace old previews
//       }
//     };
//     reader.readAsDataURL(file);
//   });
// };

//   const removeImage = (index) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const removeEditImage = (index) => {
//     setEditImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setEditImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleaddSubsubCategory = async () => {
//     if (!newSubCategory.trim() || !selectedCategory) {
//       toast.warning("Please select a category and enter a sub-category name");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", newSubCategory.trim());
//       formData.append("subCategory", selectedCategory);
//       imageFiles.forEach((file) => formData.append("images", file));

//       const response = await axios.post(
//         "https://alic-website-2-1.onrender.com/subsubcategory",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const newSubCategoryObj = response.data;
//       setSubCategories([...subCategories, newSubCategoryObj]);
//       setNewSubCategory("");
//       setImageFiles([]);
//       setImagePreviews([]);

//       toast.success("Sub-category added successfully!");
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       toast.error("Failed to add sub-category. Please try again.");
//     }
//   };

//   const handleEditSubCategory = (subCategory) => {
//     setEditingSubCategory(subCategory._id);
//     setEditName(subCategory.name);
//     setEditImageFiles([]);
//     setEditImagePreviews([]);
//   };

//   const handleSaveEdit = async (id) => {
//     if (!editName.trim()) {
//       toast.warning("Sub-category name cannot be empty");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", editName.trim());
//       editImageFiles.forEach((file) => formData.append("images", file));

//       const response = await axios.put(
//         `https://alic-website-2-1.onrender.com/subsubcategory/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const updatedSubCategory = response.data;
//       setSubCategories(
//         subCategories.map((subCat) =>
//           subCat._id === id ? updatedSubCategory : subCat
//         )
//       );

//       setEditingSubCategory(null);
//       setEditName("");
//       setEditImageFiles([]);
//       setEditImagePreviews([]);
//       toast.success("Sub-category updated successfully!");
//     } catch (error) {
//       console.error("Error updating subcategory:", error);
//       toast.error("Failed to update sub-category. Please try again.");
//     }
//   };

//   const handledeleteSubsubCategory = async (id) => {
//     try {
//       await toast.promise(deleteSubsubCategory(id), {
//         pending: "Deleting sub-category...",
//         success: "Sub-category deleted successfully!",
//         error: "Failed to delete sub-category",
//       });

//       setSubCategories(subCategories.filter((subCat) => subCat._id !== id));
//     } catch (error) {
//       console.error("Error deleting subcategory:", error);
//     }
//   };

//   const filteredSubCategories = selectedCategory
//     ? subCategories.filter((subCat) => subCat.subCategory === selectedCategory)
//     : subCategories;

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <div className="px-6 py-4 bg-primary-600 text-white flex items-center">
//         <Tag className="mr-2" size={24} />
//         <h2 className="text-xl font-bold">Sub-Category Management</h2>
//       </div>

//       <div className="p-6">
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-3 text-black">
//             Add New Sub-Category
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <div className="md:col-span-1">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="md:col-span-2 flex">
//               <input
//                 type="text"
//                 value={newSubCategory}
//                 onChange={(e) => setNewSubCategory(e.target.value)}
//                 placeholder="Enter sub-category name"
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                 onKeyDown={(e) =>
//                   e.key === "Enter" && handleaddSubsubCategory()
//                 }
//               />
//               {/* <button
//                 onClick={handleaddSubsubCategory}
//                 disabled={!newSubCategory.trim() || !selectedCategory}
//                 className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
//               >
//                 <Plus size={18} className="mr-1" />
//                 Add
//               </button> */}
//               <button
//   onClick={handleaddSubsubCategory}
//   disabled={!newSubCategory.trim() || !selectedCategory}
//   className={`px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center ${
//     !newSubCategory.trim() || !selectedCategory
//       ? "bg-gray-300 cursor-not-allowed"
//       : "bg-gray-800 "
//   }`}
// >
//   <Plus size={18} className="mr-1" />
//   Add
// </button>
//             </div>
//           </div>

//           {/* Image Upload Section */}
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Sub-Category Images
//             </label>

//             {imagePreviews.length > 0 && (
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={preview}
//                       alt={`Preview ${index + 1}`}
//                       className="h-24 w-24 object-cover rounded-md border border-gray-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Upload Button */}
//             <label
//               className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
//                 imageFiles.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <div className="flex flex-col items-center space-y-2">
//                 <Upload className="w-6 h-6 text-gray-500" />
//                 <span className="font-medium text-gray-600">
//                   Drop files or
//                   <span className="text-primary-600 underline ml-1">
//                     browse
//                   </span>
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   {imageFiles.length >= 5
//                     ? "Maximum 1 images reached"
//                     : `Upload up to 1 images (${imageFiles.length}/1)`}
//                 </span>
//               </div>
//               <input
//                 type="file"
//                 name="images"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="hidden"
//                 disabled={imageFiles.length >= 5}
//               />
//             </label>
//           </div>
//         </div>

//         {/* Sub-Categories List */}
//         <div>
//           <h3 className="text-lg font-medium mb-3">
//             Sub-Categories{" "}
//             {selectedCategory &&
//               `for ${
//                 categories.find((c) => c._id === selectedCategory)?.name || ""
//               }`}
//           </h3>

//           {loading ? (
//             <div className="text-center py-4">Loading sub-categories...</div>
//           ) : filteredSubCategories.length === 0 ? (
//             <div className="text-center py-4 text-gray-500">
//               {selectedCategory
//                 ? "No sub-categories found for this category."
//                 : "No sub-categories found."}
//             </div>
//           ) : (
//             <div className="border rounded-md overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Images
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredSubCategories.map((subCategory) => (
//                     <tr key={subCategory._id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {editingSubCategory === subCategory._id ? (
//                           <input
//                             type="text"
//                             value={editName}
//                             onChange={(e) => setEditName(e.target.value)}
//                             className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                             autoFocus
//                           />
//                         ) : (
//                           <div className="text-sm font-medium text-gray-900">
//                             {subCategory.name}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">
//                           {categories.find(
//                             (c) => c._id === subCategory.subCategory
//                           )?.name || subCategory.subCategory}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {editingSubCategory === subCategory._id ? (
//                           <div className="space-y-4">
//                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                               {/* Show new images to be uploaded */}
//                               {editImagePreviews.map((preview, index) => (
//                                 <div
//                                   key={`new-${index}`}
//                                   className="relative group"
//                                 >
//                                   <img
//                                     src={preview}
//                                     alt={`New ${index + 1}`}
//                                     className="h-16 w-16 object-cover rounded-md border border-gray-300"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => removeEditImage(index)}
//                                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
//                                   >
//                                     <X size={12} />
//                                   </button>
//                                 </div>
//                               ))}
//                             </div>
//                             <label
//                               className={`flex items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
//                                 editImageFiles.length >= 5
//                                   ? "opacity-50 cursor-not-allowed"
//                                   : ""
//                               }`}
//                             >
//                               <div className="flex flex-col items-center space-y-1">
//                                 <Upload className="w-4 h-4 text-gray-500" />
//                                 <span className="text-xs text-gray-600">
//                                   Add new images (will replace all existing)
//                                 </span>
//                                 <span className="text-xs text-gray-500">
//                                   {editImageFiles.length >= 5
//                                     ? "Maximum 5 images reached"
//                                     : `Upload up to 5 images (${editImageFiles.length}/5)`}
//                                 </span>
//                               </div>
//                               <input
//                                 type="file"
//                                 name="editImages"
//                                 accept="image/*"
//                                 multiple
//                                 onChange={handleEditImageChange}
//                                 className="hidden"
//                                 disabled={editImageFiles.length >= 5}
//                               />
//                             </label>
//                           </div>
//                         ) : (
//                           <div className="flex space-x-2">
//                             {subCategory.images
//                               ?.slice(0, 3)
//                               .map((image, index) => (
//                                 <img
//                                   key={index}
//                                   src={image}
//                                   alt={`Subcategory ${index + 1}`}
//                                   className="h-10 w-10 object-cover rounded-md border border-gray-300"
//                                 />
//                               ))}
//                             {subCategory.images?.length > 3 && (
//                               <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md border border-gray-300 text-xs">
//                                 +{subCategory.images.length - 3}
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         {editingSubCategory === subCategory._id ? (
//                           <div className="flex justify-end space-x-2">
//                             <button
//                               onClick={() => handleSaveEdit(subCategory._id)}
//                               className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
//                               title="Save"
//                             >
//                               <Save size={18} />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setEditingSubCategory(null);
//                                 setEditName("");
//                                 setEditImageFiles([]);
//                                 setEditImagePreviews([]);
//                                 toast.info("Edit cancelled");
//                               }}
//                               className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
//                               title="Cancel"
//                             >
//                               <X size={18} />
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex justify-end space-x-2">
//                             <button
//                               onClick={() => handleEditSubCategory(subCategory)}
//                               className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
//                               title="Edit"
//                             >
//                               <Edit size={18} />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handledeleteSubsubCategory(subCategory._id)
//                               }
//                               className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
//                               title="Delete"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubsubCategoryManagement;

"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Tag, Upload } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SubsubCategoryManagement = () => {
  const [newSubCategory, setNewSubCategory] = useState("");
  const [editName, setEditName] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editImagePreviews, setEditImagePreviews] = useState([]);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 1) {
      toast.error("You can upload a maximum of 1 image");
      return;
    }

    setImageFiles(files.slice(0, 1));

    const newPreviews = [];
    files.slice(0, 1).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 1) {
      toast.error("You can upload a maximum of 1 image");
      return;
    }

    setEditImageFiles(files.slice(0, 1));

    const newPreviews = [];
    files.slice(0, 1).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        setEditImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeEditImage = (index) => {
    setEditImageFiles((prev) => prev.filter((_, i) => i !== index));
    setEditImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleaddSubsubCategory = async () => {
    if (!newSubCategory.trim()) {
      toast.warning("Please enter a sub-sub-category name");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newSubCategory.trim());
      imageFiles.forEach((file) => formData.append("images", file));

      const response = await axios.post(
        "https://alic-website-2-1.onrender.com/subsubcategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newSubCategoryObj = response.data;
      setSubCategories([...subCategories, newSubCategoryObj]);
      setNewSubCategory("");
      setImageFiles([]);
      setImagePreviews([]);

      toast.success("Sub-sub-category added successfully!");
    } catch (error) {
      console.error("Error adding sub-sub-category:", error);
      toast.error("Failed to add sub-sub-category. Please try again.");
    }
  };

  const handleEditSubCategory = (subCategory) => {
    setEditingSubCategory(subCategory._id);
    setEditName(subCategory.name);
    setEditImageFiles([]);
    setEditImagePreviews([]);
  };

  const handleSaveEdit = async (id) => {
    if (!editName.trim()) {
      toast.warning("Sub-sub-category name cannot be empty");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editName.trim());
      editImageFiles.forEach((file) => formData.append("images", file));

      const response = await axios.put(
        `https://alic-website-2-1.onrender.com/subsubcategory/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedSubCategory = response.data;
      setSubCategories(
        subCategories.map((subCat) =>
          subCat._id === id ? updatedSubCategory : subCat
        )
      );

      setEditingSubCategory(null);
      setEditName("");
      setEditImageFiles([]);
      setEditImagePreviews([]);
      toast.success("Sub-sub-category updated successfully!");
    } catch (error) {
      console.error("Error updating sub-sub-category:", error);
      toast.error("Failed to update sub-sub-category. Please try again.");
    }
  };

  const handledeleteSubsubCategory = async (id) => {
    try {
      await axios.delete(
        `https://alic-website-2-1.onrender.com/subsubcategory/${id}`
      );
      setSubCategories(subCategories.filter((subCat) => subCat._id !== id));
      toast.success("Sub-sub-category deleted successfully!");
    } catch (error) {
      console.error("Error deleting sub-sub-category:", error);
      toast.error("Failed to delete sub-sub-category");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="px-6 py-4 bg-primary-600 text-white flex items-center">
        <Tag className="mr-2" size={24} />
        <h2 className="text-xl font-bold">Sub-Sub-Category Management</h2>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-black">
            Add New Sub-Sub-Category
          </h3>
          <div className="flex">
            <input
              type="text"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Enter sub-sub-category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyDown={(e) => e.key === "Enter" && handleaddSubsubCategory()}
            />
            <button
              onClick={handleaddSubsubCategory}
              disabled={!newSubCategory.trim()}
              className={`px-4 py-2 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center ${
                !newSubCategory.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-800"
              }`}
            >
              <Plus size={18} className="mr-1" />
              Add
            </button>
          </div>

          {/* Image Upload Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub-Sub-Category Image
            </label>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <label
              className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
                imageFiles.length >= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-6 h-6 text-gray-500" />
                <span className="font-medium text-gray-600">
                  Drop file or
                  <span className="text-primary-600 underline ml-1">
                    browse
                  </span>
                </span>
                <span className="text-xs text-gray-500">
                  {imageFiles.length >= 1
                    ? "Maximum 1 image reached"
                    : `Upload 1 image (${imageFiles.length}/1)`}
                </span>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                disabled={imageFiles.length >= 1}
              />
            </label>
          </div>
        </div>

        {/* Sub-Sub-Categories List */}
        <div>
          <h3 className="text-lg font-medium mb-3">Sub-Sub-Categories</h3>

          {loading ? (
            <div className="text-center py-4">
              Loading sub-sub-categories...
            </div>
          ) : subCategories.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No sub-sub-categories found.
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subCategories.map((subCategory) => (
                    <tr key={subCategory._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingSubCategory === subCategory._id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            autoFocus
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">
                            {subCategory.name}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingSubCategory === subCategory._id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {editImagePreviews.map((preview, index) => (
                                <div
                                  key={`new-${index}`}
                                  className="relative group"
                                >
                                  <img
                                    src={preview}
                                    alt={`New ${index + 1}`}
                                    className="h-16 w-16 object-cover rounded-md border border-gray-300"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeEditImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <label
                              className={`flex items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
                                editImageFiles.length >= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <div className="flex flex-col items-center space-y-1">
                                <Upload className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600">
                                  Add new image (will replace existing)
                                </span>
                              </div>
                              <input
                                type="file"
                                name="editImages"
                                accept="image/*"
                                multiple
                                onChange={handleEditImageChange}
                                className="hidden"
                                disabled={editImageFiles.length >= 1}
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            {subCategory.images?.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Sub-sub-category ${index + 1}`}
                                className="h-10 w-10 object-cover rounded-md border border-gray-300"
                              />
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingSubCategory === subCategory._id ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleSaveEdit(subCategory._id)}
                              className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                              title="Save"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingSubCategory(null);
                                setEditName("");
                                setEditImageFiles([]);
                                setEditImagePreviews([]);
                                toast.info("Edit cancelled");
                              }}
                              className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                              title="Cancel"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditSubCategory(subCategory)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handledeleteSubsubCategory(subCategory._id)
                              }
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubsubCategoryManagement;
