// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import DataTable from "react-data-table-component";
// import DOMPurify from "dompurify";
// import {
//   FiSearch,
//   FiTrash2,
//   FiEdit2,
//   FiSave,
//   FiX,
//   FiClock,
//   FiTag,
//   FiCalendar,
//   FiFileText,
//   FiImage,
// } from "react-icons/fi";
// import { FaRupeeSign } from "react-icons/fa";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const PreDisplay = () => {
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     Price: "",
//     testmodule: "",
//     Durations: "",
//     CourseDescription: "",
//     LastDate: "",
//     altText: "",
//     images: null,
//     imagePreview: "",
//   });

//   // Initialize DOMPurify
//   const sanitize = DOMPurify.sanitize;

//   useEffect(() => {
//     fetchCourses();
//     fetchCategories();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/test/display");
//       if (response.data && Array.isArray(response.data.data)) {
//         setCourses(response.data.data);
//       } else {
//         console.error(
//           "API response data is not in expected format:",
//           response.data
//         );
//         setCourses([]);
//         toast.error("Invalid course data format received from server");
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/category");
//       setCategories(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to load categories");
//     }
//   };

//   const delcourse = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this course?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:8000/test/${id}`);
//       toast.success("Course deleted successfully");
//       fetchCourses(); // Refresh the list after deletion
//     } catch (error) {
//       toast.error("Error deleting course");
//       console.error("Error deleting course:", error);
//     }
//   };

