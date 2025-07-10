import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaImage,
  FaCalendarAlt,
  FaUserTie,
  FaMoneyBillWave,
  FaClock,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

const OtherCourseDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [currentCourse, setCurrentCourse] = useState({
    Coursename: "",
    Price: "",
    URL: "",
    Alttage: "",
    TrainerName: "",
    Durations: "",
    altText: "",
    CourseDescription: "",
    InstructorCourse: "",
    LastDate: "",
    images: [""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/othercourse");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8000/othercourse/${id}`);
        setCourses(courses.filter((course) => course._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Start editing
  const startEditing = (course) => {
    setEditingId(course._id);
    setCurrentCourse({
      ...course,
      images:
        course.images && course.images.length > 0 ? [...course.images] : [""],
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setCurrentCourse({
      Coursename: "",
      Price: "",
      URL: "",
      Alttage: "",
      TrainerName: "",
      Durations: "",
      altText: "",
      CourseDescription: "",
      InstructorCourse: "",
      LastDate: "",
      images: [""],
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image changes
  const handleImageChange = (index, value) => {
    const newImages = [...currentCourse.images];
    newImages[index] = value;
    setCurrentCourse((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Add image field
  const addImageField = () => {
    setCurrentCourse((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  // Remove image field
  const removeImageField = (index) => {
    const newImages = currentCourse.images.filter((_, i) => i !== index);
    setCurrentCourse((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Submit edited course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(
        `http://localhost:8000/othercourse/${currentCourse._id}`,
        currentCourse
      );
      setCourses(
        courses.map((course) =>
          course._id === currentCourse._id ? currentCourse : course
        )
      );
      cancelEditing();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add new course
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/othercourse",
        currentCourse
      );
      setCourses([...courses, response.data]);
      cancelEditing();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter function
  const filteredCourses = courses.filter((course) => {
    const courseName = course.Coursename ? course.Coursename.toLowerCase() : "";
    const trainerName = course.TrainerName
      ? course.TrainerName.toLowerCase()
      : "";
    const searchText = filterText.toLowerCase();

    return courseName.includes(searchText) || trainerName.includes(searchText);
  });

  // Enhanced Columns Configuration with Icons
  const columns = [
    {
      name: "Course Name",
      selector: (row) => row.Coursename,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          {row.URL ? (
            <a
              href={row.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              {row.Coursename || "N/A"}{" "}
              <FaExternalLinkAlt className="inline ml-1 text-xs" />
            </a>
          ) : (
            <span className="font-medium">{row.Coursename || "N/A"}</span>
          )}
        </div>
      ),
      minWidth: "200px",
    },
    {
      name: "Images",
      cell: (row) => (
        <div className="flex space-x-2">
          {row.images &&
            row.images
              .slice(0, 3)
              .map(
                (img, idx) =>
                  img && (
                    <img
                      key={idx}
                      src={img}
                      alt={row.Alttage || "Course image"}
                      className="w-12 h-12 object-cover rounded border border-gray-200"
                    />
                  )
              )}
        </div>
      ),
      width: "150px",
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      sortable: true,
      cell: (row) => (
        <span className="px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded">
          ₹{row.Price || "0"}
        </span>
      ),
      width: "100px",
    },

    {
      name: "altText",
      selector: (row) => row.altText,
      sortable: true,
      cell: (row) => (
        <span className="px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded">
          {row.altText || "NA"}
        </span>
      ),
      width: "100px",
    },

    {
      name: "Duration",
      selector: (row) => row.Durations,
      cell: (row) => (
        <span className="text-gray-500">{row.Durations || "N/A"}</span>
      ),
      width: "120px",
    },
    {
      name: "Faculty",
      selector: (row) => row.TrainerName,
      cell: (row) => (
        <span className="text-blue-600">{row.TrainerName || "N/A"}</span>
      ),
      width: "150px",
    },
    {
      name: "Last Date",
      selector: (row) => row.LastDate,
      cell: (row) => (
        <span className="px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded whitespace-nowrap">
          {row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A"}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Status",
      selector: (row) => row.InstructorCourse,
      cell: (row) => (
        <span
          className={`flex items-center ${
            row.InstructorCourse === "Published"
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {row.InstructorCourse === "Published" ? (
            <FaCheckCircle className="mr-1" />
          ) : (
            <FaTimesCircle className="mr-1" />
          )}
          {row.InstructorCourse || "N/A"}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => startEditing(row)}
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
            title="Edit"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
            title="Delete"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "100px",
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto" />
          <p className="mt-3 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto mt-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <h3 className="font-bold">Error Loading Data</h3>
          </div>
          <p className="mt-1">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaInfoCircle className="mr-2 text-blue-500" />
          Course Management
        </h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <button
            onClick={() => setEditingId("new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <FaPlusCircle className="mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(editingId === "new" || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            {editingId === "new" ? (
              <>
                <FaPlusCircle className="mr-2 text-blue-500" />
                Add New Course
              </>
            ) : (
              <>
                <FaEdit className="mr-2 text-blue-500" />
                Edit Course
              </>
            )}
          </h2>

          <form onSubmit={editingId === "new" ? handleAddSubmit : handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="Coursename"
                  value={currentCourse?.Coursename || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price*
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="Price"
                  value={currentCourse?.Price || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  altText
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="altText"
                  value={currentCourse?.altText || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Faculty
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="TrainerName"
                  value={currentCourse?.TrainerName || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="Durations"
                  value={currentCourse?.Durations || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="URL"
                  value={currentCourse?.URL || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Tag
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="Alttage"
                  value={currentCourse?.Alttage || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="LastDate"
                  value={
                    currentCourse?.LastDate
                      ? new Date(currentCourse.LastDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  name="InstructorCourse"
                  value={currentCourse?.InstructorCourse || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Published">Published</option>
                  <option value="Unpublished">Unpublished</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="CourseDescription"
                value={currentCourse?.CourseDescription || ""}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              {currentCourse?.images?.map((image, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="url"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 border border-l-0 border-gray-300 rounded-r-md"
                    onClick={() => removeImageField(index)}
                    disabled={currentCourse.images.length <= 1}
                  >
                    <FaTrash />
                  </button>
                  {image && (
                    <div className="ml-2 flex items-center">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-8 h-8 object-cover rounded border border-gray-200"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-sm flex items-center"
                onClick={addImageField}
              >
                <FaPlusCircle className="mr-1" />
                Add Another Image
              </button>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                onClick={cancelEditing}
                disabled={isSubmitting}
              >
                <FaTimesCircle className="mr-1" />
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-1" />
                    {editingId === "new" ? "Adding..." : "Updating..."}
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="mr-1" />
                    {editingId === "new" ? "Add Course" : "Update Course"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredCourses}
          pagination
          highlightOnHover
          responsive
          striped
          defaultSortFieldId={1}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          noDataComponent={
            <div className="py-8 text-center">
              <FaInfoCircle className="mx-auto text-4xl text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No courses found
              </h3>
              <p className="text-gray-500 mt-1 mb-4">
                Try adding a new course or adjusting your search
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                onClick={() => setEditingId("new")}
              >
                <FaPlusCircle className="mr-2" />
                Add New Course
              </button>
            </div>
          }
          customStyles={{
            head: {
              style: {
                backgroundColor: "#f9fafb",
                fontSize: "0.875rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#374151",
              },
            },
            headCells: {
              style: {
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              },
            },
            cells: {
              style: {
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              },
            },
            rows: {
              style: {
                "&:not(:last-of-type)": {
                  borderBottom: "1px solid #f3f4f6",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OtherCourseDisplay;
