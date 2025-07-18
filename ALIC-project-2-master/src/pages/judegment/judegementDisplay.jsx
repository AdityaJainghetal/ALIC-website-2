import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ChevronUp,
  ChevronDown,
  X,
  Edit,
  Trash2,
  Plus,
  Save,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const JudgementDisplay = () => {
  const [judgements, setJudgements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingJudgement, setEditingJudgement] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    publicerName: "",
    lastDate: "",
    category: "",
    altText: "",
    images: [],
    newImages: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetchJudgements();
    fetchCategories();
  }, []);

  const fetchJudgements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/judement/display"
      );
      const formattedJudgements = response.data.map((judgement) => ({
        ...judgement,
        images: judgement.images
          ? Array.isArray(judgement.images)
            ? judgement.images.map((img) =>
                img.startsWith("http") ? img : `http://localhost:8000/${img}`
              )
            : [`http://localhost:8000/${judgement.images}`]
          : [],
      }));
      setJudgements(formattedJudgements);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error("Error fetching judgements: " + err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/judementcategory"
      );
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Unexpected categories format:", response.data);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  const deleteJudgement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this judgement?"))
      return;
    try {
      await axios.delete(`http://localhost:8000/judement/${id}`);
      setJudgements((prev) => prev.filter((j) => j._id !== id));
      toast.success("Judgement deleted successfully");
    } catch (err) {
      toast.error("Failed to delete judgement");
    }
  };

  const handleEditClick = (judgement) => {
    setEditFormData({
      title: judgement.title,
      subTitle: judgement.subTitle || "",
      description: judgement.description || "",
      publicerName: judgement.publicerName || "",
      lastDate: judgement.lastDate ? judgement.lastDate.split("T")[0] : "",
      category: judgement.category?._id || "",
      images: judgement.images || [],
      altText: judgement.altText || "",
      newImages: null,
    });
    setEditingJudgement(judgement._id);
    setIsEditFormOpen(true);
  };

  const handleAddNew = () => {
    setEditFormData({
      title: "",
      subTitle: "",
      description: "",
      publicerName: "",
      lastDate: "",
      category: "",
      altText: "",
      images: [],
      newImages: null,
    });
    setEditingJudgement(null);
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("title", editFormData.title);
      formData.append("subTitle", editFormData.subTitle);
      formData.append("description", editFormData.description);
      formData.append("publicerName", editFormData.publicerName);
      formData.append("lastDate", editFormData.lastDate);
      formData.append("category", editFormData.category);
      formData.append("altText", editFormData.altText);

      if (editFormData.newImages) {
        Array.from(editFormData.newImages).forEach((file) => {
          formData.append("images", file);
        });
      }

      let response;
      if (editingJudgement) {
        formData.append("id", editingJudgement);
        response = await axios.put(
          `http://localhost:8000/judement/editsave/${editingJudgement}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8000/judement/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      const updatedJudgement = {
        ...response.data,
        images: response.data.images
          ? Array.isArray(response.data.images)
            ? response.data.images.map((img) =>
                img.startsWith("http") ? img : `http://localhost:8000/${img}`
              )
            : [`http://localhost:8000/${response.data.images}`]
          : [],
      };

      if (editingJudgement) {
        setJudgements((prev) =>
          prev.map((j) => (j._id === editingJudgement ? updatedJudgement : j))
        );
      } else {
        setJudgements((prev) => [...prev, updatedJudgement]);
      }

      toast.success(
        `Judgement ${editingJudgement ? "updated" : "created"} successfully`
      );
      setIsEditFormOpen(false);
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        `Error ${editingJudgement ? "updating" : "creating"} judgement: ${
          err.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      newImages: e.target.files,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditFormData((prev) => ({
      ...prev,
      description: data,
    }));
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredJudgements = judgements.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.publicerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.altText?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const sortedJudgements = [...filteredJudgements].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedJudgements.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedJudgements.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="inline ml-1 h-4 w-4" />
    );
  };

  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeImageModal = () => setSelectedImage(null);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Judgements</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Judgement
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search judgements..."
          className="pl-10 pr-4 py-2 w-full md:w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Images
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort("publicerName")}
              >
                Publisher {getSortIcon("publicerName")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort("title")}
              >
                Title {getSortIcon("title")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort("subTitle")}
              >
                Sub Title {getSortIcon("subTitle")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Alt tag
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort("lastDate")}
              >
                Last Date {getSortIcon("lastDate")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((judgement, index) => (
              <tr key={judgement._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {judgement.images?.length > 0 ? (
                    <div className="flex space-x-2">
                      {judgement.images.slice(0, 2).map((img, i) => (
                        <button
                          key={i}
                          onClick={() => openImageModal(img)}
                          className="hover:opacity-75"
                        >
                          <img
                            src={img}
                            alt="preview"
                            className="h-10 w-10 object-cover rounded border"
                          />
                        </button>
                      ))}
                      {judgement.images.length > 2 && (
                        <button
                          onClick={() => openImageModal(judgement.images[2])}
                          className="flex items-center justify-center h-10 w-10 rounded bg-gray-100 text-gray-500 text-xs"
                        >
                          +{judgement.images.length - 2}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="h-10 w-10 border-2 border-dashed rounded flex items-center justify-center text-gray-400">
                      <ImageIcon size={16} />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {judgement.publicerName || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {judgement.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {judgement.subTitle || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {judgement.altText || "N/A"}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {judgement.judementCategory?.name || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  <div
                    className={`overflow-hidden ${
                      expandedDescriptions[judgement._id] ? "" : "line-clamp-3"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: judgement.description || "N/A",
                    }}
                  />
                  {judgement.description &&
                    judgement.description.length > 150 && (
                      <button
                        onClick={() => toggleDescription(judgement._id)}
                        className="text-blue-500 text-xs mt-1 hover:underline"
                      >
                        {expandedDescriptions[judgement._id]
                          ? "Show less"
                          : "Read more"}
                      </button>
                    )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {judgement.lastDate
                    ? new Date(judgement.lastDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(judgement)}
                      className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteJudgement(judgement._id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredJudgements.length)} of{" "}
            {filteredJudgements.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === page ? "bg-blue-500 text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredJudgements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No judgements found matching your search criteria
        </div>
      )}

      {/* Edit Form (positioned below the table) */}
      {isEditFormOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingJudgement ? "Edit Judgement" : "Add New Judgement"}
            </h2>
            <button
              onClick={() => setIsEditFormOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Title
                </label>
                <input
                  type="text"
                  name="subTitle"
                  value={editFormData.subTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  altText
                </label>
                <input
                  type="text"
                  name="altText"
                  value={editFormData.altText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publisher Name
                </label>
                <input
                  type="text"
                  name="publicerName"
                  value={editFormData.publicerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Last Date
                </label>
                <input
                  type="date"
                  name="lastDate"
                  value={editFormData.lastDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={editFormData.description}
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
                    "blockQuote",
                    "undo",
                    "redo",
                  ],
                }}
              />
            </div>

            {editFormData.images?.length > 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Images
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editFormData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Current ${index}`}
                        className="w-20 h-14 object-cover rounded border hover:shadow-md transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {editingJudgement ? "Update Images" : "Upload Images"}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-gray-600 justify-center">
                    <ImageIcon size={24} />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload files</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditFormOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingJudgement ? "Update Judgement" : "Create Judgement"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Image Preview</h3>
              <button
                onClick={closeImageModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgementDisplay;