//   const startEdit = (course) => {
//     setEditId(course._id);
//     setEditForm({
//       Price: course.Price || "",
//       testmodule: course.testmodule || "",
//       Durations: course.Durations || "",
//       CourseDescription: course.CourseDescription || "",
//       altText: course.altText || "",
//       LastDate: course.LastDate ? course.LastDate.substring(0, 10) : "",
//       images: null,
//       imagePreview: course.images?.[0] || "",
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditForm((prev) => ({ ...prev, CourseDescription: data }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         // 5MB limit
//         toast.error("Image size should be less than 5MB");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditForm((prev) => ({
//           ...prev,
//           images: file,
//           imagePreview: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // const saveEdit = async () => {
//   //   if (
//   //     !editForm.testmodule ||
//   //     !editForm.Durations ||
//   //     !editForm.CourseDescription
//   //   ) {
//   //     toast.error("Please fill all required fields");
//   //     return;
//   //   }

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("Price", editForm.Price);
//   //     formData.append("testmodule", editForm.testmodule);
//   //     formData.append("Durations", editForm.Durations);
//   //     formData.append("CourseDescription", editForm.CourseDescription);
//   //     formData.append("LastDate", editForm.LastDate);
//   //     formData.append("altText", editForm.altText);
//   //     if (editForm.images) {
//   //       formData.append("images", editForm.images);
//   //     }

//   //     const response = await axios.put(
//   //       `http://localhost:8000/test/editsave/${editId}`,
//   //       formData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );

//   //     if (response.status === 200) {
//   //       toast.success("Course updated successfully");
//   //       setEditId(null);
//   //       fetchCourses();
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating course:", error);
//   //     toast.error(
//   //       error.response?.data?.message ||
//   //         "Error updating course. Please try again."
//   //     );
//   //   }
//   // };

// const saveEdit = async () => {
//   if (
//     !editForm.testmodule ||
//     !editForm.Durations ||
//     !editForm.CourseDescription ||
//     !editForm.category
//   ) {
//     toast.error("Please fill all required fields");
//     return;
//   }

//   try {
//     const formData = new FormData();
//     formData.append("Price", editForm.Price);
//     formData.append("testmodule", editForm.testmodule);
//     formData.append("Durations", editForm.Durations);
//     formData.append("CourseDescription", editForm.CourseDescription);
//     formData.append("LastDate", editForm.LastDate);
//     formData.append("altText", editForm.altText);
//     formData.append("category", editForm.category);
//     if (editForm.subCategory) formData.append("subCategory", editForm.subCategory);
//     if (editForm.subsubCategory) formData.append("subsubCategory", editForm.subsubCategory);
//     if (editForm.images) {
//       formData.append("images", editForm.images);
//     }

//     const response = await axios.put(
//       `http://localhost:8000/test/editsave/${editId}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.status === 200) {
//       toast.success("Course updated successfully");
//       setEditId(null);
//       fetchCourses();
//     }
//   } catch (error) {
//     console.error("Error updating course:", error);
//     toast.error(
//       error.response?.data?.message ||
//         "Error updating course. Please try again."
//     );
//   }
// };

//   const columns = [
//     {
//       name: "Image",
//       cell: (row) => (
//         <div className="flex items-center justify-center">
//           {row.images?.[0] ? (
//             <img
//               src={row.images[0]}
//               alt={row.altText || "Course"}
//               className="w-12 h-12 object-cover rounded-md"
//             />
//           ) : (
//             <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
//               <FiImage className="text-gray-400" />
//             </div>
//           )}
//         </div>
//       ),
//       width: "80px",
//     },
//     {
//       name: "Price",
//       selector: (row) => row.Price,
//       cell: (row) => (
//         <div className="flex items-center">
//           <FaRupeeSign className="mr-1 text-gray-500" />
//           <span>{row.Price || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Test Module",
//       selector: (row) => row.testmodule,
//       cell: (row) => (
//         <div className="font-medium text-gray-800">
//           {row.testmodule || "N/A"}
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Alt Text",
//       selector: (row) => row.altText,
//       cell: (row) => (
//         <div className="font-medium text-gray-800">{row.altText || "N/A"}</div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Duration",
//       selector: (row) => row.Durations,
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiClock className="mr-1 text-gray-500" />
//           <span>{row.Durations || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Mock/Sectional",
//       selector: (row) => row.category?.name || row.category || "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>{row.category?.name || row.category || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Judiciary",
//       selector: (row) =>
//         row.subsubCategory?.name || row.subsubCategory || "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>{row.subsubCategory?.name || row.subsubCategory || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Sub Category",
//       selector: (row) => row.subsubCategory?.subCategory || "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>{row.subsubCategory?.subCategory || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Description",
//       cell: (row) => (
//         <div className="flex items-start">
//           <FiFileText className="mr-1 text-gray-500 mt-1 flex-shrink-0" />
//           <div
//             dangerouslySetInnerHTML={{
//               __html: sanitize(row.CourseDescription || "No description"),
//             }}
//             className="prose prose-sm max-w-none"
//             style={{ maxWidth: "300px", overflowWrap: "break-word" }}
//           />
//         </div>
//       ),
//       width: "300px",
//     },
//     {
//       name: "Last Date",
//       selector: (row) =>
//         row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiCalendar className="mr-1 text-gray-500" />
//           <span>
//             {row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A"}
//           </span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => startEdit(row)}
//             className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded transition-colors"
//           >
//             <FiEdit2 size={14} />
//           </button>
//           <button
//             onClick={() => delcourse(row._id)}
//             className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm px-3 py-1 rounded transition-colors"
//           >
//             <FiTrash2 size={14} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   const filteredCourses = courses.filter((course) => {
//     if (!course) return false;
//     const searchString = searchText.toLowerCase();
//     return (
//       (course.testmodule?.toLowerCase() || "").includes(searchString) ||
//       (course.Durations?.toLowerCase() || "").includes(searchString) ||
//       (course.category?.name || course.category || "")
//         .toString()
//         .toLowerCase()
//         .includes(searchString) ||
//       (course.CourseDescription?.toLowerCase() || "").includes(searchString) ||
//       (course.altText?.toLowerCase() || "").includes(searchString)
//     );
//   });

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Course pre test
//           </h1>

//           <div className="relative w-full md:w-96">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search tests..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Pop-up Edit Form */}
//         {editId && (
//           <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     Edit Test Details
//                   </h2>
//                   <button
//                     onClick={() => setEditId(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <FiX size={20} />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Image
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
//                         {editForm.imagePreview ? (
//                           <img
//                             src={editForm.imagePreview}
//                             alt="Preview"
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center text-gray-400">
//                             <FiImage size={24} />
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <input
//                           type="file"
//                           id="image-upload"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="hidden"
//                         />
//                         <label
//                           htmlFor="image-upload"
//                           className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
//                         >
//                           Change Image
//                         </label>
//                         <p className="mt-1 text-xs text-gray-500">
//                           JPG, PNG or GIF (Max. 5MB)
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Price
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaRupeeSign className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         name="Price"
//                         value={editForm.Price}
//                         onChange={handleEditChange}
//                         className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter price"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Test Module*
//                     </label>
//                     <input
//                       type="text"
//                       name="testmodule"
//                       value={editForm.testmodule}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter test module"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duration*
//                     </label>
//                     <input
//                       type="text"
//                       name="Durations"
//                       value={editForm.Durations}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter duration"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Alt Text
//                     </label>
//                     <input
//                       type="text"
//                       name="altText"
//                       value={editForm.altText}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter alt text for image"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Date
//                     </label>
//                     <input
//                       type="date"
//                       name="LastDate"
//                       value={editForm.LastDate}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description*
//                     </label>
//                     <div className="ckeditor-container">
//                       <CKEditor
//                         editor={ClassicEditor}
//                         data={editForm.CourseDescription}
//                         onChange={handleEditorChange}
//                         config={{
//                           toolbar: [
//                             "heading",
//                             "|",
//                             "bold",
//                             "italic",
//                             "link",
//                             "bulletedList",
//                             "numberedList",
//                             "|",
//                             "blockQuote",
//                             "insertTable",
//                             "undo",
//                             "redo",
//                           ],
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setEditId(null)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveEdit}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <FiSave size={16} />
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* DataTable */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <DataTable
//             columns={columns}
//             data={filteredCourses}
//             progressPending={loading}
//             pagination
//             paginationPerPage={10}
//             paginationRowsPerPageOptions={[10, 20, 30]}
//             highlightOnHover
//             responsive
//             noDataComponent={
//               <div className="p-8 text-center text-gray-500">
//                 {loading
//                   ? "Loading..."
//                   : "No tests found. Try adjusting your search."}
//               </div>
//             }
//             customStyles={{
//               headCells: {
//                 style: {
//                   backgroundColor: "#f9fafb",
//                   fontWeight: "600",
//                   color: "#374151",
//                   textTransform: "uppercase",
//                   fontSize: "0.75rem",
//                   paddingLeft: "1rem",
//                   paddingRight: "1rem",
//                 },
//               },
//               cells: {
//                 style: {
//                   paddingLeft: "1rem",
//                   paddingRight: "1rem",
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreDisplay;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import DataTable from "react-data-table-component";
// import DOMPurify from "dompurify";
// import {
//   FiSearch,
//   FiTrash2,
//   FiEdit2,
//   FiSave,
//   FiX,
//   FiClock,
//   FiTag,
//   FiCalendar,
//   FiFileText,
//   FiImage,
// } from "react-icons/fi";
// import { FaRupeeSign } from "react-icons/fa";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { fetchcategory, fetchSubcategory, fetchSubsubcategory } from "../../api";

// const PreDisplay = () => {
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subSubCategories, setSubSubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     Price: "",
//     testmodule: "",
//     Durations: "",
//     CourseDescription: "",
//     LastDate: "",
//     altText: "",
//     images: null,
//     imagePreview: "",
//     category: "",
//     subCategory: "",
//     subsubCategory: "",
//   });

//   // Initialize DOMPurify
//   const sanitize = DOMPurify.sanitize;

//   useEffect(() => {
//     fetchCourses();
//     fetchcategory();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/test/display");
//       if (response.data && Array.isArray(response.data.data)) {
//         setCourses(response.data.data);
//       } else {
//         console.error(
//           "API response data is not in expected format:",
//           response.data
//         );
//         setCourses([]);
//         toast.error("Invalid course data format received from server");
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//     useEffect(() => {
//       const fetchCategories = async () => {
//         setLoading(true);
//         try {
//           const response = await fetchcategory();
//           if (response.data) {
//             setCategories(response.data);
//           }
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//           toast.error("Failed to load categories. Please try again.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCategories();
//     }, []);

//     // Fetch all subcategories
//     useEffect(() => {
//       const fetchAllSubcategories = async () => {
//         try {
//           const response = await fetchSubcategory();
//           if (response.data) {
//             setSubCategories(response.data);
//           }
//         } catch (error) {
//           console.error("Error fetching subcategories:", error);
//           toast.error("Failed to load subcategories. Please try again.");
//         }
//       };
//       fetchAllSubcategories();
//     }, []);

//     // Fetch all subsubcategories
//     useEffect(() => {
//       const fetchAllSubsubcategories = async () => {
//         try {
//           const response = await fetchSubsubcategory();
//           console.log(response, "response data");
//           if (response.data) {
//             setSubSubCategories(response?.data);
//           }
//         } catch (error) {
//           console.error("Error fetching subsubcategories:", error);
//           toast.error("Failed to load subsubcategories. Please try again.");
//         }
//       };
//       fetchAllSubsubcategories();
//     }, []);

//     // Filter subcategories based on selected category
//     useEffect(() => {
//       if (editForm.category && subCategories.length > 0) {
//         const filtered = subCategories.filter(
//           (subCat) => subCat.category === editForm.category
//         );
//         setFilteredSubCategories(filtered);
//       } else {
//         setFilteredSubCategories([]);
//         setEditForm((prev) => ({ ...prev, subCategory: "", subsubCategory: "" }));
//       }
//     }, [editForm.category, subCategories]);

//     // Filter subsubcategories based on selected subcategory
//     useEffect(() => {
//       if (editForm.subCategory && subsubCategories.length > 0) {
//         const filtered = subsubCategories.filter(
//           (subsubCat) => subsubCat.subCategory === editForm.subCategory
//         );
//         setFilteredSubsubCategories(filtered);
//         console.log(filtered, "filter course");
//       } else {
//         setFilteredSubsubCategories([]);
//         setEditForm((prev) => ({ ...prev, subsubCategory: "" }));
//       }
//     }, [editForm.subCategory, setSubSubCategories]);

//   // const fetchCategories = async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:8000/category");
//   //     setCategories(Array.isArray(response.data) ? response.data : []);
//   //   } catch (error) {
//   //     console.error("Error fetching categories:", error);
//   //     toast.error("Failed to load categories");
//   //   }
//   // };

//   // const fetchSubCategories = async (categoryId) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:8000/subcategory/${categoryId}`);
//   //     console.log(response, "aaaaaaaaaaaaaaaaa")
//   //     setSubCategories(response.data || []);
//   //   } catch (error) {
//   //     console.error("Error fetching subcategories:", error);
//   //     setSubCategories([]);
//   //   }
//   // };

//   // const fetchSubSubCategories = async (subCategoryId) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:8000/subsubcategory/${subCategoryId}`);
//   //     setSubSubCategories(response.data || []);
//   //   } catch (error) {
//   //     console.error("Error fetching subsubcategories:", error);
//   //     setSubSubCategories([]);
//   //   }
//   // };

//   const delcourse = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this course?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:8000/test/${id}`);
//       toast.success("Course deleted successfully");
//       fetchCourses();
//     } catch (error) {
//       toast.error("Error deleting course");
//       console.error("Error deleting course:", error);
//     }
//   };

//   const startEdit = (course) => {
//     setEditId(course._id);
//     setEditForm({
//       Price: course.Price || "",
//       testmodule: course.testmodule || "",
//       Durations: course.Durations || "",
//       CourseDescription: course.CourseDescription || "",
//       altText: course.altText || "",
//       LastDate: course.LastDate ? course.LastDate.substring(0, 10) : "",
//       images: null,
//       imagePreview: course.images?.[0] || "",
//       category: course.category?._id || course.category || "",
//       subCategory: course.subCategory?._id || course.subCategory || "",
//       subsubCategory: course.subsubCategory?._id || course.subsubCategory || "",
//     });

//     // Load subcategories if category exists
//     if (course.category?._id || course.category) {
//       fetchSubCategories(course.category?._id || course.category);
//     }

//     // Load subsubcategories if subcategory exists
//     if (course.subCategory?._id || course.subCategory) {
//       fetchSubSubCategories(course.subCategory?._id || course.subCategory);
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));

