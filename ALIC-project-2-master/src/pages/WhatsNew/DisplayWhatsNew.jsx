// import React, { useState, useEffect, useRef } from 'react';
// import DataTable from 'react-data-table-component';
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiX, FiSave } from 'react-icons/fi';
// import { fetchcategory } from '../../api';
// import DOMPurify from 'dompurify';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const WhatsNewDisplay = () => {
//   const [whatsNew, setWhatsNew] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterText, setFilterText] = useState('');
//   const [editingItem, setEditingItem] = useState(null);
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const editFormRef = useRef(null);

//   useEffect(() => {
//     fetchWhatsNew();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (isEditFormOpen && editFormRef.current) {
//       editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }
//   }, [isEditFormOpen]);

//   const fetchWhatsNew = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/whatsnew/alldisplay');
//       if (!response.ok) throw new Error('Failed to fetch entries');

//       const data = await response.json();
//       const whatsNewArray = Array.isArray(data.data) ? data.data : [];
//       setWhatsNew(whatsNewArray);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       toast.error('Error fetching entries: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to load categories. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this entry?');
//     if (!confirm) return;

//     try {
//       const response = await fetch(`http://localhost:8000/whatsnew/delete/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) throw new Error('Failed to delete entry');

//       setWhatsNew(prev => prev.filter(item => item._id !== id));
//       toast.success('Entry deleted successfully');
//     } catch (err) {
//       toast.error('Error deleting entry: ' + err.message);
//     }
//   };

//   const handleEditClick = (item) => {
//     setEditingItem({
//       ...item,
//       category: item.category?._id || ''
//     });
//     setIsEditFormOpen(true);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
//       formData.append('title', editingItem.Coursename);
//       formData.append('description', editingItem.CourseDescription);
//       formData.append('category', editingItem.category);

//       if (editingItem.newImages) {
//         formData.append('images', editingItem.newImages);
//       }

//       if (editingItem.newPDF) {
//         formData.append('PDFbrochure', editingItem.newPDF);
//       }

//       const response = await fetch(`http://localhost:8000/whatsnew/editsave/${editingItem._id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Failed to update entry');

