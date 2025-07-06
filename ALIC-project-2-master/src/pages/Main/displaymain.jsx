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

// const MainDisplay = () => {
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
//     altText: "",
//     LastDate: "",
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
//       const response = await axios.get("http://localhost:8000/main/display");
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
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//       setCourses([]);
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
//       await axios.delete(`http://localhost:8000/main/${id}`);
//       toast.success("Course deleted successfully");
//       setCourses((prev) =>
//         Array.isArray(prev) ? prev.filter((course) => course._id !== id) : []
//       );
//     } catch (error) {
//       toast.error("Error deleting course");
//       console.log("Error deleting course:", error);
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
//       imagePreview:
//         course.images && course.images.length > 0 ? course.images[0] : "",
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
//     try {
//       const formData = new FormData();
//       formData.append("Price", editForm.Price);
//       formData.append("testmodule", editForm.testmodule);
//       formData.append("Durations", editForm.Durations);
//       formData.append("CourseDescription", editForm.CourseDescription);
//       formData.append("LastDate", editForm.LastDate);
//       formData.append("altText", editForm.altText);
//       if (editForm.images) {
//         formData.append("images", editForm.images);
//       }

//       const response = await axios.put(
//         `http://localhost:8000/main/editsave/${editId}`,
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
//       } else {
//         throw new Error(response.data.message || "Failed to update course");
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
//           {row.images && row.images.length > 0 ? (
//             <img
//               src={row.images[0]}
//               alt="Course"
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
//           <span>{row.Price}</span>
//         </div>
//       ),
//       sortable: true,
//     },

//     {
//       name: "altText",
//       selector: (row) => row.altText,
//       cell: (row) => (
//         <div className="flex items-center">
//           <FaRupeeSign className="mr-1 text-gray-500" />
//           <span>{row.altText}</span>
//         </div>
//       ),
//       sortable: true,
//     },

//     {
//       name: "Test Module",
//       selector: (row) => row.testmodule,
//       cell: (row) => (
//         <div className="font-medium text-gray-800">{row.testmodule}</div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Duration",
//       selector: (row) => row.Durations,
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiClock className="mr-1 text-gray-500" />
//           <span>{row.Durations}</span>
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
//       name: "judicary",
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
//       name: "Series",
//       selector: (row) =>
//         row.subsubCategory?.subCategory ||
//         row.subsubCategory.subCategory ||
//         "N/A",
//       cell: (row) => (
//         <div className="flex items-center">
//           <FiTag className="mr-1 text-gray-500" />
//           <span>
//             {row.subsubCategory?.subCategory ||
//               row.subsubCategory.subCategory ||
//               "N/A"}
//           </span>
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
//               __html: sanitize(row.CourseDescription || ""),
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
//       selector: (row) => new Date(row.LastDate).toLocaleDateString(),
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

//   const filteredCourses = Array.isArray(courses)
//     ? courses.filter((course) => {
//         const searchString = searchText.toLowerCase();
//         return (
//           (course.testmodule?.toLowerCase() || "").includes(searchString) ||
//           (course.Durations?.toLowerCase() || "").includes(searchString) ||
//           (course.category?.name
//             ? course.category.name.toLowerCase()
//             : course.category?.toLowerCase() || ""
//           ).includes(searchString) ||
//           (course.CourseDescription?.toLowerCase() || "").includes(searchString)
//         );
//       })
//     : [];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Main test series
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

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
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

//         {/* Edit Form as Modal Popup */}
//         {editId && (
//           <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
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
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       altText
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaRupeeSign className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         name="altText"
//                         value={editForm.altText}
//                         onChange={handleEditChange}
//                         className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Test Module
//                     </label>
//                     <input
//                       type="text"
//                       name="testmodule"
//                       value={editForm.testmodule}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duration
//                     </label>
//                     <input
//                       type="text"
//                       name="Durations"
//                       value={editForm.Durations}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
//                       Description
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
//                     <style jsx>{`
//                       .ckeditor-container :global(.ck-editor__editable_inline) {
//                         min-height: 200px;
//                       }
//                     `}</style>
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
//       </div>
//     </div>
//   );
// };

// export default MainDisplay;



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

