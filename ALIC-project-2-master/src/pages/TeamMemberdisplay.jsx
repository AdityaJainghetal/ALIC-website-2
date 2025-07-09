import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  FiTrash2,
  FiEdit,
  FiImage,
  FiSave,
  FiX,
  FiUpload,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const TeamMemberDisplay = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [editFormData, setEditFormData] = useState({
    Membername: "",
    Teamposition: "",
    desciption: "",
    phone: "",
    email: "",
    address: "",
    altText: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  // Fetch all members
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://alic-website-2-1.onrender.com/member/display"
      );
      setMembers(response.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch members"
      );
      toast.error(
        err.response?.data?.message || err.message || "Failed to fetch members"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (currentMember) {
      setEditFormData({
        Membername: currentMember.Membername || "",
        Teamposition: currentMember.Teamposition || "",
        desciption: currentMember.desciption || "",
        phone: currentMember.phone || "",
        email: currentMember.email || "",
        address: currentMember.address || "",
        altText: currentMember.altText || "",
        images: currentMember.images || [],
      });
      setImagePreviews(currentMember.images || []);
      setImageFiles([]);
    }
  }, [currentMember]);

  // Delete a member
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(
          `https://alic-website-2-1.onrender.com/member/${id}`
        );
        setMembers((prev) => prev.filter((member) => member._id !== id));
        toast.success("Team member deleted successfully");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error deleting team member"
        );
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Error deleting team member"
        );
      }
    }
  };

  // Edit a member
  const handleEdit = async (member) => {
    try {
      setLoading(true);
      // Fetch the specific member data using the getMemberById endpoint
      const response = await axios.get(
        `https://alic-website-2-1.onrender.com/member/${member._id}`
      );
      setCurrentMember(response.data);
      setIsEditing(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error fetching member details"
      );
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Error fetching member details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setCurrentMember(null);
    setIsEditing(false);
    setImagePreviews([]);
    setImageFiles([]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setEditFormData((prev) => ({
      ...prev,
      desciption: data,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    const isNewImage = index >= imagePreviews.length - imageFiles.length;

    if (isNewImage) {
      const fileIndex = index - (imagePreviews.length - imageFiles.length);
      const newFiles = [...imageFiles];
      newFiles.splice(fileIndex, 1);
      setImageFiles(newFiles);
    } else {
      const newImages = [...editFormData.images];
      newImages.splice(index, 1);
      setEditFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }

    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  // Update member data
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editFormData.Membername || !editFormData.Teamposition) {
      toast.error("Name and Position are required fields");
      return;
    }

    const formData = new FormData();

    formData.append("Membername", editFormData.Membername);
    formData.append("Teamposition", editFormData.Teamposition);
    formData.append("phone", editFormData.phone || "");
    formData.append("email", editFormData.email || "");
    formData.append("address", editFormData.address || "");
    formData.append("altText", editFormData.altText || "");
    formData.append(
      "desciption",
      DOMPurify.sanitize(editFormData.desciption || "")
    );

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      const response = await axios.put(
        `https://alic-website-2-1.onrender.com/member/editsave/${currentMember._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMembers((prev) =>
        prev.map((member) =>
          member._id === currentMember._id ? response.data.data : member
        )
      );

      toast.success("Team member updated successfully");
      handleCancelEdit();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error updating team member"
      );
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Error updating team member"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.Membername?.toLowerCase().includes(filterText.toLowerCase()) ||
        member.Teamposition?.toLowerCase().includes(filterText.toLowerCase()) ||
        member.email?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, members]);

  const columns = useMemo(
    () => [
      {
        name: "S.No",
        selector: (row, index) => index + 1,
        sortable: false,
        width: "80px",
        cell: (row, index) => <div className="text-gray-500">{index + 1}</div>,
      },
      {
        name: "Member Name",
        selector: (row) => row.Membername,
        sortable: true,
        cell: (row) => (
          <div className="font-medium text-gray-900">{row.Membername}</div>
        ),
        minWidth: "150px",
      },

      {
        name: "altText",
        selector: (row) => row.altText,
        sortable: true,
        cell: (row) => (
          <div className="font-medium text-gray-900">{row.altText}</div>
        ),
        minWidth: "150px",
      },

      {
        name: "Position",
        selector: (row) => row.Teamposition,
        sortable: true,
        cell: (row) => <div className="text-gray-600">{row.Teamposition}</div>,
        minWidth: "120px",
      },
      {
        name: "Description",
        selector: (row) => row.desciption,
        sortable: true,
        cell: (row) => (
          <div
            className="text-gray-600 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.desciption || ""),
            }}
          />
        ),
        minWidth: "200px",
      },
      {
        name: "Contact",
        selector: (row) => row.email,
        cell: (row) => (
          <div className="space-y-1">
            {row.email && (
              <div className="text-sm text-gray-600">
                <a
                  href={`mailto:${row.email}`}
                  className="hover:text-blue-600 hover:underline"
                >
                  {row.email}
                </a>
              </div>
            )}
            {row.phone && (
              <div className="text-sm text-gray-600">{row.phone}</div>
            )}
            {row.address && (
              <div className="text-sm text-gray-600">{row.address}</div>
            )}
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Images",
        cell: (row) => (
          <div className="flex flex-wrap gap-1">
            {row.images && row.images.length > 0 ? (
              row.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`${row.Membername}-${index}`}
                    className="w-12 h-12 object-cover rounded border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/60";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <a
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white p-1 hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiImage size={14} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400">
                <FiImage size={18} />
              </div>
            )}
          </div>
        ),
        ignoreRowClick: true,
        minWidth: "150px",
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(row);
              }}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
              title="Edit"
              disabled={isEditing}
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row._id);
              }}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Delete"
              disabled={isEditing}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        minWidth: "100px",
      },
    ],
    [isEditing]
  );

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        fontWeight: "600",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderTop: "1px solid #f3f4f6",
      },
    },
    rows: {
      style: {
        minHeight: "72px",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #f3f4f6",
        },
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f9fafb",
        borderTop: "1px solid #f3f4f6",
      },
    },
  };

  if (loading && !isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <div className="text-sm text-gray-500">
          {members.length} {members.length === 1 ? "member" : "members"} total
          {isEditing && (
            <span className="ml-2 text-blue-600">(Editing Mode)</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, position or email..."
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          disabled={isEditing}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <DataTable
          columns={columns}
          data={filteredMembers}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
          highlightOnHover
          striped
          responsive
          persistTableHead
          customStyles={customStyles}
          noDataComponent={
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <FiImage size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                No team members found
              </h3>
              <p className="text-gray-500 mt-1">
                Add your first team member to get started
              </p>
            </div>
          }
        />
      </div>

      {isEditing && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Team Member</h2>
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Name*
                </label>
                <input
                  type="text"
                  name="Membername"
                  value={editFormData.Membername}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
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
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position*
                </label>
                <input
                  type="text"
                  name="Teamposition"
                  value={editFormData.Teamposition}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={editFormData.desciption}
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
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images
                </label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`preview-${index}`}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  <FiUpload className="mr-2" />
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Upload new images to add to existing ones
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeamMemberDisplay;