//       toast.success('Entry updated successfully');
//       setIsEditFormOpen(false);
//       fetchWhatsNew();
//     } catch (err) {
//       toast.error('Error updating entry: ' + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingItem(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditingItem(prev => ({
//       ...prev,
//       CourseDescription: data
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setEditingItem(prev => ({
//       ...prev,
//       [name]: files[0]
//     }));
//   };

//   // Function to strip all HTML tags from description
//   const stripHtmlTags = (html) => {
//     if (!html) return '';
//     return html.replace(/<[^>]*>?/gm, '').substring(0, 100) + (html.length > 100 ? '...' : '');
//   };

//   const columns = [
//     {
//       name: 'S.No',
//       cell: (row, index) => index + 1,
//       width: '80px'
//     },
//     {
//       name: 'Title',
//       selector: row => row.Coursename,
//       sortable: true,
//       cell: row => <span className="font-medium">{row.Coursename}</span>
//     },
//     {
//       name: 'Description',
//       selector: row => row.CourseDescription,
//       cell: row => (
//         <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">
//           {stripHtmlTags(row.CourseDescription)}
//         </div>
//       )
//     },
//     {
//       name: 'Category',
//       selector: row => row.category?.name || 'N/A',
//       sortable: true
//     },
//     {
//       name: 'Image',
//       cell: row => (
//         row.images && row.images.length > 0 ? (
//           <div className="flex items-center">
//             <img
//               src={Array.isArray(row.images) ? row.images[0] : row.images}
//               alt="Course"
//               className="w-16 h-16 object-cover rounded-md"
//             />
//             {Array.isArray(row.images) && row.images.length > 1 && (
//               <span className="ml-1 text-xs text-gray-500">+{row.images.length - 1}</span>
//             )}
//           </div>
//         ) : 'None'
//       ),
//       width: '120px'
//     },
//     {
//       name: 'PDF Brochure',
//       cell: row => (
//         row.PDFbrochure ? (
//           <a href={row.PDFbrochure} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//             View PDF
//           </a>
//         ) : 'None'
//       ),
//       width: '120px'
//     },
//     {
//       name: 'Created At',
//       selector: row => row.createdAt,
//       sortable: true,
//       cell: row => {
//         const date = new Date(row.createdAt);
//         return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//       }
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEditClick(row)}
//             className="text-blue-500 hover:text-blue-700"
//             title="Edit"
//           >
//             <FaEdit />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="text-red-500 hover:text-red-700"
//             title="Delete"
//           >
//             <FaTrash />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       width: '100px'
//     },
//   ];

//   const filteredWhatsNew = whatsNew.filter(item =>
//     [item.Coursename, item.CourseDescription, item.category?.name]
//       .some(field => field?.toLowerCase().includes(filterText.toLowerCase()))
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <p className="text-gray-700">Loading entries...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">WhatsNew Entries</h1>

//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search by title, description or category..."
//             className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
//             value={filterText}
//             onChange={e => setFilterText(e.target.value)}
//           />
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredWhatsNew}
//           pagination
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent="No entries found."
//         />

//         {/* Edit Form */}
//         {isEditFormOpen && (
//           <div ref={editFormRef} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Edit WhatsNew Entry
//               </h2>
//               <button
//                 onClick={() => setIsEditFormOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSaveEdit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   type="text"
//                   name="Coursename"
//                   value={editingItem?.Coursename || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               {/*
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <CKEditor

//                   editor={ClassicEditor}
//                   data={editingItem?.CourseDescription || ''}
//                   onChange={handleEditorChange}
//                   config={{
//                     toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
//                   }}
//                 />
//               </div> */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <div className="hide-editor-images"> {/* Add a wrapper div */}
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={editingItem?.CourseDescription || ''}
//                     onChange={handleEditorChange}
//                     config={{
//                       toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
//                     }}
//                   />
//                 </div>
//               </div>

//               <style>{`
//   .hide-editor-images .ck-content img {
//     display: none !important;
//   }
// `}</style>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select
//                   name="category"
//                   value={editingItem?.category || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map(category => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Image (Leave empty to keep current)
//                   </label>
//                   <input
//                     type="file"
//                     name="newImages"
//                     onChange={handleFileChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     accept="image/*"
//                   />
//                   {editingItem?.images && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500 mb-1">Current Image:</p>
//                       {Array.isArray(editingItem.images) ? (
//                         <div className="flex flex-wrap gap-2">
//                           {editingItem.images.map((img, index) => (
//                             <img
//                               key={index}
//                               src={img}
//                               alt={`Current ${index}`}
//                               className="w-20 h-20 object-cover rounded-md"
//                             />
//                           ))}
//                         </div>
//                       ) : (
//                         <img
//                           src={editingItem.images}
//                           alt="Current"
//                           className="w-20 h-20 object-cover rounded-md"
//                         />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     PDF Brochure (Leave empty to keep current)
//                   </label>
//                   <input
//                     type="file"
//                     name="newPDF"
//                     onChange={handleFileChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     accept=".pdf"
//                   />
//                   {editingItem?.PDFbrochure && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500">Current PDF: {editingItem.PDFbrochure.split('/').pop()}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditFormOpen(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave size={18} />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WhatsNewDisplay;

// import React, { useState, useEffect, useRef } from 'react';
// import DataTable from 'react-data-table-component';
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiX, FiSave } from 'react-icons/fi';
// import { fetchcategory } from '../../api';
// import DOMPurify from 'dompurify';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const WhatsNewDisplay = () => {
//   const [whatsNew, setWhatsNew] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterText, setFilterText] = useState('');
//   const [editingItem, setEditingItem] = useState(null);
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const editFormRef = useRef(null);

//   useEffect(() => {
//     fetchWhatsNew();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (isEditFormOpen && editFormRef.current) {
//       editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }
//   }, [isEditFormOpen]);

//   const fetchWhatsNew = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/whatsnew/alldisplay');
//       if (!response.ok) throw new Error('Failed to fetch entries');