const MainDisplay = () => {
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
    altText: "",
    LastDate: "",
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
      const response = await axios.get("http://localhost:8000/main/display");
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
      setCourses([]);
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const [categoriesRes, subCategoriesRes, subSubCategoriesRes] = await Promise.all([
        axios.get("http://localhost:8000/category"),
        axios.get("http://localhost:8000/subcategory"),
        axios.get("http://localhost:8000/subsubcategory")
      ]);

      setCategories(categoriesRes.data || []);
      setSubCategories(subCategoriesRes.data || []);
      setSubSubCategories(subSubCategoriesRes.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  // Filter subcategories when category changes
  useEffect(() => {
    if (editForm.category && subCategories.length > 0) {
      const filtered = subCategories.filter(
        (subCat) => subCat.category === editForm.category
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
      setEditForm(prev => ({ ...prev, subCategory: "", subsubCategory: "" }));
    }
  }, [editForm.category, subCategories]);

  // Filter subsubcategories when subcategory changes
  useEffect(() => {
    if (editForm.subCategory && subSubCategories.length > 0) {
      const filtered = subSubCategories.filter(
        (subsubCat) => subsubCat.subCategory === editForm.subCategory
      );
      setFilteredSubSubCategories(filtered);
    } else {
      setFilteredSubSubCategories([]);
      setEditForm(prev => ({ ...prev, subsubCategory: "" }));
    }
  }, [editForm.subCategory, subSubCategories]);

  const delcourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/main/${id}`);
      toast.success("Course deleted successfully");
      setCourses((prev) =>
        Array.isArray(prev) ? prev.filter((course) => course._id !== id) : []
      );
    } catch (error) {
      toast.error("Error deleting course");
      console.log("Error deleting course:", error);
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
    try {
      const formData = new FormData();
      formData.append("Price", editForm.Price);
      formData.append("testmodule", editForm.testmodule);
      formData.append("Durations", editForm.Durations);
      formData.append("CourseDescription", editForm.CourseDescription);
      formData.append("LastDate", editForm.LastDate);
      formData.append("altText", editForm.altText);
      formData.append("category", editForm.category);
      if (editForm.subCategory) formData.append("subCategory", editForm.subCategory);
      if (editForm.subsubCategory) formData.append("subsubCategory", editForm.subsubCategory);
      if (editForm.images) {
        formData.append("images", editForm.images);
      }

      const response = await axios.put(
        `http://localhost:8000/main/editsave/${editId}`,
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
      } else {
        throw new Error(response.data.message || "Failed to update course");
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
          {row.images && row.images.length > 0 ? (
            <img
              src={row.images[0]}
              alt="Course"
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
          <span>{row.Price}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "altText",
      selector: (row) => row.altText,
      cell: (row) => (
        <div className="flex items-center">
          <FaRupeeSign className="mr-1 text-gray-500" />
          <span>{row.altText}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Test Module",
      selector: (row) => row.testmodule,
      cell: (row) => (
        <div className="font-medium text-gray-800">{row.testmodule}</div>
      ),
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.Durations,
      cell: (row) => (
        <div className="flex items-center">
          <FiClock className="mr-1 text-gray-500" />
          <span>{row.Durations}</span>
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
      name: "judicary",
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
      name: "Series",
      selector: (row) =>
        row.subCategory?.name || row.subCategory || "N/A",
      cell: (row) => (
        <div className="flex items-center">
          <FiTag className="mr-1 text-gray-500" />
          <span>
            {row.subCategory?.name || row.subCategory || "N/A"}
          </span>
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
              __html: sanitize(row.CourseDescription || ""),
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
      selector: (row) => new Date(row.LastDate).toLocaleDateString(),
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

  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) => {
        const searchString = searchText.toLowerCase();
        return (
          (course.testmodule?.toLowerCase() || "").includes(searchString) ||
          (course.Durations?.toLowerCase() || "").includes(searchString) ||
          (course.category?.name
            ? course.category.name.toLowerCase()
            : course.category?.toLowerCase() || ""
          ).includes(searchString) ||
          (course.CourseDescription?.toLowerCase() || "").includes(searchString)
        );
      })
    : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Main test series
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
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

        {/* Edit Form as Modal Popup */}
        {editId && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
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

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory Selection */}
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

                  {/* Subsubcategory Selection */}
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
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      altText
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRupeeSign className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="altText"
                        value={editForm.altText}
                        onChange={handleEditChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Test Module
                    </label>
                    <input
                      type="text"
                      name="testmodule"
                      value={editForm.testmodule}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="Durations"
                      value={editForm.Durations}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                      Description
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
                    <style jsx>{`
                      .ckeditor-container :global(.ck-editor__editable_inline) {
                        min-height: 200px;
                      }
                    `}</style>
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
      </div>
    </div>
  );
};

export default MainDisplay;