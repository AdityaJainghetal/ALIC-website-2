import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiDollarSign,
  FiClock,
  FiUser,
  FiCalendar,
  FiHome,
  FiLink,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchcategory, fetchSubcategory, fetchSubsubcategory } from "../api";

const CourseDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [editId, setEditId] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [editForm, setEditForm] = useState({
    Price: "",
    Durations: "",
    TrainerName: "",
    LastDate: "",
    category: "",
    subCategory: "",
    subsubCategory: "",
    CourseDescription: "",
    InstructorCourse: "",
    URL: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredSubsubCategories, setFilteredSubsubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const api = "https://alic-website-2-1.onrender.com/api/alldisplay";

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(api);
      setCourses(response.data);
    } catch (error) {
      toast.error("Error fetching course data");
      console.error("Error fetching course data:", error);
    }
  };
  console.log(filteredSubsubCategories, "filterdatadaaaaaaaaaaaaa");

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchcategory();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all subcategories
  useEffect(() => {
    const fetchAllSubcategories = async () => {
      try {
        const response = await fetchSubcategory();
        if (response.data) {
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to load subcategories. Please try again.");
      }
    };
    fetchAllSubcategories();
  }, []);

  // Fetch all subsubcategories
  useEffect(() => {
    const fetchAllSubsubcategories = async () => {
      try {
        const response = await fetchSubsubcategory();
        console.log(response, "response data");
        if (response.data) {
          setSubsubCategories(response?.data);
        }
      } catch (error) {
        console.error("Error fetching subsubcategories:", error);
        toast.error("Failed to load subsubcategories. Please try again.");
      }
    };
    fetchAllSubsubcategories();
  }, []);

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
    if (editForm.subCategory && subsubCategories.length > 0) {
      const filtered = subsubCategories.filter(
        (subsubCat) => subsubCat.subCategory === editForm.subCategory
      );
      setFilteredSubsubCategories(filtered);
      console.log(filtered, "filter course");
    } else {
      setFilteredSubsubCategories([]);
      setEditForm((prev) => ({ ...prev, subsubCategory: "" }));
    }
  }, [editForm.subCategory, subsubCategories]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const delcourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `https://alic-website-2-1.onrender.com/api/coursedelte/${id}`
      );
      toast.success("Course deleted successfully");
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      toast.error("Error deleting course");
      console.log("Error deleting course:", error);
    }
  };

  const startEdit = async (id) => {
    try {
      const res = await axios.get(
        `https://alic-website-2-1.onrender.com/api/courses/${id}`
      );
      console.log(res, "DATA");

      const course = res.data;

      setEditId(id);
      setEditForm({
        Price: course.Price || "",
        Durations: course.Durations || "",
        TrainerName: course.TrainerName || "",
        LastDate: course.LastDate ? course.LastDate.substring(0, 10) : "",
        category: course.category?._id || course.category || "",
        subCategory: course.subCategory?._id || course.subCategory || "",
        subsubCategory:
          course.subsubCategory?._id || course.subsubCategory || "",
        CourseDescription: course.CourseDescription || "",
        InstructorCourse: course.InstructorCourse || "",
        URL: course.URL || "",
        images: course.images || [],
      });

      // Get category ID
      const categoryId = course.category?._id || course.category;
      if (categoryId) {
        // Filter subcategories by category ID
        const filteredSubs = subCategories.filter(
          (subCat) => subCat.category == categoryId
        );
        setFilteredSubCategories(filteredSubs);

        const subCatId = course.subCategory?._id || course.subCategory;
        const subCatName = course.subCategory?.name || course.subCategory;

        const filteredSubsubs = subsubCategories.filter((subsubCat) => {
          return (
            subsubCat.subCategory === subCatId || // match by ID
            subsubCat.subCategory === subCatName // OR match by name
          );
        });
        setFilteredSubsubCategories(filteredSubsubs);

        // Get subcategory ID or name
        // const subCatId = course.subCategory?._id || course.subCategory;
        // const subCatName = course.subCategory?.name || course.subCategory;

        // if (subCatId || subCatName) {
        //   const filteredSubsubs = subsubCategories.filter((subsubCat) => {
        //     return (
        //       subsubCat.subCategory === subCatId ||
        //       subsubCat.subCategory === subCatName
        //     );
        //   });
        //   setFilteredSubsubCategories(filteredSubsubs);
        // }
      }
    } catch (error) {
      toast.error("Error loading course for edit");
      console.error("Error loading course for edit:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (name, value) => {
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = async (id, checked) => {
    const newStatus = !checked;
    try {
      await axios.put(
        `https://alic-website-2-1.onrender.com/api/${id}/home-visibility`,
        {
          homeVisibility: newStatus,
        }
      );
      fetchCourses();
      toast.success("Visibility updated successfully");
    } catch (error) {
      toast.error("Error updating visibility");
      console.error("Error updating visibility:", error);
    }
  };

  const changeStatus = async (id, homeVisibility) => {
    const confirmToggle = window.confirm(
      "Are you sure you want to change the visibility of this course?"
    );
    if (!confirmToggle) return;

    try {
      await handleToggle(id, homeVisibility);
    } catch (err) {
      console.error("Failed to update course visibility:", err);
      toast.error("Failed to update course visibility. Please try again.");
    }
  };

  // const saveEdit = async () => {
  //   try {
  //     await axios.put(`https://alic-website-2-1.onrender.com/api/editsave/${editId}`, editForm);
  //     toast.success("Course updated successfully");
  //     setEditId(null);
  //     setEditForm({
  //       Price: "",
  //       Durations: "",
  //       TrainerName: "",
  //       LastDate: "",
  //       category: "",
  //       subCategory: "",
  //       subsubCategory: "",
  //       CourseDescription: "",
  //       InstructorCourse: "",
  //       URL: "",
  //       images: [],
  //     });
  //     fetchCourses();
  //   } catch (error) {
  //     toast.error("Error saving course");
  //     console.error("Error saving course:", error);
  //   }
  // };

  const saveEdit = async () => {
    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(editForm).forEach((key) => {
        if (key !== "images") {
          formData.append(key, editForm[key]);
        }
      });

      // Append existing images (to know which ones to keep)
      editForm.images.forEach((image) => {
        formData.append("existingImages", image);
      });

      // Append new images
      newImages.forEach((image) => {
        formData.append("images", image);
      });

      // Append images to delete
      imagesToDelete.forEach((image) => {
        formData.append("imagesToDelete", image);
      });

      const response = await axios.put(
        `https://alic-website-2-1.onrender.com/api/editsave/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Course updated successfully");
      setEditId(null);
      setNewImages([]);
      setImagesToDelete([]);
      fetchCourses();
    } catch (error) {
      toast.error("Error saving course");
      console.error("Error saving course:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      // Remove from new images
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      // Mark existing image for deletion and remove from display
      setImagesToDelete([...imagesToDelete, editForm.images[index]]);
      setEditForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };
  const columns = [
    {
      name: "Sr. No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Course Image",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <img
            src={Array.isArray(row.images) ? row.images[0] : row.images}
            alt="Course"
            className="h-12 w-12 object-cover rounded-lg shadow-sm"
          />
        </div>
      ),
      width: "100px",
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name || "Uncategorized",
      cell: (row) => (
        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          {row.category?.name || "Uncategorized"}
        </span>
      ),
    },
    {
      name: "Subcategory",
      selector: (row) => row?.subCategory?.name || "N/A",
      cell: (row) => (
        <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
          {row.subCategory?.name || "N/A"}
        </span>
      ),
    },
    {
      name: "Sub-subcategory",
      selector: (row) => row?.subsubCategory?.name || "N/A",
      cell: (row) => (
        <span className="px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
          {row.subsubCategory?.name || "N/A"}
        </span>
      ),
    },
    {
      name: "Description",
      cell: (row) => (
        <div
          className="text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: row.CourseDescription || "No description",
          }}
        />
      ),
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.InstructorCourse,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.InstructorCourse === "Published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.InstructorCourse}
        </span>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      cell: (row) => (
        <div className="flex items-center">
          <span>₹{row.Price}</span>
        </div>
      ),
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
    },
    {
      name: "Trainer",
      selector: (row) => row.TrainerName,
      cell: (row) => (
        <div className="flex items-center">
          <FiUser className="mr-1 text-gray-500" />
          <span>{row.TrainerName}</span>
        </div>
      ),
    },
    {
      name: "URL",
      selector: (row) => row.URL,
      cell: (row) => (
        <div className="flex items-center">
          <FiLink className="mr-1 text-gray-500" />
          <a
            href={row.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate max-w-xs"
          >
            {row.URL ? "View Link" : "No URL"}
          </a>
        </div>
      ),
      width: "150px",
    },
    {
      name: "Front display",
      cell: (row) => (
        <button
          onClick={() => changeStatus(row._id, row.homeVisibility)}
          className={`flex items-center gap-1 text-sm px-3 py-1 rounded transition-colors ${
            row.homeVisibility
              ? "bg-green-100 hover:bg-green-200 text-green-800"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          title={row.homeVisibility ? "Visible on home" : "Hidden from home"}
        >
          <FiHome size={14} />
          {row.homeVisibility ? "Visible" : "Hidden"}
        </button>
      ),
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => startEdit(row._id)}
            className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded transition-colors"
            title="Edit"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => delcourse(row._id)}
            className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm px-3 py-1 rounded transition-colors"
            title="Delete"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.TrainerName?.toLowerCase().includes(filterText.toLowerCase()) ||
      course.category?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      (course.subCategory?.name &&
        course.subCategory.name
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (course.subsubCategory?.name &&
        course.subsubCategory.name
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Course Management
          </h1>

          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredCourses}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            striped
            responsive
            noDataComponent={
              <div className="p-8 text-center text-gray-500">
                No courses found. Try adjusting your search.
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

        {editId && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mt-10">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Edit Course Details
                  </h2>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="text"
                      name="Price"
                      value={editForm.Price}
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
                      Trainer Name
                    </label>
                    <input
                      type="text"
                      name="TrainerName"
                      value={editForm.TrainerName}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="InstructorCourse"
                      value={editForm.InstructorCourse}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Published">Published</option>
                      <option value="Unpublished">Unpublished</option>
                    </select>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      name="URL"
                      value={editForm.URL}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
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
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subcategory
                    </label>
                    <select
                      name="subCategory"
                      value={editForm.subCategory}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      disabled={!editForm.category}
                    >
                      <option value="">Select Subcategory</option>
                      {filteredSubCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                          {subCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-subcategory</label>
                    <select
                      name="subsubCategory"
                      value={editForm.subsubCategory}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      disabled={!editForm.subCategory}
                    >
                      <option value="">Select Sub-subcategory</option>

                      {filteredSubsubCategories.map(subsubCategory => (
                        { id: console.log("sdsd", subsubCategory) },
                        <option key={subsubCategory._id} value={subsubCategory._id}>
                          {subsubCategory?.name}

                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sub-subcategory
                      </label>
                      <select
                        name="subsubCategory"
                        value={editForm.subsubCategory}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        disabled={!editForm.subCategory}
                      >
                        <option value="">-- Select Sub-subcategory --</option>
                        {filteredSubsubCategories.map((subsubCategory) => (
                          <option
                            key={subsubCategory._id}
                            value={subsubCategory._id}
                          >
                            {subsubCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Description
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editForm.CourseDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleEditorChange("CourseDescription", data);
                      }}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                        ],
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Images
                    </label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* Existing images */}
                      {editForm.images.map((image, index) => (
                        <div key={`existing-${index}`} className="relative">
                          <img
                            src={image}
                            alt={`Course ${index}`}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <button
                            onClick={() => handleRemoveImage(index, false)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            title="Remove image"
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}

                      {/* Newly uploaded images (previews) */}
                      {newImages.map((image, index) => (
                        <div key={`new-${index}`} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`New image ${index}`}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <button
                            onClick={() => handleRemoveImage(index, true)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            title="Remove image"
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* File input for new images */}
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
                      accept="image/*"
                    />
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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default CourseDisplay;
