// import React, { useState } from 'react'
// import axios from 'axios'
// import { Upload, X, CheckCircle } from 'react-feather'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const Banner = () => {
//   const [imageFiles, setImageFiles] = useState([])
//   const [imagePreviews, setImagePreviews] = useState([])
//   const [url, setUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files)

//     if (files.length + imageFiles.length > 5) {
//       toast.error('You can upload a maximum of 5 images')
//       return
//     }

//     setImageFiles((prev) => [...prev, ...files.slice(0, 5 - prev.length)])

//     const newPreviews = []
//     files.slice(0, 5 - imageFiles.length).forEach((file) => {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         newPreviews.push(e.target.result)
//         if (
//           newPreviews.length === files.length ||
//           newPreviews.length === 5 - imageFiles.length
//         ) {
//           setImagePreviews((prev) => [...prev, ...newPreviews])
//         }
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const removeImage = (index) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!url) {
//       toast.error('URL is required')
//       return
//     }

//     if (imageFiles.length === 0) {
//       toast.error('Please upload at least one image')
//       return
//     }

//     setLoading(true)
//     setSuccess(false)

//     const formData = new FormData()
//     formData.append('URL', url)
//     imageFiles.forEach((file) => formData.append('images', file))

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/banner/create',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       )

//       console.log('Banner uploaded:', response.data)
//       toast.success('Banner added successfully!')
//       setSuccess(true)
//       setUrl('')
//       setImageFiles([])
//       setImagePreviews([])
//     } catch (err) {
//       console.error('Error uploading banner:', err)
//       toast.error('Something went wrong while uploading')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">Banner Registration</h2>

//       {/* URL Input */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">URL</label>
//         <input
//           type="url"
//           name="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div>

//       {/* Image Previews */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Banner Images
//         </label>

//         {imagePreviews.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={preview}
//                   alt={`Preview ${index + 1}`}
//                   className="h-24 w-24 object-cover rounded-md border border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Upload Button */}
//         <label
//           className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
//             imageFiles.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           <div className="flex flex-col items-center space-y-2">
//             <Upload className="w-6 h-6 text-gray-500" />
//             <span className="font-medium text-gray-600">
//               Drop files or
//               <span className="text-primary-600 underline ml-1">browse</span>
//             </span>
//             <span className="text-xs text-gray-500">
//               {imageFiles.length >= 5
//                 ? 'Maximum 5 images reached'
//                 : `Upload up to 5 images (${imageFiles.length}/5)`}
//             </span>
//           </div>
//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//             className="hidden"
//             disabled={imageFiles.length >= 5}
//           />
//         </label>
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//             loading ? 'opacity-70 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Adding Banner...' : 'Add Banner'}
//         </button>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </form>
//   )
// }

// export default Banner

// import React, { useState } from 'react'
// import axios from 'axios'
// import { Upload, X, CheckCircle } from 'react-feather'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const Banner = () => {
//   const [imageFiles, setImageFiles] = useState([])
//   const [imagePreviews, setImagePreviews] = useState([])
//   const [altImageFiles, setAltImageFiles] = useState([])
//   const [altImagePreviews, setAltImagePreviews] = useState([])
//   const [url, setUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleImageChange = (e, isAlternative = false) => {
//     const files = Array.from(e.target.files)

//     if (isAlternative) {
//       if (files.length + altImageFiles.length > 5) {
//         toast.error('You can upload a maximum of 5 alternative images')
//         return
//       }

//       setAltImageFiles((prev) => [...prev, ...files.slice(0, 5 - prev.length)])

//       const newPreviews = []
//       files.slice(0, 5 - altImageFiles.length).forEach((file) => {
//         const reader = new FileReader()
//         reader.onload = (e) => {
//           newPreviews.push(e.target.result)
//           if (
//             newPreviews.length === files.length ||
//             newPreviews.length === 5 - altImageFiles.length
//           ) {
//             setAltImagePreviews((prev) => [...prev, ...newPreviews])
//           }
//         }
//         reader.readAsDataURL(file)
//       })
//     } else {
//       if (files.length + imageFiles.length > 5) {
//         toast.error('You can upload a maximum of 5 main images')
//         return
//       }

//       setImageFiles((prev) => [...prev, ...files.slice(0, 5 - prev.length)])

//       const newPreviews = []
//       files.slice(0, 5 - imageFiles.length).forEach((file) => {
//         const reader = new FileReader()
//         reader.onload = (e) => {
//           newPreviews.push(e.target.result)
//           if (
//             newPreviews.length === files.length ||
//             newPreviews.length === 5 - imageFiles.length
//           ) {
//             setImagePreviews((prev) => [...prev, ...newPreviews])
//           }
//         }
//         reader.readAsDataURL(file)
//       })
//     }
//   }

//   const removeImage = (index, isAlternative = false) => {
//     if (isAlternative) {
//       setAltImageFiles((prev) => prev.filter((_, i) => i !== index))
//       setAltImagePreviews((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index))
//       setImagePreviews((prev) => prev.filter((_, i) => i !== index))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!url) {
//       toast.error('URL is required')
//       return
//     }

//     if (imageFiles.length === 0) {
//       toast.error('Please upload at least one main image')
//       return
//     }

//     setLoading(true)
//     setSuccess(false)

//     const formData = new FormData()
//     formData.append('URL', url)

//     // Append main images
//     imageFiles.forEach((file) => formData.append('images', file))

//     // Append alternative images
//     altImageFiles.forEach((file) => formData.append('alternativeImages', file))

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/banner/create',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       )

//       console.log('Banner uploaded:', response.data)
//       toast.success('Banner added successfully!')
//       setSuccess(true)
//       setUrl('')
//       setImageFiles([])
//       setImagePreviews([])
//       setAltImageFiles([])
//       setAltImagePreviews([])
//     } catch (err) {
//       console.error('Error uploading banner:', err)
//       toast.error('Something went wrong while uploading')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">Banner Registration</h2>

//       {/* URL Input */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">URL</label>
//         <input
//           type="url"
//           name="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div>

//       {/* Main Image Previews */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Main Banner Images <span>( Width: 1200px Height: 650px )</span>
//         </label>

//         {imagePreviews.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
//             {imagePreviews.map((preview, index) => (
//               <div key={`main-${index}`} className="relative group">
//                 <img
//                   src={preview}
//                   alt={`Main Preview ${index + 1}`}
//                   className="h-24 w-24 object-cover rounded-md border border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Main Upload Button */}
//         <label
//           className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
//             imageFiles.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           <div className="flex flex-col items-center space-y-2">
//             <Upload className="w-6 h-6 text-gray-500" />
//             <span className="font-medium text-gray-600">
//               Drop files or
//               <span className="text-primary-600 underline ml-1">browse</span>
//             </span>
//             <span className="text-xs text-gray-500">
//               {imageFiles.length >= 5
//                 ? 'Maximum 5 main images reached'
//                 : `Upload up to 5 main images (${imageFiles.length}/5)`}
//             </span>
//           </div>
//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={(e) => handleImageChange(e, false)}
//             className="hidden"
//             disabled={imageFiles.length >= 5}
//           />
//         </label>
//       </div>

//       {/* Alternative Image Previews */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Alternative Banner Images <span>( Width: 1200px Height: 650px )</span>
//         </label>

//         {altImagePreviews.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
//             {altImagePreviews.map((preview, index) => (
//               <div key={`alt-${index}`} className="relative group">
//                 <img
//                   src={preview}
//                   alt={`Alternative Preview ${index + 1}`}
//                   className="h-24 w-24 object-cover rounded-md border border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index, true)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Alternative Upload Button */}
//         <label
//           className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
//             altImageFiles.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           <div className="flex flex-col items-center space-y-2">
//             <Upload className="w-6 h-6 text-gray-500" />
//             <span className="font-medium text-gray-600">
//               Drop files or
//               <span className="text-primary-600 underline ml-1">browse</span>
//             </span>
//             <span className="text-xs text-gray-500">
//               {altImageFiles.length >= 5
//                 ? 'Maximum 5 alternative images reached'
//                 : `Upload up to 5 alternative images (${altImageFiles.length}/5)`}
//             </span>
//           </div>
//           <input
//             type="file"
//             name="alternativeImages"
//             accept="image/*"
//             multiple
//             onChange={(e) => handleImageChange(e, true)}
//             className="hidden"
//             disabled={altImageFiles.length >= 5}
//           />
//         </label>
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//             loading ? 'opacity-70 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Adding Banner...' : 'Add Banner'}
//         </button>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </form>
//   )
// }

// export default Banner

// import React, { useState } from 'react'
// import axios from 'axios'
// import { Upload, X, CheckCircle } from 'react-feather'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const Banner = () => {
//   const [imageFiles, setImageFiles] = useState([])
//   const [imagePreviews, setImagePreviews] = useState([])
//   const [url, setUrl] = useState('')
//   const [alttag, setAlttag] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files)

//     if (files.length + imageFiles.length > 5) {
//       toast.error('You can upload a maximum of 5 images')
//       return
//     }

//     setImageFiles((prev) => [...prev, ...files.slice(0, 5 - prev.length)])

//     const newPreviews = []
//     files.slice(0, 5 - imageFiles.length).forEach((file) => {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         newPreviews.push(e.target.result)
//         if (
//           newPreviews.length === files.length ||
//           newPreviews.length === 5 - imageFiles.length
//         ) {
//           setImagePreviews((prev) => [...prev, ...newPreviews])
//         }
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const removeImage = (index) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index))
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!url) {
//       toast.error('URL is required')
//       return
//     }

//     if (imageFiles.length === 0) {
//       toast.error('Please upload at least one image')
//       return
//     }

//     setLoading(true)
//     setSuccess(false)

//     const formData = new FormData()
//     formData.append('URL', url)
//     formData.append('alttag', alttag)

//     // Append images
//     imageFiles.forEach((file) => formData.append('images', file))

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/banner/create',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       )

//       console.log('Banner uploaded:', response.data)
//       toast.success('Banner added successfully!')
//       setSuccess(true)
//       setUrl('')
//       setAlttag('')
//       setImageFiles([])
//       setImagePreviews([])
//     } catch (err) {
//       console.error('Error uploading banner:', err)
//       toast.error('Something went wrong while uploading')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">Banner Registration</h2>

//       {/* URL Input */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">URL</label>
//         <input
//           type="url"
//           name="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//       </div>

//       {/* Alt Tag Input */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Alt Text</label>
//         <input
//           type="text"
//           name="alttag"
//           value={alttag}
//           onChange={(e) => setAlttag(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter alternative text for the banner"
//         />
//       </div>

//       {/* Image Previews */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Banner Images <span>(Recommended: Width 1200px, Height 650px)</span>
//         </label>

//         {imagePreviews.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={preview}
//                   alt={`Preview ${index + 1}`}
//                   className="h-24 w-24 object-cover rounded-md border border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Upload Button */}
//         <label
//           className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
//             imageFiles.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           <div className="flex flex-col items-center space-y-2">
//             <Upload className="w-6 h-6 text-gray-500" />
//             <span className="font-medium text-gray-600">
//               Drop files or
//               <span className="text-primary-600 underline ml-1">browse</span>
//             </span>
//             <span className="text-xs text-gray-500">
//               {imageFiles.length >= 5
//                 ? 'Maximum 5 images reached'
//                 : `Upload up to 5 images (${imageFiles.length}/5)`}
//             </span>
//           </div>
//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//             className="hidden"
//             disabled={imageFiles.length >= 5}
//           />
//         </label>
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//             loading ? 'opacity-70 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Adding Banner...' : 'Add Banner'}
//         </button>
//       </div>

//       {/* Success Message */}
//       {success && (
//         <div className="mt-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
//           <CheckCircle className="mr-2" />
//           Banner added successfully!
//         </div>
//       )}

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </form>
//   )
// }

// export default Banner

import React, { useState } from "react";
import axios from "axios";
import { Upload, X, CheckCircle } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState(""); // Changed from alttag to altText
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imageFiles.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    setImageFiles((prev) => [...prev, ...files.slice(0, 5 - prev.length)]);

    const newPreviews = [];
    files.slice(0, 5 - imageFiles.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (
          newPreviews.length === files.length ||
          newPreviews.length === 5 - imageFiles.length
        ) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      toast.error("URL is required");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("URL", url);
    formData.append("altText", altText); // Changed from alttag to altText

    // Append images
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post(
        "http://localhost:8000/banner/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Banner uploaded:", response.data);
      toast.success("Banner added successfully!");
      setSuccess(true);
      setUrl("");
      setAltText(""); // Changed from alttag to altText
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err) {
      console.error("Error uploading banner:", err);
      toast.error("Something went wrong while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Banner Registration
      </h2>

      {/* URL Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">URL</label>
        <input
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Alt Text Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Alt Text</label>
        <input
          type="text"
          name="altText"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter alternative text for the banner"
        />
      </div>

      {/* Image Previews */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Banner Images <span>(Recommended: Width 1200px, Height 650px)</span>
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
            imageFiles.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-6 h-6 text-gray-500" />
            <span className="font-medium text-gray-600">
              Drop files or
              <span className="text-primary-600 underline ml-1">browse</span>
            </span>
            <span className="text-xs text-gray-500">
              {imageFiles.length >= 5
                ? "Maximum 5 images reached"
                : `Upload up to 5 images (${imageFiles.length}/5)`}
            </span>
          </div>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            disabled={imageFiles.length >= 5}
          />
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding Banner..." : "Add Banner"}
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
          <CheckCircle className="mr-2" />
          Banner added successfully!
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default Banner;
