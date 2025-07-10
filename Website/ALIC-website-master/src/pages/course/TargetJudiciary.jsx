// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const TargetJudiciaryCourse = ({ subCategoryShow, selectedSubCategoryId }) => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [filteredCourses, setFilteredCourses] = useState([]);
//     const { id: courseId } = useParams();

//     console.log(selectedSubCategoryId, "TARGET")



//       const filterCourses = () => {
//         let filtered = [...courses];
    
//         if (category) {
//           const categoryObj = categories.find(
//             (cat) => cat.categoryname.toLowerCase() === category.toLowerCase()
//           );
//           if (categoryObj) {
//             filtered = filtered.filter(
//               (course) => course.category === categoryObj._id
//             );
//           }
//         }
    
//         if (subcategory) {
//           const subcategoryObj = subCategories.find(
//             (sub) => sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
//           );
//           if (subcategoryObj) {
//             filtered = filtered.filter(
//               (course) => course.subcategory === subcategoryObj._id
//             );
//           }
//         }
    
//         if (
//           selectedCategoryId &&
//           typeof selectedCategoryId.name === "string" &&
//           selectedCategoryId.name.trim() !== ""
//         ) {
//           filtered = filtered.filter(
//             (course) =>
//               course.subsubCategory &&
//               course.subsubCategory.name &&
//               course.subsubCategory.name.toLowerCase() ===
//                 selectedCategoryId.name.toLowerCase()
//           );
//         }
    
//         setFilteredCourses(filtered);
//       };
    
//       const sanitizeHtml = (html) => {
//         return DOMPurify.sanitize(html);
//       };
//     return (
//         <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//             <div className="container">
//                 <div className="row justify-content-center">
//                     {filteredCourses.map((course) => (
//                         <div key={course._id} className="col-md-6 mb-4">
//                             <Card className="h-100 shadow-sm border-0">
//                                 <Card.Img
//                                     variant="top"
//                                     src={Array.isArray(course.images) ? course.images[0] : course.images}
//                                     alt={course.title}
//                                     style={{ height: '200px', objectFit: 'cover' }}
//                                 />
//                                 <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//                                     <Card.Title className="mb-0">{course.title}</Card.Title>
//                                     <span style={{ color: "#C81A1E" }} className="fw-bold">
//                                         {course.Price}
//                                     </span>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <h6>Features:</h6>
//                                     <ul className="mb-3">
//                                         {course.features && course.features.map((feature, i) => (
//                                             <li key={i}>{feature}</li>
//                                         ))}
//                                     </ul>

//                                     <div className="card-text">
//                                         <div className="d-flex justify-content-between mb-2 border-bottom">
//                                             <span className="fw-bold">Price:</span>
//                                             <span>{course.Price}</span>
//                                         </div>
//                                         <div className="d-flex justify-content-between mb-2 border-bottom">
//                                             <span className="fw-bold">Duration:</span>
//                                             <span>{course.Durations || 'N/A'}</span>
//                                         </div>
//                                         <div className="d-flex justify-content-between mb-2 border-bottom">
//                                             <span className="fw-bold">Faculty:</span>
//                                             <span>{course.TrainerName || 'N/A'}</span>
//                                         </div>
//                                         <div className="d-flex justify-content-between mb-2">
//                                             <span className="fw-bold">Course Type:</span>
//                                             <span>{course.category?.name || 'N/A'}</span>
//                                         </div>
//                                     </div>
//                                 </Card.Body>
//                                 <Card.Footer className="bg-white">
//                                     <Link
//                                         to={`/courses/${course._id}`}
//                                         className="btn w-100 mb-2"
//                                         style={{ background: "#C81A1E", color: "white" }}
//                                     >
//                                         View Details
//                                     </Link>
//                                     <div className="d-flex gap-2">
//                                         <Button variant="outline-danger" className="w-50">Free Demo</Button>
//                                         <Button variant="outline-dark" className="w-50">Explore Courses</Button>
//                                     </div>
//                                 </Card.Footer>
//                             </Card>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TargetJudiciaryCourse;

// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DOMPurify from 'dompurify';

// const TargetJudiciaryCourse = ({
//   subCategoryShow,
//   selectedSubCategoryId,
//   categories,
//   subCategories,
//   category,
//   subcategory,
//   selectedCategoryId
// }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams();

//   useEffect(() => {
//   const fetchCourses = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get("http://localhost:8000/api/alldisplay");
    
//     // Debug: Log the full response to understand its structure
//     console.log("Full API response:", response);

