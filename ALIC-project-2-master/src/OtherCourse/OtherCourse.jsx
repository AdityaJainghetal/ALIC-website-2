// import React, { useState } from 'react';
// import axios from 'axios';

// // Field configurations
// const basicInfoFields = [
//   { name: 'Coursename', label: 'Course Name', type: 'text', required: true },
//   { name: 'Price', label: 'Price', type: 'number', required: true },
//   { name: 'URL', label: 'Course URL', type: 'text' },
//   { name: 'Alttage', label: 'Alt tag', type: 'text' }
// ];

// const courseDetailsFields = [
//   { name: 'TrainerName', label: 'Faculty', type: 'text' },
//   { name: 'Durations', label: 'Validity', type: 'text' },
// ];

// const descriptionFields = [
//   { name: 'CourseDescription', label: 'Description', type: 'editor' },
//   { name: 'InstructorCourse', label: 'Published/Unpublished', type: 'text' },
// ];

// const otherFields = [
//   { name: 'LastDate', label: 'Last Date to Enroll', type: 'date' },
// ];

// const CreateCourse = () => {
//   // Initialize state with all fields from configurations
//   const initialState = {};

//   // Combine all fields from all configurations
//   const allFields = [...basicInfoFields, ...courseDetailsFields, ...descriptionFields, ...otherFields];

//   // Initialize state for each field
//   allFields.forEach(field => {
//     initialState[field.name] = '';
//   });

//   // Add images array separately
//   initialState.images = [''];

//   const [courseData, setCourseData] = useState(initialState);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourseData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (index, value) => {
//     const newImages = [...courseData.images];
//     newImages[index] = value;
//     setCourseData(prev => ({
//       ...prev,
//       images: newImages
//     }));
//   };

//   const addImageField = () => {
//     setCourseData(prev => ({
//       ...prev,
//       images: [...prev.images, '']
//     }));
//   };

//   const removeImageField = (index) => {
//     const newImages = courseData.images.filter((_, i) => i !== index);
//     setCourseData(prev => ({
//       ...prev,
//       images: newImages
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError(null);

//     try {
//       await axios.post('http://localhost:8000/othercourse', courseData);
//       setSuccess(true);
//       // Reset form after successful submission
//       setCourseData(initialState);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const renderField = (field) => {
//     switch (field.type) {
//       case 'editor':
//         return (
//           <textarea
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             name={field.name}
//             value={courseData[field.name]}
//             onChange={handleChange}
//             required={field.required}
//             rows={4}
//           />
//         );
//       default:
//         return (
//           <input
//             type={field.type}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             name={field.name}
//             value={courseData[field.name]}
//             onChange={handleChange}
//             required={field.required}
//           />
//         );
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>

//       {success && (
//         <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//           Course created successfully!
//         </div>
//       )}

//       {error && (
//         <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//           Error: {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <fieldset className="p-6 border border-gray-200 rounded-lg">
//           <legend className="px-2 text-lg font-medium text-gray-700">Basic Information</legend>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {basicInfoFields.map(field => (
//               <div key={field.name} className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label} {field.required && <span className="text-red-500">*</span>}
//                 </label>
//                 {renderField(field)}
//               </div>
//             ))}
//           </div>
//         </fieldset>

//         <fieldset className="p-6 border border-gray-200 rounded-lg">
//           <legend className="px-2 text-lg font-medium text-gray-700">Course Details</legend>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {courseDetailsFields.map(field => (
//               <div key={field.name} className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 {renderField(field)}
//               </div>
//             ))}
//           </div>
//         </fieldset>

//         <fieldset className="p-6 border border-gray-200 rounded-lg">
//           <legend className="px-2 text-lg font-medium text-gray-700">Description</legend>
//           <div className="space-y-6">
//             {descriptionFields.map(field => (
//               <div key={field.name} className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 {renderField(field)}
//               </div>
//             ))}
//           </div>
//         </fieldset>

//         <fieldset className="p-6 border border-gray-200 rounded-lg">
//           <legend className="px-2 text-lg font-medium text-gray-700">Other Information</legend>
//           <div className="space-y-6">
//             {otherFields.map(field => (
//               <div key={field.name} className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 {renderField(field)}
//               </div>
//             ))}

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Images</label>
//               {courseData.images.map((image, index) => (
//                 <div key={index} className="flex space-x-2 items-center">
//                   <input
//                     type="url"
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     value={image}
//                     onChange={(e) => handleImageChange(index, e.target.value)}
//                     placeholder="Image URL"
//                   />
//                   {courseData.images.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeImageField(index)}
//                       className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addImageField}
//                 className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Add Another Image
//               </button>
//             </div>
//           </div>
//         </fieldset>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={submitting}
//             className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {submitting ? 'Submitting...' : 'Create Course'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCourse;
import React, { useState } from "react";
import axios from "axios";
import {
  FiDollarSign,
  FiClock,
  FiUser,
  FiCalendar,
  FiLink,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    Price: "",
    Durations: "",
    TrainerName: "",
    LastDate: "",
    CourseDescription: "",
    Coursename: "",
    altText: "",
    InstructorCourse: "Published",
    URL: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (name, value) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 5 images",
      }));
      return;
    }

    const newPreviews = [];
    const validFiles = files.slice(0, 5 - imageFiles.length);
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push(event.target.result);
        if (newPreviews.length === validFiles.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImageFiles((prev) => [...prev, ...validFiles]);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append all course data fields
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image files
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post("http://localhost:8000/othercourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      // Reset form after successful submission
      setCourseData({
        Price: "",
        Durations: "",
        TrainerName: "",
        LastDate: "",
        CourseDescription: "",
        altText: "",
        Coursename: "",
        InstructorCourse: "Published",
        URL: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Course
      </h2>

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Course created successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              Price (₹)
            </label>
            <input
              type="number"
              name="Price"
              value={courseData.Price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiClock className="mr-2" /> Coursename
            </label>
            <input
              type="text"
              name="Coursename"
              value={courseData.Coursename}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiClock className="mr-2" /> Duration
            </label>
            <input
              type="text"
              name="Durations"
              value={courseData.Durations}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiUser className="mr-2" /> Trainer Name
            </label>
            <input
              type="text"
              name="TrainerName"
              value={courseData.TrainerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiUser className="mr-2" /> AltText
            </label>
            <input
              type="text"
              name="altText"
              value={courseData.altText}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiCalendar className="mr-2" /> Last Date to Enroll
            </label>
            <input
              type="date"
              name="LastDate"
              value={courseData.LastDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiLink className="mr-2" /> Course URL
            </label>
            <input
              type="url"
              name="URL"
              value={courseData.URL}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="InstructorCourse"
              value={courseData.InstructorCourse}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Course Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={courseData.CourseDescription}
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Images (Max 5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {errors.images && (
            <p className="mt-2 text-sm text-red-600">{errors.images}</p>
          )}

          {/* Image previews */}
          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
