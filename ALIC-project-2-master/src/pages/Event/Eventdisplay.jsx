import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiX, FiSave } from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

const Eventdisplay = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const editFormRef = useRef(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (isEditFormOpen && editFormRef.current) {
      // Scroll to the edit form with smooth animation
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isEditFormOpen]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://alic-website-2-1.onrender.com/event"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://alic-website-2-1.onrender.com/event/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      toast.error("Error deleting event: " + err.message);
    }
  };

  const handleEditClick = (contact) => {
    setEditingContact(contact);
    setImagePreview(
      Array.isArray(contact.images) ? contact.images[0] : contact.images
    );
    setIsEditFormOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let updatedContact = { ...editingContact };

      // If new image was uploaded
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await fetch(
          "https://alic-website-2-1.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        updatedContact.images = [uploadData.imageUrl];
      }

      const response = await fetch(
        `https://alic-website-2-1.onrender.com/event/editsave/${editingContact._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      toast.success("Event updated successfully");
      setIsEditFormOpen(false);
      fetchContacts();
    } catch (err) {
      toast.error("Error updating event: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setEditingContact((prev) => ({
      ...prev,
      Description: data,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "70px",
      compact: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={Array.isArray(row.images) ? row.images[0] : row.images}
          alt={row.Title}
          className="h-16 w-16 object-cover rounded-lg"
        />
      ),
      width: "100px",
      compact: true,
    },
    {
      name: "Title",
      selector: (row) => row.Title,
      sortable: true,
      width: "180px",
      wrap: true,
      style: {
        fontWeight: "600",
        color: "#1f2937",
      },
    },

    {
      name: "altText",
      selector: (row) => row.altText,
      width: "180px",
      wrap: true,
      compact: true,
    },

    {
      name: "Sub Title",
      selector: (row) => row.subTitle,
      width: "180px",
      wrap: true,
      compact: true,
    },
    {
      name: "Date & Time",
      cell: (row) => (
        <div className="whitespace-nowrap">
          <div className="font-medium">{formatDate(row.StartDate)}</div>
          <div className="text-sm text-gray-500">{row.Time}</div>
        </div>
      ),
      sortable: true,
      width: "150px",
      compact: true,
    },
    {
      name: "Location",
      selector: (row) => row.Location,
      width: "150px",
      wrap: true,
      compact: true,
    },
    {
      name: "Cost",
      selector: (row) => `₹${row.Cost}`,
      sortable: true,
      width: "100px",
      compact: true,
      style: {
        fontWeight: "600",
        color: "#10b981",
      },
    },
    {
      name: "Slots",
      selector: (row) => row.Slot,
      sortable: true,
      width: "100px",
      compact: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-3">
          <button
            onClick={() => handleEditClick(row)}
            className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
            title="Edit"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
            title="Delete"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
      width: "120px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      compact: true,
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.Title &&
      contact.Title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Event Manager</h1>
          <div className="w-64">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredContacts}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            striped
            responsive
            noDataComponent={
              <div className="py-8 text-center text-gray-500">
                No events found. Create your first event to get started.
              </div>
            }
            fixedHeader
            fixedHeaderScrollHeight="600px"
            dense
            customStyles={{
              headCells: {
                style: {
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#4b5563",
                  backgroundColor: "#f9fafb",
                },
              },
              cells: {
                style: {
                  fontSize: "0.875rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                },
              },
            }}
          />
        </div>

        {/* Edit Form with ref for scrolling */}
        {isEditFormOpen && (
          <div
            ref={editFormRef}
            className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Edit Event
              </h2>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Image
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        src={imagePreview}
                        alt="Event preview"
                        className="h-32 w-32 rounded-lg object-cover border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <div className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center">
                          <FaUpload className="mr-2" />
                          Upload New Image
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG or GIF (Max: 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={editingContact?.Title || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    altText*
                  </label>
                  <input
                    type="text"
                    name="altText"
                    value={editingContact?.altText || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub Title
                  </label>
                  <input
                    type="text"
                    name="subTitle"
                    value={editingContact?.subTitle || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time*
                  </label>
                  <input
                    type="text"
                    name="Time"
                    value={editingContact?.Time || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="StartDate"
                    value={
                      editingContact?.StartDate
                        ? new Date(editingContact.StartDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="Location"
                    value={editingContact?.Location || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost ($)
                  </label>
                  <input
                    type="number"
                    name="Cost"
                    value={editingContact?.Cost || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Slots
                  </label>
                  <input
                    type="number"
                    name="Slot"
                    value={editingContact?.Slot || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <CKEditor
                      editor={ClassicEditor}
                      data={editingContact?.Description || ""}
                      onChange={handleDescriptionChange}
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
                        removePlugins: ["MediaEmbed"],
                      }}
                    />
                  </div>
                  {editingContact?.Description && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Preview:
                      </h4>
                      <div
                        className="prose max-w-none text-sm"
                        dangerouslySetInnerHTML={createMarkup(
                          editingContact.Description
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsEditFormOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 font-medium"
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventdisplay;