//     // Handle different possible response structures
//     let courseData = [];
//     if (Array.isArray(response.data)) {
//       courseData = response.data;
//     } else if (response.data && Array.isArray(response.data.data)) {
//       courseData = response.data.data;
//     } else {
//       throw new Error("Unexpected data format in API response");
//     }

//     // Debug: Log the raw course data before filtering
//     console.log("Raw course data:", courseData);

//     // Filter only "Recorded" courses with proper null checks
//     const recordedCourses = courseData.filter(course => {
//       // Check if course exists and has the required properties
//       if (!course || !course.category) return false;
      
//       // Check if category is an object with name property
//       const categoryName = typeof course.category === 'object' 
//         ? course.category.name 
//         : course.category;
      
//       // Debug: Log individual course and its category
//       console.log("Course:", course._id, "Category:", categoryName);

//       return categoryName && categoryName.toLowerCase() == "Recorded Course";
//     });

//     // Debug: Log the filtered results
//     console.log("Filtered recorded courses:", recordedCourses);
    
//     setCourses(recordedCourses);
    
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     toast.error(`Failed to load courses: ${error.message}`);
//     setCourses([]);
//   } finally {
//     setLoading(false);
//   }
// };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (courses && courses.length >= 0) {
//       filterCourses();
//     }
//   }, [courses, selectedSubCategoryId, category, subcategory, selectedCategoryId]);

//   const filterCourses = () => {
//     let filtered = Array.isArray(courses) ? [...courses] : [];

//     if (selectedSubCategoryId) {
//       filtered = filtered.filter(
//         (course) => course.subcategory === selectedSubCategoryId
//       );
//     }

//     if (category && Array.isArray(categories)) {
//       const categoryObj = categories.find(
//         (cat) => cat.categoryname && cat.categoryname.toLowerCase() === category.toLowerCase()
//       );
//       if (categoryObj) {
//         filtered = filtered.filter(
//           (course) => course.category === categoryObj._id
//         );
//       }
//     }

//     if (subcategory && Array.isArray(subCategories)) {
//       const subcategoryObj = subCategories.find(
//         (sub) => sub.subcategoryname && sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
//       );
//       if (subcategoryObj) {
//         filtered = filtered.filter(
//           (course) => course.subcategory === subcategoryObj._id
//         );
//       }
//     }