//     // Fetch subcategories when category changes
//     if (name === "category" && value) {
//       fetchSubCategories(value);
//       setEditForm(prev => ({ ...prev, subCategory: "", subsubCategory: "" }));
//     }

//     // Fetch subsubcategories when subcategory changes
//     if (name === "subCategory" && value) {
//       fetchSubSubCategories(value);
//       setEditForm(prev => ({ ...prev, subsubCategory: "" }));
//     }
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditForm((prev) => ({ ...prev, CourseDescription: data }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditForm((prev) => ({
//           ...prev,
//           images: file,
//           imagePreview: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const saveEdit = async () => {
//     if (
//       !editForm.testmodule ||
//       !editForm.Durations ||
//       !editForm.CourseDescription ||
//       !editForm.category
//     ) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("Price", editForm.Price);
//       formData.append("testmodule", editForm.testmodule);
//       formData.append("Durations", editForm.Durations);
//       formData.append("CourseDescription", editForm.CourseDescription);
//       formData.append("LastDate", editForm.LastDate);
//       formData.append("altText", editForm.altText);
//       formData.append("category", editForm.category);
//       if (editForm.subCategory) formData.append("subCategory", editForm.subCategory);
//       if (editForm.subsubCategory) formData.append("subsubCategory", editForm.subsubCategory);
//       if (editForm.images) {
//         formData.append("images", editForm.images);
//       }

//       const response = await axios.put(
//         `http://localhost:8000/test/editsave/${editId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Course updated successfully");
//         setEditId(null);
//         fetchCourses();
//       }
//     } catch (error) {
//       console.error("Error updating course:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Error updating course. Please try again."
//       );
//     }
//   };

//   const columns = [
//     {
//       name: "Image",
//       cell: (row) => (
//         <div className="flex items-center justify-center">
//           {row.images?.[0] ? (
//             <img
//               src={row.images[0]}
//               alt={row.altText || "Course"}
//               className="w-12 h-12 object-cover rounded-md"
//             />
//           ) : (
//             <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
//               <FiImage className="text-gray-400" />
//             </div>
//           )}
//         </div>
//       ),
//       width: "80px",
//     },
//     {
//       name: "Price",
//       selector: (row) => row.Price,
//       cell: (row) => (
//         <div className="flex items-center">
//           <FaRupeeSign className="mr-1 text-gray-500" />
//           <span>{row.Price || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Test Module",
//       selector: (row) => row.testmodule,
//       cell: (row) => (
//         <div className="font-medium text-gray-800">
//           {row.testmodule || "N/A"}
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Alt Text",
//       selector: (row) => row.altText,
//       cell: (row) => (
//         <div className="font-medium text-gray-800">{row.altText || "N/A"}</div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Duration",
//       selector: (row) => row.Durations,
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiClock className="mr-1 text-gray-500" />
//           <span>{row.Durations || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Mock/Sectional",
//       selector: (row) => row.category?.name || row.category || "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>{row.category?.name || row.category || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Judiciary",
//       selector: (row) =>
//         row.subsubCategory?.name || row.subsubCategory || "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>{row.subsubCategory?.name || row.subsubCategory || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Sub Category",
//       selector: (row) => row.subsubCategory?.subCategory || "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>{row.subsubCategory?.subCategory || "N/A"}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Description",
//       cell: (row) => (
//         <div className="flex items-start">
//           <FiFileText className="mr-1 text-gray-500 mt-1 flex-shrink-0" />
//           <div
//             dangerouslySetInnerHTML={{
//               __html: sanitize(row.CourseDescription || "No description"),
//             }}
//             className="prose prose-sm max-w-none"
//             style={{ maxWidth: "300px", overflowWrap: "break-word" }}
//           />
//         </div>
//       ),
//       width: "300px",
//     },
//     {
//       name: "Last Date",
//       selector: (row) =>
//         row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiCalendar className="mr-1 text-gray-500" />
//           <span>
//             {row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A"}
//           </span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => startEdit(row)}
//             className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded transition-colors"
//           >
//             <FiEdit2 size={14} />
//           </button>
//           <button
//             onClick={() => delcourse(row._id)}
//             className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm px-3 py-1 rounded transition-colors"
//           >
//             <FiTrash2 size={14} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   const filteredCourses = courses.filter((course) => {
//     if (!course) return false;
//     const searchString = searchText.toLowerCase();
//     return (
//       (course.testmodule?.toLowerCase() || "").includes(searchString) ||
//       (course.Durations?.toLowerCase() || "").includes(searchString) ||
//       (course.category?.name || course.category || "")
//         .toString()
//         .toLowerCase()
//         .includes(searchString) ||
//       (course.CourseDescription?.toLowerCase() || "").includes(searchString) ||
//       (course.altText?.toLowerCase() || "").includes(searchString)
//     );
//   });

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Course pre test
//           </h1>

//           <div className="relative w-full md:w-96">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search tests..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Pop-up Edit Form */}
//         {editId && (
//           <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     Edit Test Details
//                   </h2>
//                   <button
//                     onClick={() => setEditId(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <FiX size={20} />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Image
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
//                         {editForm.imagePreview ? (
//                           <img
//                             src={editForm.imagePreview}
//                             alt="Preview"
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center text-gray-400">
//                             <FiImage size={24} />
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <input
//                           type="file"
//                           id="image-upload"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="hidden"
//                         />
//                         <label
//                           htmlFor="image-upload"
//                           className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
//                         >
//                           Change Image
//                         </label>
//                         <p className="mt-1 text-xs text-gray-500">
//                           JPG, PNG or GIF (Max. 5MB)
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Category*
//                     </label>
//                     <select
//                       name="category"
//                       value={editForm.category}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Sub Category
//                     </label>
//                     <select
//                       name="subCategory"
//                       value={editForm.subCategory}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       disabled={!editForm.category}
//                     >
//                       <option value="">Select Sub Category</option>
//                       {subCategories.map((subCat) => (
//                         <option key={subCat._id} value={subCat._id}>
//                           {subCat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Sub Sub Category
//                     </label>
//                     <select
//                       name="subsubCategory"
//                       value={editForm.subsubCategory}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       disabled={!editForm.subCategory}
//                     >
//                       <option value="">Select Sub Sub Category</option>
//                       {subSubCategories.map((subSubCat) => (
//                         <option key={subSubCat._id} value={subSubCat._id}>
//                           {subSubCat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Price
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaRupeeSign className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         name="Price"
//                         value={editForm.Price}
//                         onChange={handleEditChange}
//                         className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter price"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Test Module*
//                     </label>
//                     <input
//                       type="text"
//                       name="testmodule"
//                       value={editForm.testmodule}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter test module"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duration*
//                     </label>
//                     <input
//                       type="text"
//                       name="Durations"
//                       value={editForm.Durations}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter duration"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Alt Text
//                     </label>
//                     <input
//                       type="text"
//                       name="altText"
//                       value={editForm.altText}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter alt text for image"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Date
//                     </label>
//                     <input
//                       type="date"
//                       name="LastDate"
//                       value={editForm.LastDate}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description*
//                     </label>
//                     <div className="ckeditor-container">
//                       <CKEditor
//                         editor={ClassicEditor}
//                         data={editForm.CourseDescription}
//                         onChange={handleEditorChange}
//                         config={{
//                           toolbar: [
//                             "heading",
//                             "|",
//                             "bold",
//                             "italic",
//                             "link",
//                             "bulletedList",
//                             "numberedList",
//                             "|",
//                             "blockQuote",
//                             "insertTable",
//                             "undo",
//                             "redo",
//                           ],
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setEditId(null)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveEdit}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <FiSave size={16} />
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* DataTable */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <DataTable
//             columns={columns}
//             data={filteredCourses}
//             progressPending={loading}
//             pagination
//             paginationPerPage={10}
//             paginationRowsPerPageOptions={[10, 20, 30]}
//             highlightOnHover
//             responsive
//             noDataComponent={
//               <div className="p-8 text-center text-gray-500">
//                 {loading
//                   ? "Loading..."
//                   : "No tests found. Try adjusting your search."}
//               </div>
//             }
//             customStyles={{
//               headCells: {
//                 style: {
//                   backgroundColor: "#f9fafb",
//                   fontWeight: "600",
//                   color: "#374151",
//                   textTransform: "uppercase",
//                   fontSize: "0.75rem",
//                   paddingLeft: "1rem",
//                   paddingRight: "1rem",
//                 },
//               },
//               cells: {
//                 style: {
//                   paddingLeft: "1rem",
//                   paddingRight: "1rem",
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreDisplay;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import DOMPurify from "dompurify";
import {
  FiSearch,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
  FiClock,
  FiTag,
  FiCalendar,
  FiFileText,
  FiImage,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  fetchcategory,
  fetchSubcategory,
  fetchSubsubcategory,
} from "../../api";

const PreDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    Price: "",
    testmodule: "",
    Durations: "",
    CourseDescription: "",
    LastDate: "",
    altText: "",
    images: null,
    imagePreview: "",
    category: "",
    subCategory: "",
    subsubCategory: "",
  });

  // Initialize DOMPurify
  const sanitize = DOMPurify.sanitize;

  useEffect(() => {
    fetchCourses();
    fetchAllCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/test/display");
      if (response.data && Array.isArray(response.data.data)) {
        setCourses(response.data.data);
      } else {
        console.error(
          "API response data is not in expected format:",
          response.data
        );
        setCourses([]);
        toast.error("Invalid course data format received from server");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  console.log(courses);

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const [catRes, subCatRes, subSubCatRes] = await Promise.all([
        fetchcategory(),
        fetchSubcategory(),
        fetchSubsubcategory(),
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (subCatRes.data) setSubCategories(subCatRes.data);
      if (subSubCatRes.data) setSubSubCategories(subSubCatRes.data);
      console.log(fetchSubsubcategory, "caetgoyr");
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter subcategories based on selected category
  useEffect(() => {
    if (editForm.category && subCategories.length > 0) {
      const filtered = subCategories.filter(
        (subCat) => subCat.category === editForm.category
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
      setEditForm((prev) => ({ ...prev, subCategory: "", subsubCategory: "" }));
    }
  }, [editForm.category, subCategories]);

  // Filter subsubcategories based on selected subcategory
  useEffect(() => {
    const loadFilteredSubSubCategories = async () => {
      if (editForm.subCategory) {
        try {
          const response = await fetchSubsubcategory(editForm.subCategory);
          setFilteredSubSubCategories(response.data);
        } catch (error) {
          console.error("Error loading sub-sub-categories:", error);
          setFilteredSubSubCategories([]);
        }
      } else {
        setFilteredSubSubCategories([]);
      }
    };

    loadFilteredSubSubCategories();
  }, [editForm.subCategory]);

  const delcourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/test/${id}`);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Error deleting course");
      console.error("Error deleting course:", error);
    }
  };

  const startEdit = (course) => {
    setEditId(course._id);
    setEditForm({
      Price: course.Price || "",
      testmodule: course.testmodule || "",
      Durations: course.Durations || "",
      CourseDescription: course.CourseDescription || "",
      altText: course.altText || "",
      LastDate: course.LastDate ? course.LastDate.substring(0, 10) : "",
      images: null,
      imagePreview: course.images?.[0] || "",
      category: course.category?._id || course.category || "",
      subCategory: course.subCategory?._id || course.subCategory || "",
      subsubCategory: course.subsubCategory?._id || course.subsubCategory || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditForm((prev) => ({ ...prev, CourseDescription: data }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm((prev) => ({
          ...prev,
          images: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = async () => {
    if (
      !editForm.testmodule ||
      !editForm.Durations ||
      !editForm.CourseDescription ||
      !editForm.category
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Price", editForm.Price);
      formData.append("testmodule", editForm.testmodule);
      formData.append("Durations", editForm.Durations);
      formData.append("CourseDescription", editForm.CourseDescription);
      formData.append("LastDate", editForm.LastDate);
      formData.append("altText", editForm.altText);
      formData.append("category", editForm.category);
      if (editForm.subCategory)
        formData.append("subCategory", editForm.subCategory);
      if (editForm.subsubCategory)
        formData.append("subsubCategory", editForm.subsubCategory);
      if (editForm.images) {
        formData.append("images", editForm.images);
      }

      const response = await axios.put(
        `http://localhost:8000/test/editsave/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Course updated successfully");
        setEditId(null);
        fetchCourses();
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error(
        error.response?.data?.message ||
          "Error updating course. Please try again."
      );
    }
  };

  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row.images?.[0] ? (
            <img
              src={row.images[0]}
              alt={row.altText || "Course"}
              className="w-12 h-12 object-cover rounded-md"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
              <FiImage className="text-gray-400" />
            </div>
          )}
        </div>
      ),
      width: "80px",
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      cell: (row) => (
        <div className="flex items-center">
          <FaRupeeSign className="mr-1 text-gray-500" />
          <span>{row.Price || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Test Module",
      selector: (row) => row.testmodule,
      cell: (row) => (
        <div className="font-medium text-gray-800">
          {row.testmodule || "N/A"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Alt Text",
      selector: (row) => row.altText,
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.altText || "N/A"}</div>
      ),
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.Durations,
      cell: (row) => (
        <div className="flex items-center">
          <FiClock className="mr-1 text-gray-500" />
          <span>{row.Durations || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Mock/Sectional",
      selector: (row) => row.category?.name || row.category || "N/A",
      cell: (row) => (
        <div className="flex items-center">
          <FiTag className="mr-1 text-gray-500" />
          <span>{row.category?.name || row.category || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Judiciary",
      selector: (row) =>
        row.subsubCategory?.name || row.subsubCategory || "N/A",
      cell: (row) => (
        <div className="flex items-center">
          <FiTag className="mr-1 text-gray-500" />
          <span>{row.subsubCategory?.name || row.subsubCategory || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row.subCategory?.name || row.subCategory || "N/A",
      cell: (row) => (
        <div className="flex items-center">
          <FiTag className="mr-1 text-gray-500" />
          <span>{row.subCategory?.name || row.subCategory || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <div className="flex items-start">
          <FiFileText className="mr-1 text-gray-500 mt-1 flex-shrink-0" />
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(row.CourseDescription || "No description"),
            }}
            className="prose prose-sm max-w-none"
            style={{ maxWidth: "300px", overflowWrap: "break-word" }}
          />
        </div>
      ),
      width: "300px",
    },
    {
      name: "Last Date",
      selector: (row) =>
        row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A",
      cell: (row) => (
        <div className="flex items-center">
          <FiCalendar className="mr-1 text-gray-500" />
          <span>
            {row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A"}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => startEdit(row)}
            className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded transition-colors"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => delcourse(row._id)}
            className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm px-3 py-1 rounded transition-colors"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    if (!course) return false;
    const searchString = searchText.toLowerCase();
    return (
      (course.testmodule?.toLowerCase() || "").includes(searchString) ||
      (course.Durations?.toLowerCase() || "").includes(searchString) ||
      (course.category?.name || course.category || "")
        .toString()
        .toLowerCase()
        .includes(searchString) ||
      (course.CourseDescription?.toLowerCase() || "").includes(searchString) ||
      (course.altText?.toLowerCase() || "").includes(searchString)
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Course pre test
          </h1>

          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tests..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Pop-up Edit Form */}
        {editId && (
          <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Edit Test Details
                  </h2>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        {editForm.imagePreview ? (
                          <img
                            src={editForm.imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FiImage size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                          Change Image
                        </label>
                        <p className="mt-1 text-xs text-gray-500">
                          JPG, PNG or GIF (Max. 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sub Category
                    </label>
                    <select
                      name="subCategory"
                      value={editForm.subCategory}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      disabled={!editForm.category}
                    >
                      <option value="">Select Sub Category</option>
                      {filteredSubCategories.map((subCat) => (
                        <option key={subCat._id} value={subCat._id}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sub Sub Category
                    </label>
                    <select
                      name="subsubCategory"
                      value={editForm.subsubCategory}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      disabled={!editForm.subCategory}
                    >
                      <option value="">Select Sub Sub Category</option>
                      {filteredSubSubCategories.map((subSubCat) => (
                        <option key={subSubCat._id} value={subSubCat._id}>
                          {subSubCat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRupeeSign className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="Price"
                        value={editForm.Price}
                        onChange={handleEditChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Test Module*
                    </label>
                    <input
                      type="text"
                      name="testmodule"
                      value={editForm.testmodule}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter test module"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration*
                    </label>
                    <input
                      type="text"
                      name="Durations"
                      value={editForm.Durations}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter duration"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      name="altText"
                      value={editForm.altText}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter alt text for image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Date
                    </label>
                    <input
                      type="date"
                      name="LastDate"
                      value={editForm.LastDate}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <div className="ckeditor-container">
                      <CKEditor
                        editor={ClassicEditor}
                        data={editForm.CourseDescription}
                        onChange={handleEditorChange}
                        config={{
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "blockQuote",
                            "insertTable",
                            "undo",
                            "redo",
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditId(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiSave size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DataTable */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredCourses}
            progressPending={loading}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            responsive
            noDataComponent={
              <div className="p-8 text-center text-gray-500">
                {loading
                  ? "Loading..."
                  : "No tests found. Try adjusting your search."}
              </div>
            }
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#f9fafb",
                  fontWeight: "600",
                  color: "#374151",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                },
              },
              cells: {
                style: {
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreDisplay;