//       const data = await response.json();
//       const whatsNewArray = Array.isArray(data.data) ? data.data : [];
//       setWhatsNew(whatsNewArray);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       toast.error('Error fetching entries: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to load categories. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this entry?');
//     if (!confirm) return;

//     try {
//       const response = await fetch(`http://localhost:8000/whatsnew/delete/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) throw new Error('Failed to delete entry');

//       setWhatsNew(prev => prev.filter(item => item._id !== id));
//       toast.success('Entry deleted successfully');
//     } catch (err) {
//       toast.error('Error deleting entry: ' + err.message);
//     }
//   };

//   const handleEditClick = (item) => {
//     setEditingItem({
//       ...item,
//       category: item.category?._id || '',
//       altText: item.altText || ''
//     });
//     setIsEditFormOpen(true);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
//       formData.append('title', editingItem.Coursename);
//       formData.append('description', editingItem.CourseDescription);
//       formData.append('category', editingItem.category);
//       formData.append('altText', editingItem.altText);

//       if (editingItem.newImages) {
//         Array.from(editingItem.newImages).forEach(file => {
//           formData.append('images', file);
//         });
//       }

//       if (editingItem.newPDF) {
//         formData.append('PDFbrochure', editingItem.newPDF);
//       }

//       const response = await fetch(`http://localhost:8000/whatsnew/editsave/${editingItem._id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Failed to update entry');