//     if (
//       selectedCategoryId &&
//       typeof selectedCategoryId.name === "string" &&
//       selectedCategoryId.name.trim() !== ""
//     ) {
//       filtered = filtered.filter(
//         (course) =>
//           course.subsubCategory &&
//           course.subsubCategory.name &&
//           course.subsubCategory.name.toLowerCase() ===
//           selectedCategoryId.name.toLowerCase()
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   const sanitizeHtml = (html) => {
//     return DOMPurify.sanitize(html);
//   };

//   if (loading) {
//     return <div className="text-center py-5">Loading courses...</div>;
//   }

//   if (!filteredCourses || filteredCourses.length === 0) {
//     return <div className="text-center py-5">No courses found for the selected criteria</div>;
//   }

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <div className="row justify-content-center">
//           {filteredCourses.map((course) => (
//             <div key={course._id} className="col-md-6 mb-4">
//               <Card className="h-100 shadow-sm border-0">
//                 <Card.Img
//                   variant="top"
//                   src={Array.isArray(course.images) ? course.images[0] : course.images}
//                   alt={course.Coursename || 'Course Image'}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//                 <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//                   <Card.Title className="mb-0">{course.Coursename || 'Untitled Course'}</Card.Title>
//                   <span style={{ color: "#C81A1E" }} className="fw-bold">
//                     ₹{course.Price || 'N/A'}
//                   </span>
//                 </Card.Header>
//                 <Card.Body>
//                   <h6>Features:</h6>
//                   <ul className="mb-3">
//                     {course.features && Array.isArray(course.features) ? (
//                       course.features.map((feature, i) => (
//                         <li key={i}>{feature}</li>
//                       ))
//                     ) : (
//                       <li>No features listed</li>
//                     )}
//                   </ul>

//                   <div className="card-text">
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Price:</span>
//                       <span>₹{course.Price || 'N/A'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Duration:</span>
//                       <span>{course.Durations || 'N/A'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Faculty:</span>
//                       <span>{course.TrainerName || 'N/A'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="fw-bold">Course Type:</span>
//                       <span>{course.category?.name || 'N/A'}</span>
//                     </div>
//                   </div>
//                 </Card.Body>
//                 <Card.Footer className="bg-white">
//                   <Link
//                     to={`/courses/${course._id}`}
//                     className="btn w-100 mb-2"
//                     style={{ background: "#C81A1E", color: "white" }}
//                   >
//                     View Details
//                   </Link>
//                   <div className="d-flex gap-2">
//                     <Button variant="outline-danger" className="w-50">Free Demo</Button>
//                     <Button variant="outline-dark" className="w-50">Explore Courses</Button>
//                   </div>
//                 </Card.Footer>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetJudiciaryCourse;

// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DOMPurify from 'dompurify';

// const TargetJudiciaryCourse = ({
//   subCategoryShow,
//   selectedSubCategoryId,
//   categories,
//   subCategories,
//   category,
//   subcategory,
//   selectedCategoryId
// }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8000/api/alldisplay");
//         console.log("API Response:", response);

//         // Handle API response structure
//         let courseData = [];
//         if (Array.isArray(response.data)) {
//           courseData = response.data;
//         } else if (response.data && Array.isArray(response.data.data)) {
//           courseData = response.data.data;
//         } else {
//           throw new Error("Invalid API response format");
//         }

//         console.log("All Courses:", courseData);

//         // Filter for Recorded Courses
//         const recordedCourses = courseData.filter(course => {
//           if (!course || !course.category) return false;
          
//           // Handle both string and object category formats
//           const categoryName = typeof course.category === 'object' 
//             ? course.category.name 
//             : course.category;

//           console.log(`Course ID: ${course._id}, Category: ${categoryName}`);
          
//           return categoryName && categoryName.toLowerCase().includes("recorded");
//         });

//         console.log("Recorded Courses:", recordedCourses);
//         setCourses(recordedCourses);
        
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         toast.error(`Failed to load courses: ${error.message}`);
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (courses && courses.length >= 0) {
//       filterCourses();
//     }
//   }, [courses, selectedSubCategoryId, category, subcategory, selectedCategoryId]);

//   const filterCourses = () => {
//     let filtered = Array.isArray(courses) ? [...courses] : [];

//     // Filter by selectedSubCategoryId if provided
//     if (selectedSubCategoryId) {
//       filtered = filtered.filter(
//         (course) => course.subcategory === selectedSubCategoryId
//       );
//     }

//     // Filter by category if provided
//     if (category && Array.isArray(categories)) {
//       const categoryObj = categories.find(
//         (cat) => cat.categoryname && cat.categoryname.toLowerCase() === category.toLowerCase()
//       );
//       if (categoryObj) {
//         filtered = filtered.filter(
//           (course) => 
//             (typeof course.category === 'object' ? course.category._id : course.category) === categoryObj._id
//         );
//       }
//     }

//     // Filter by subcategory if provided
//     if (subcategory && Array.isArray(subCategories)) {
//       const subcategoryObj = subCategories.find(
//         (sub) => sub.subcategoryname && sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
//       );
//       if (subcategoryObj) {
//         filtered = filtered.filter(
//           (course) => course.subcategory === subcategoryObj._id
//         );
//       }
//     }

//     // Filter by selectedCategoryId if provided
//     if (
//       selectedCategoryId &&
//       typeof selectedCategoryId.name === "string" &&
//       selectedCategoryId.name.trim() !== ""
//     ) {
//       filtered = filtered.filter(
//         (course) =>
//           course.subsubCategory &&
//           course.subsubCategory.name &&
//           course.subsubCategory.name.toLowerCase() ===
//             selectedCategoryId.name.toLowerCase()
//       );
//     }

//     console.log("Final Filtered Courses:", filtered);
//     setFilteredCourses(filtered);
//   };

//   const sanitizeHtml = (html) => {
//     return DOMPurify.sanitize(html);
//   };

//   if (loading) {
//     return <div className="text-center py-5">Loading courses...</div>;
//   }

//   if (!filteredCourses || filteredCourses.length === 0) {
//     return (
//       <div className="text-center py-5">
//         <h4>No recorded courses found for the selected criteria</h4>
//         <p className="text-muted">Please check back later or try different filters</p>
//       </div>
//     );
//   }

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <div className="row justify-content-center">
//           {courses.map((course) => (
//             <div key={course._id} className="col-md-6 mb-4">
//               <Card className="h-100 shadow-sm border-0">
//                 <Card.Img
//                   variant="top"
//                   src={
//                     Array.isArray(course.images) 
//                       ? course.images[0] 
//                       : course.images || 'https://via.placeholder.com/300x200'
//                   }
//                   alt={course.Coursename || 'Course Image'}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//                 <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//                   <Card.Title className="mb-0">{course.Coursename || 'Untitled Course'}</Card.Title>
//                   <span style={{ color: "#C81A1E" }} className="fw-bold">
//                     ₹{course.Price || 'Free'}
//                   </span>
//                 </Card.Header>
//                 <Card.Body>
//                   <h6>Features:</h6>
//                   <ul className="mb-3">
//                     {course.features && Array.isArray(course.features) ? (
//                       course.features.map((feature, i) => (
//                         <li key={i}>{feature}</li>
//                       ))
//                     ) : (
//                       <li>No features listed</li>
//                     )}
//                   </ul>

//                   <div className="card-text">
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Price:</span>
//                       <span>₹{course.Price || 'Free'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Duration:</span>
//                       <span>{course.Durations || 'Flexible'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Faculty:</span>
//                       <span>{course.TrainerName || 'Expert Faculty'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="fw-bold">Course Type:</span>
//                       <span>
//                         {typeof course.category === 'object'
//                           ? course.category.name
//                           : course.category || 'Recorded Course'}
//                       </span>
//                     </div>
//                   </div>
//                 </Card.Body>
//                 <Card.Footer className="bg-white">
//                   <Link
//                     to={`/courses/${course._id}`}
//                     className="btn w-100 mb-2"
//                     style={{ background: "#C81A1E", color: "white" }}
//                   >
//                     View Details
//                   </Link>
//                   <div className="d-flex gap-2">
//                     <Button variant="outline-danger" className="w-50">Free Demo</Button>
//                     <Button variant="outline-dark" className="w-50">Explore Courses</Button>
//                   </div>
//                 </Card.Footer>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetJudiciaryCourse;


// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DOMPurify from 'dompurify';

// const TargetJudiciaryCourse = ({
//   subCategoryShow,
//   selectedSubCategoryId,
//   categories,
//   subCategories,
//   category,
//   subcategory,
//   selectedCategoryId
// }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams();
//   let recordedCourses=[]
//   const [rec, setrec] = useState([])

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8000/api/alldisplay");
//         console.log("API Response:", response);

//         // Handle API response structure
//         let courseData = [];
//         if (Array.isArray(response.data)) {
//           courseData = response.data;
//         } else if (response.data && Array.isArray(response.data.data)) {
//           courseData = response.data.data;
//         } else {
//           throw new Error("Invalid API response format");
//         }

//         console.log("All Courses:", courseData);

//         // Filter for Recorded Courses
//         recordedCourses = courseData.filter(course => {
//           if (!course || !course.category) return false;
          
//           // Check if category is an object with name property
//           const categoryName = typeof course.category === 'object' 
//             ? course.category.name 
//             : course.category;

//           console.log(`Course ID: ${course._id}, Category: ${categoryName}`);
          
//           // Match "Recorded Course" exactly
//           return categoryName && categoryName === "Recorded Course";
//         });

//         console.log("Recorded Courses:", recordedCourses);
//         setrec(recordedCourses)
//         setCourses(recordedCourses);
//         setFilteredCourses(recordedCourses); // Initialize filtered courses
        
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         toast.error(`Failed to load courses: ${error.message}`);
//         setCourses([]);
//         setFilteredCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (courses && courses.length >= 0) {
//       filterCourses();
//     }
//   }, [courses, selectedSubCategoryId, category, subcategory, selectedCategoryId]);

//   const filterCourses = () => {
//     let filtered = Array.isArray(courses) ? [...courses] : [];

//     // Filter by selectedSubCategoryId if provided
//     if (selectedSubCategoryId) {
//       filtered = filtered.filter(
//         (course) => course.subcategory && 
//         (typeof course.subcategory === 'object' 
//           ? course.subcategory._id 
//           : course.subcategory) === selectedSubCategoryId
//       );
//     }

//     // Filter by category if provided
//     if (category && Array.isArray(categories)) {
//       const categoryObj = categories.find(
//         (cat) => cat.categoryname && cat.categoryname.toLowerCase() === category.toLowerCase()
//       );
//       if (categoryObj) {
//         filtered = filtered.filter(
//           (course) => 
//             (typeof course.category === 'object' ? course.category._id : course.category) === categoryObj._id
//         );
//       }
//     }

//     // Filter by subcategory if provided
//     if (subcategory && Array.isArray(subCategories)) {
//       const subcategoryObj = subCategories.find(
//         (sub) => sub.subcategoryname && sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
//       );
//       if (subcategoryObj) {
//         filtered = filtered.filter(
//           (course) => 
//             course.subcategory && 
//             (typeof course.subcategory === 'object' 
//               ? course.subcategory._id 
//               : course.subcategory) === subcategoryObj._id
//         );
//       }
//     }

//     // Filter by selectedCategoryId if provided
//     if (
//       selectedCategoryId &&
//       typeof selectedCategoryId.name === "string" &&
//       selectedCategoryId.name.trim() !== ""
//     ) {
//       filtered = filtered.filter(
//         (course) =>
//           course.subsubCategory &&
//           course.subsubCategory.name &&
//           course.subsubCategory.name.toLowerCase() ===
//             selectedCategoryId.name.toLowerCase()
//       );
//     }

//     console.log("Final Filtered Courses:", filtered);
//     setFilteredCourses(filtered);
//   };

//   const sanitizeHtml = (html) => {
//     return DOMPurify.sanitize(html);
//   };

//   if (loading) {
//     return <div className="text-center py-5">Loading courses...</div>;
//   }

//   if (!filteredCourses || filteredCourses.length === 0) {
//     return (
//       <div className="text-center py-5">
//         <h4>No recorded courses found for the selected criteria</h4>
//         <p className="text-muted">Please check back later or try different filters</p>
//       </div>
//     );
//   }
// console.log(recordedCourses,"aaaaaaaaa")
//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <div className="row justify-content-center">
//           {rec.map((course) => (
//             <div key={course._id} className="col-md-6 mb-4">
//               <Card className="h-100 shadow-sm border-0">
//                 <Card.Img
//                   variant="top"
//                   src={
//                     Array.isArray(course.images) 
//                       ? course.images[0] 
//                       : course.images || 'https://via.placeholder.com/300x200'
//                   }
//                   alt={course.Coursename || 'Course Image'}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//                 <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//                   <Card.Title className="mb-0">{course.Coursename || 'Untitled Course'}</Card.Title>
//                   <span style={{ color: "#C81A1E" }} className="fw-bold">
//                     ₹{course.Price || 'Free'}
//                   </span>
//                 </Card.Header>
//                 <Card.Body>
//                   <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(course.CourseDescription) }} />

//                   <div className="card-text mt-3">
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Price:</span>
//                       <span>₹{course.Price || 'Free'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Duration:</span>
//                       <span>{course.Durations || 'Flexible'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Faculty:</span>
//                       <span>{course.TrainerName || 'Expert Faculty'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Judiciary:</span>
//                       <span>{course.subsubCategory?.name || 'N/A'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="fw-bold">Course Type:</span>
//                       <span>
//                         {typeof course.category === 'object'
//                           ? course.category.name
//                           : course.category || 'Recorded Course'}
//                       </span>
//                     </div>
//                   </div>
//                 </Card.Body>
//                 <Card.Footer className="bg-white">
//                   <Link
//                     to={`/courses/${course._id}`}
//                     className="btn w-100 mb-2"
//                     style={{ background: "#C81A1E", color: "white" }}
//                   >
//                     View Details
//                   </Link>
//                   {course.URL && (
//                     <Button 
//                       variant="outline-danger" 
//                       className="w-100 mb-2"
//                       as="a"
//                       href={course.URL}
//                       target="_blank"
//                     >
//                       Watch Demo
//                     </Button>
//                   )}
//                 </Card.Footer>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetJudiciaryCourse;



// import React, { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DOMPurify from 'dompurify';

// const TargetJudiciaryCourse = ({
//   subCategoryShow,
//   selectedSubCategoryId,
//   categories,
//   subCategories,
//   category,
//   subcategory,
//   selectedCategoryId
// }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8000/api/alldisplay");
//         console.log("API Response:", response);

//         let courseData = [];
//         if (Array.isArray(response.data)) {
//           courseData = response.data;
//         } else if (response.data && Array.isArray(response.data.data)) {
//           courseData = response.data.data;
//         } else {
//           throw new Error("Invalid API response format");
//         }

//         console.log("All Courses:", courseData);

//         const recordedCourses = courseData.filter(course => {
//           if (!course || !course.category) return false;
//           const categoryName = typeof course.category === 'object'
//             ? course.category.name
//             : course.category;
//           console.log(`Course ID: ${course._id}, Category: ${categoryName}`);
//           return categoryName && categoryName === "Recorded Course";
//         });

//         console.log("Recorded Courses:", recordedCourses);
//         setCourses(recordedCourses);
//         setFilteredCourses(recordedCourses);

//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         toast.error(`Failed to load courses: ${error.message}`);
//         setCourses([]);
//         setFilteredCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);


// //   const filterCourses = () => {
// //     let filtered = Array.isArray(courses) ? [...courses] : [];

// //     if (selectedSubCategoryId) {
// //       filtered = filtered.filter(
// //         (course) =>
// //           course.subcategory &&
// //           (typeof course.subcategory === 'object'
// //             ? course.subcategory._id
// //             : course.subcategory) === selectedSubCategoryId
// //       );
// //     }

// //     if (category && Array.isArray(categories)) {
// //       const categoryObj = categories.find(
// //         (cat) =>
// //           cat.categoryname &&
// //           cat.categoryname.toLowerCase() === category.toLowerCase()
// //       );
// //       if (categoryObj) {
// //         filtered = filtered.filter(
// //           (course) =>
// //             (typeof course.category === 'object'
// //               ? course.category._id
// //               : course.category) === categoryObj._id
// //         );
// //       }
// //     }

// //     if (subcategory && Array.isArray(subCategories)) {
// //       const subcategoryObj = subCategories.find(
// //         (sub) =>
// //           sub.subcategoryname &&
// //           sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
// //       );
// //       if (subcategoryObj) {
// //         filtered = filtered.filter(
// //           (course) =>
// //             course.subcategory &&
// //             (typeof course.subcategory === 'object'
// //               ? course.subcategory._id
// //               : course.subcategory) === subcategoryObj._id
// //         );
// //       }
// //     }

// //     if (
// //       selectedCategoryId &&
// //       typeof selectedCategoryId.name === "string" &&
// //       selectedCategoryId.name.trim() !== ""
// //     ) {
// //       filtered = filtered.filter(
// //         (course) =>
// //           course.subsubCategory &&
// //           course.subsubCategory.name &&
// //           course.subsubCategory.name.toLowerCase() ===
// //             selectedCategoryId.name.toLowerCase()
// //       );
// //     }

// //     console.log("Final Filtered Courses:", filtered);
// //     setFilteredCourses(filtered);
// //   };

//   const sanitizeHtml = (html) => {
//     return DOMPurify.sanitize(html);
//   };

//   if (loading) {
//     return <div className="text-center py-5">Loading courses...</div>;
//   }


//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <div className="row justify-content-center">
//           {courses.map((course) => (
//             <div key={course._id} className="col-md-6 mb-4">
//               <Card className="h-100 shadow-sm border-0">
//                 <Card.Img
//                   variant="top"
//                   src={
//                     Array.isArray(course.images)
//                       ? course.images[0]
//                       : course.images || 'https://via.placeholder.com/300x200'
//                   }
//                   alt={course.Coursename || 'Course Image'}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//                 <Card.Header className="bg-white d-flex justify-content-between align-items-center">
//                   <Card.Title className="mb-0">
//                     {course.Coursename || 'Untitled Course'}
//                   </Card.Title>
//                   <span style={{ color: "#C81A1E" }} className="fw-bold">
//                     ₹{course.Price || 'Free'}
//                   </span>
//                 </Card.Header>
//                 <Card.Body>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: sanitizeHtml(course.CourseDescription),
//                     }}
//                   />
//                   <div className="card-text mt-3">
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Price:</span>
//                       <span>₹{course.Price || 'Free'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Duration:</span>
//                       <span>{course.Durations || 'Flexible'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Faculty:</span>
//                       <span>{course.TrainerName || 'Expert Faculty'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Judiciary:</span>
//                       <span>{course.subsubCategory?.name || 'N/A'}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="fw-bold">Course Type:</span>
//                       <span>
//                         {typeof course.category === 'object'
//                           ? course.category.name
//                           : course.category || 'Recorded Course'}
//                       </span>
//                     </div>
//                   </div>
//                 </Card.Body>
//                 <Card.Footer className="bg-white">
//                   <Link
//                     to={`/courses/${course._id}`}
//                     className="btn w-100 mb-2"
//                     style={{ background: "#C81A1E", color: "white" }}
//                   >
//                     View Details
//                   </Link>
//                   {course.URL && (
//                     <Button
//                       variant="outline-danger"
//                       className="w-100 mb-2"
//                       as="a"
//                       href={course.URL}
//                       target="_blank"
//                     >
//                       Watch Demo
//                     </Button>
//                   )}
//                 </Card.Footer>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TargetJudiciaryCourse;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchcategory,
  fetchSubcategory,
  fetchSubsubcategory,
} from "../../api";

const TargetJudiciaryCourse = ({ selectedCategoryId }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const { category, subcategory, subsubcategory } = useParams();

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchAllSubcategories();
    fetchAllSubsubcategories();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      filterCourses();
    }
  }, [category, subcategory, subsubcategory, courses, selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const response = await fetchcategory();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories. Please try again.");
    }
  };

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

  const fetchAllSubsubcategories = async () => {
    try {
      const response = await fetchSubsubcategory();
      if (response.data) {
        setSubsubCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching subsubcategories:", error);
      toast.error("Failed to load subsubcategories. Please try again.");
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/alldisplay");
      let courseData = [];
      
      if (Array.isArray(response.data)) {
        courseData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        courseData = response.data.data;
      } else {
        throw new Error("Invalid API response format");
      }

      // Filter for "Recorded Course" right after fetching
      const recordedCourses = courseData.filter(course => {
        const courseCategory = typeof course.category === 'object' 
          ? course.category.name 
          : course.category;
        return courseCategory === "Recorded Course";
      });

      setCourses(recordedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    // Filter by category from URL params
    if (category) {
      const categoryObj = categories.find(
        (cat) => cat.categoryname.toLowerCase() === category.toLowerCase()
      );
      if (categoryObj) {
        filtered = filtered.filter(
          (course) => 
            (typeof course.category === 'object' 
              ? course.category._id 
              : course.category) === categoryObj._id
        );
      }
    }

    // Filter by subcategory from URL params
    if (subcategory) {
      const subcategoryObj = subCategories.find(
        (sub) => sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
      );
      if (subcategoryObj) {
        filtered = filtered.filter(
          (course) => 
            (typeof course.subcategory === 'object' 
              ? course.subcategory._id 
              : course.subcategory) === subcategoryObj._id
        );
      }
    }

    // Filter by selectedCategoryId (subsubCategory) from props
    if (
      selectedCategoryId &&
      typeof selectedCategoryId.name === "string" &&
      selectedCategoryId.name.trim() !== ""
    ) {
      filtered = filtered.filter(
        (course) =>
          course.subsubCategory &&
          course.subsubCategory.name &&
          course.subsubCategory.name.toLowerCase() ===
            selectedCategoryId.name.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  };

  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html);
  };

  if (loading) {
    return <div className="container my-5 text-center">Loading courses...</div>;
  }

  return (
    <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course._id} className="col-md-6 mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={
                      Array.isArray(course.images)
                        ? course.images[0]
                        : course.images || 'https://via.placeholder.com/300x200'
                    }
                    alt={course.Coursename || 'Course Image'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-0">
                      {course.Coursename || 'Untitled Course'}
                    </Card.Title>
                    <span style={{ color: "#C81A1E" }} className="fw-bold">
                      ₹{course.Price || 'Free'}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(course.CourseDescription),
                      }}
                    />
                    <div className="card-text mt-3">
                      <div className="d-flex justify-content-between mb-2 border-bottom">
                        <span className="fw-bold">Price:</span>
                        <span>₹{course.Price || 'Free'}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2 border-bottom">
                        <span className="fw-bold">Duration:</span>
                        <span>{course.Durations || 'Flexible'}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2 border-bottom">
                        <span className="fw-bold">Faculty:</span>
                        <span>{course.TrainerName || 'Expert Faculty'}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2 border-bottom">
                        <span className="fw-bold">Judiciary:</span>
                        <span>{course.subsubCategory?.name || 'N/A'}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="fw-bold">Course Type:</span>
                        <span>
                          {typeof course.category === 'object'
                            ? course.category.name
                            : course.category || 'Recorded Course'}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white">
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn w-100 mb-2"
                      style={{ background: "#C81A1E", color: "white" }}
                    >
                      View Details
                    </Link>
                    {course.URL && (
                      <Button
                        variant="outline-danger"
                        className="w-100 mb-2"
                        as="a"
                        href={course.URL}
                        target="_blank"
                      >
                        Watch Demo
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No recorded courses found matching your criteria</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetJudiciaryCourse;



// import React, { useState, useEffect } from "react";
// import { Card, Button } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const TargetJudiciaryCourse = ({
//   selectedCategoryId,
//   selectedSubCategoryId,
// }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams();

//   // console.log(courseId,"dataaaaaaaaaaaaaaaa")
//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         `https://alic-website-2-1.onrender.com/api/allcourse`
//       );
//       if (data) {
//         setCourses(data);
//         filterCourses(
//           data,
//           selectedCategoryId,
//           courseId || selectedSubCategoryId
//         );
//       }
//       // console.log(data,"Course dataaaaaaaaaaaaaaaaaa")
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCourses = (coursesList, categoryId, subCategoryId) => {
//     console.log("Filtering for courseId:", courseId);
//     console.log("SubcategoryId:", subCategoryId);
//     console.log("CategoryId:", categoryId);

//     coursesList.forEach((course) => {});

//     let filtered = coursesList;

//     if (courseId) {
//       filtered = filtered.filter(
//         (course) => course?.subsubCategory?._id === courseId
//       );
//     } else if (subCategoryId) {
//       filtered = filtered.filter(
//         (course) => course.subCategory?._id === subCategoryId
//       );
//     } else if (categoryId) {
//       filtered = filtered.filter(
//         (course) => course.category?._id === categoryId
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, [courseId, selectedCategoryId, selectedSubCategoryId]);

//   if (loading) {
//     return (
//       <div className="py-4 text-center" style={{ backgroundColor: "#f5f7fa" }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   const showAllCoursesHeader =
//     !courseId && !selectedCategoryId && !selectedSubCategoryId;

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         {showAllCoursesHeader && (
//           <h3 className="text-center mb-4 fw-bold text-dark">
//             All Foundation Courses
//           </h3>
//         )}
//         {/* <h1>aaaaaaaaaaaaaaaaaaaaaaa</h1> */}

//         <div className="row g-4">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => {
//               const courseId = course._id || course.id;
//               const imageSrc = Array.isArray(course.images)
//                 ? course.images[0]
//                 : course.images;

//               return (
//                 <div className="col-md-6" key={courseId}>
//                   <Card className="h-100 shadow-sm border-0">
//                     <Card.Img
//                       variant="top"
//                       src={imageSrc}
//                       alt="Course"
//                       style={{ height: "250px", objectFit: "cover" }}
//                     />
//                     <Card.Body className="p-3">
//                       <div className="d-flex align-items-center justify-content-center"></div>
//                       <Card.Title className="fs-5 text-primary mb-2">
//                         {course.title}
//                       </Card.Title>
//                       <div className="small">
//                         <CourseDetail
//                           label="Judiciary:"
//                           value={course?.subsubCategory?.name}
//                         />
//                         <CourseDetail
//                           label="Price:"
//                           value={`₹ ${course.Price}`}
//                         />
//                         <CourseDetail
//                           label="Duration:"
//                           value={course.Durations}
//                         />
//                         <CourseDetail
//                           label="Faculty:"
//                           value={course.TrainerName}
//                         />
//                         <CourseDetail
//                           label="Type:"
//                           value={course.category?.name}
//                         />
//                       </div>
//                     </Card.Body>
//                     <Card.Footer className="bg-white border-0 p-3 pt-0">
//                       <Link
//                         to={`/courses/${courseId}`}
//                         className="btn w-100 mb-2"
//                         style={{ backgroundColor: "#C81A1E", color: "white" }}
//                       >
//                         View Details
//                       </Link>
//                       <div className="d-flex gap-2">
//                         <Button
//                           variant="outline-danger"
//                           className="w-50 btn-sm"
//                         >
//                           Free Demo
//                         </Button>
//                         <Link className="w-50" to={`/courses/${courseId}`}>
//                           <Button
//                             variant="outline-dark"
//                             className="w-100 btn-sm"
//                           >
//                             Explore
//                           </Button>
//                         </Link>
//                       </div>
//                     </Card.Footer>
//                   </Card>
//                 </div>
//               );
//             })
//           ) : (
//             <NoCoursesFound
//               hasSelection={
//                 !!(courseId || selectedCategoryId || selectedSubCategoryId)
//               }
//               onRetry={fetchCourses}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CourseDetail = ({ label, value }) => (
//   <div className="d-flex justify-content-between">
//     <span className="fw-semibold">{label}</span>
//     <span>{value || "N/A"}</span>
//   </div>
// );

// const NoCoursesFound = ({ hasSelection, onRetry }) => (
//   <div className="col-12 text-center py-5">
//     <h5>No courses found {hasSelection ? "for this selection" : ""}</h5>
//     {!hasSelection && (
//       <Button variant="primary" onClick={onRetry} className="mt-3">
//         Retry Loading Courses
//       </Button>
//     )}
//   </div>
// );

// export default TargetJudiciaryCourse;