//       toast.success('Entry updated successfully');
//       setIsEditFormOpen(false);
//       fetchWhatsNew();
//     } catch (err) {
//       toast.error('Error updating entry: ' + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingItem(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditingItem(prev => ({
//       ...prev,
//       CourseDescription: data
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setEditingItem(prev => ({
//       ...prev,
//       [name]: files
//     }));
//   };

//   const stripHtmlTags = (html) => {
//     if (!html) return '';
//     return html.replace(/<[^>]*>?/gm, '').substring(0, 100) + (html.length > 100 ? '...' : '');
//   };

//   const columns = [
//     {
//       name: 'S.No',
//       cell: (row, index) => index + 1,
//       width: '80px'
//     },
//     {
//       name: 'Title',
//       selector: row => row.Coursename,
//       sortable: true,
//       cell: row => <span className="font-medium">{row.Coursename}</span>
//     },
//     {
//       name: 'Description',
//       selector: row => row.CourseDescription,
//       cell: row => (
//         <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">
//           {stripHtmlTags(row.CourseDescription)}
//         </div>
//       )
//     },
//     {
//       name: 'Category',
//       selector: row => row.category?.name || 'N/A',
//       sortable: true
//     },
//     {
//       name: 'Alt Text',
//       selector: row => row.altText || 'N/A',
//       sortable: true
//     },
//     {
//       name: 'Image',
//       cell: row => (
//         row.images && row.images.length > 0 ? (
//           <div className="flex items-center">
//             <img
//               src={Array.isArray(row.images) ? row.images[0] : row.images}
//               alt="Course"
//               className="w-16 h-16 object-cover rounded-md"
//             />
//             {Array.isArray(row.images) && row.images.length > 1 && (
//               <span className="ml-1 text-xs text-gray-500">+{row.images.length - 1}</span>
//             )}
//           </div>
//         ) : 'None'
//       ),
//       width: '120px'
//     },
//     {
//       name: 'PDF Brochure',
//       cell: row => (
//         row.PDFbrochure ? (
//           <a href={row.PDFbrochure} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//             View PDF
//           </a>
//         ) : 'None'
//       ),
//       width: '120px'
//     },
//     {
//       name: 'Created At',
//       selector: row => row.createdAt,
//       sortable: true,
//       cell: row => {
//         const date = new Date(row.createdAt);
//         return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//       }
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEditClick(row)}
//             className="text-blue-500 hover:text-blue-700"
//             title="Edit"
//           >
//             <FaEdit />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="text-red-500 hover:text-red-700"
//             title="Delete"
//           >
//             <FaTrash />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       width: '100px'
//     },
//   ];

//   const filteredWhatsNew = whatsNew.filter(item =>
//     [item.Coursename, item.CourseDescription, item.category?.name, item.altText]
//       .some(field => field?.toLowerCase().includes(filterText.toLowerCase()))
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <p className="text-gray-700">Loading entries...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">WhatsNew Entries</h1>

//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search by title, description, alt text or category..."
//             className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
//             value={filterText}
//             onChange={e => setFilterText(e.target.value)}
//           />
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredWhatsNew}
//           pagination
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent="No entries found."
//         />

//         {/* Edit Form */}
//         {isEditFormOpen && (
//           <div ref={editFormRef} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Edit WhatsNew Entry
//               </h2>
//               <button
//                 onClick={() => setIsEditFormOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSaveEdit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   type="text"
//                   name="Coursename"
//                   value={editingItem?.Coursename || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <div className="hide-editor-images">
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={editingItem?.CourseDescription || ''}
//                     onChange={handleEditorChange}
//                     config={{
//                       toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
//                     }}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
//                 <input
//                   type="text"
//                   name="altText"
//                   value={editingItem?.altText || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select
//                   name="category"
//                   value={editingItem?.category || ''}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map(category => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Images (Leave empty to keep current)
//                   </label>
//                   <input
//                     type="file"
//                     name="newImages"
//                     onChange={handleFileChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     accept="image/*"
//                     multiple
//                   />
//                   {editingItem?.images && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500 mb-1">Current Images:</p>
//                       {Array.isArray(editingItem.images) ? (
//                         <div className="flex flex-wrap gap-2">
//                           {editingItem.images.map((img, index) => (
//                             <img
//                               key={index}
//                               src={img}
//                               alt={`Current ${index}`}
//                               className="w-20 h-20 object-cover rounded-md"
//                             />
//                           ))}
//                         </div>
//                       ) : (
//                         <img
//                           src={editingItem.images}
//                           alt="Current"
//                           className="w-20 h-20 object-cover rounded-md"
//                         />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     PDF Brochure (Leave empty to keep current)
//                   </label>
//                   <input
//                     type="file"
//                     name="newPDF"
//                     onChange={handleFileChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     accept=".pdf"
//                   />
//                   {editingItem?.PDFbrochure && (
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500">Current PDF: {editingItem.PDFbrochure.split('/').pop()}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditFormOpen(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave size={18} />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//       <style>{`
//         .hide-editor-images .ck-content img {
//           display: none !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WhatsNewDisplay;

import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiX, FiSave } from "react-icons/fi";
import { fetchcategory } from "../../api";
import DOMPurify from "dompurify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WhatsNewDisplay = () => {
  const [whatsNew, setWhatsNew] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editFormRef = useRef(null);

  useEffect(() => {
    fetchWhatsNew();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditFormOpen && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isEditFormOpen]);

  const fetchWhatsNew = async () => {
    try {
      const response = await fetch("http://localhost:8000/whatsnew/alldisplay");
      if (!response.ok) throw new Error("Failed to fetch entries");

      const data = await response.json();
      const whatsNewArray = Array.isArray(data.data) ? data.data : [];
      setWhatsNew(whatsNewArray);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Error fetching entries: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:8000/whatsnew/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete entry");

      setWhatsNew((prev) => prev.filter((item) => item._id !== id));
      toast.success("Entry deleted successfully");
    } catch (err) {
      toast.error("Error deleting entry: " + err.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem({
      ...item,
      category: item.category?._id || "",
      altText: item.altText || "",
      newImages: null,
      newPDF: null,
    });
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", editingItem.Coursename);
      formData.append("description", editingItem.CourseDescription);
      formData.append("category", editingItem.category);
      formData.append("altText", editingItem.altText);

      // Handle image updates
      if (editingItem.newImages && editingItem.newImages.length > 0) {
        // Remove old images if new ones are being uploaded
        formData.append("removeOldImages", "true");

        // Append each new image file
        Array.from(editingItem.newImages).forEach((file) => {
          formData.append("images", file);
        });
      }

      // Handle PDF update
      if (editingItem.newPDF && editingItem.newPDF.length > 0) {
        formData.append("PDFbrochure", editingItem.newPDF[0]);
      }

      const response = await fetch(
        `http://localhost:8000/whatsnew/editsave/${editingItem._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update entry");
      }

      toast.success("Entry updated successfully");
      setIsEditFormOpen(false);
      fetchWhatsNew();
    } catch (err) {
      console.error("Update error:", err);
      toast.error(
        "Error updating entry: " + (err.message || "Please try again")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditingItem((prev) => ({
      ...prev,
      CourseDescription: data,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditingItem((prev) => ({
      ...prev,
      [name]: files,
    }));
  };

  const handleRemoveImage = (index) => {
    if (Array.isArray(editingItem.images)) {
      const updatedImages = [...editingItem.images];
      updatedImages.splice(index, 1);
      setEditingItem((prev) => ({
        ...prev,
        images: updatedImages.length > 0 ? updatedImages : null,
      }));
    } else {
      setEditingItem((prev) => ({
        ...prev,
        images: null,
      }));
    }
  };

  const stripHtmlTags = (html) => {
    if (!html) return "";
    return (
      html.replace(/<[^>]*>?/gm, "").substring(0, 100) +
      (html.length > 100 ? "..." : "")
    );
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Title",
      selector: (row) => row.Coursename,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.Coursename}</span>,
    },
    {
      name: "Description",
      selector: (row) => row.CourseDescription,
      cell: (row) => (
        <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">
          {stripHtmlTags(row.CourseDescription)}
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category?.name || "N/A",
      sortable: true,
    },
    {
      name: "Alt Text",
      selector: (row) => row.altText || "N/A",
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.images && row.images.length > 0 ? (
          <div className="flex items-center">
            <img
              src={Array.isArray(row.images) ? row.images[0] : row.images}
              alt="Course"
              className="w-16 h-16 object-cover rounded-md"
            />
            {Array.isArray(row.images) && row.images.length > 1 && (
              <span className="ml-1 text-xs text-gray-500">
                +{row.images.length - 1}
              </span>
            )}
          </div>
        ) : (
          "None"
        ),
      width: "120px",
    },
    {
      name: "PDF Brochure",
      cell: (row) =>
        row.PDFbrochure ? (
          <a
            href={row.PDFbrochure}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View PDF
          </a>
        ) : (
          "None"
        ),
      width: "120px",
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => {
        const date = new Date(row.createdAt);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "100px",
    },
  ];

  const filteredWhatsNew = whatsNew.filter((item) =>
    [
      item.Coursename,
      item.CourseDescription,
      item.category?.name,
      item.altText,
    ].some((field) => field?.toLowerCase().includes(filterText.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading entries...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          WhatsNew Entries
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title, description, alt text or category..."
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredWhatsNew}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No entries found."
        />

        {isEditFormOpen && (
          <div
            ref={editFormRef}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit WhatsNew Entry
              </h2>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="Coursename"
                  value={editingItem?.Coursename || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="hide-editor-images">
                  <CKEditor
                    editor={ClassicEditor}
                    data={editingItem?.CourseDescription || ""}
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
                      ],
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  name="altText"
                  value={editingItem?.altText || ""}
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
                  value={editingItem?.category || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images (Leave empty to keep current)
                  </label>
                  <input
                    type="file"
                    name="newImages"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/*"
                    multiple
                  />
                  {editingItem?.images && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">
                        Current Images:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(editingItem.images) ? (
                          editingItem.images.map((img, index) => (
                            <div key={index} className="relative">
                              <img
                                src={img}
                                alt={`Current ${index}`}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="relative">
                            <img
                              src={editingItem.images}
                              alt="Current"
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(0)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PDF Brochure (Leave empty to keep current)
                  </label>
                  <input
                    type="file"
                    name="newPDF"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".pdf"
                  />
                  {editingItem?.PDFbrochure && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Current PDF: {editingItem.PDFbrochure.split("/").pop()}
                      </p>
                    </div>
                  )}
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
      <style>{`
        .hide-editor-images .ck-content img {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default WhatsNewDisplay;
