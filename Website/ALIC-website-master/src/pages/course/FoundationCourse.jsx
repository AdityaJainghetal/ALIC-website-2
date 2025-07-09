// import React, { useState, useEffect } from "react";
// import { Card, Button, Modal } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const FoundationCourses = ({ selectedCategoryId, selectedSubCategoryId }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams();

//   const [showModal, setShowModal] = useState(false);
//   const [demoVideoUrl, setDemoVideoUrl] = useState("");

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://alic-website-2.onrender.com/api/get/${selectedSubCategoryId}`
//         );
//         console.log(response, "server response");
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         toast.error("Failed to load courses. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://alic-website-2.onrender.com/api/alldisplay");
//       if (response.data) {
//         setCourses(response.data);
//         filterCourses(
//           response.data,
//           selectedCategoryId,
//           courseId || selectedSubCategoryId
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   console.log(selectedSubCategoryId, "Aaaaaaaaaaaaaaaaaaaaaaaa");

//   const filterCourses = (coursesList, categoryId, subCategoryId) => {
//     let filtered = coursesList;

//     if (courseId) {
//       filtered = filtered.filter(
//         (course) => course?.subsubCategory?._id === courseId
//       );
//     }

//     if (subCategoryId && subCategoryId !== courseId) {
//       filtered = filtered.filter(
//         (course) =>
//           course.subCategory && course.subCategory._id === subCategoryId
//       );
//     }

//     if (categoryId) {
//       filtered = filtered.filter(
//         (course) => course.category && course.category._id === categoryId
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

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <h3 className="text-center mb-4 fw-bold text-dark">
//           {courseId || selectedCategoryId || selectedSubCategoryId
//             ? ""
//             : "All Foundation Courses"}
//         </h3>
//         <div className="row g-4">
//           {courses.length > 0 ? (
//             courses.map((course) => (
//               <div className="col-md-6" key={course._id || course.id}>
//                 <Card className="h-100 shadow-sm border-0">
//                   <div className="position-relative">
//                     <Card.Img
//                       variant="top"
//                       src={
//                         Array.isArray(course.images)
//                           ? course.images[0]
//                           : course.images
//                       }
//                       alt="Course"
//                       style={{}}
//                     />
//                   </div>
//                   <Card.Body className="p-3">
//                     <div className="d-flex align-items-center justify-content-center">
//                       <span className="text-center fw-bold fs-5">
//                         {course.subCategory?.name || "N/A"}
//                       </span>
//                     </div>
//                     <Card.Title className="fs-5 text-primary mb-2">
//                       {course.title}
//                     </Card.Title>

//                     <div className="small">
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Judiciary:</span>
//                         <span>{course?.subsubCategory?.name || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Price:</span>
//                         <span>₹ {course.Price}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Duration:</span>
//                         <span>{course.Durations || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Faculty:</span>
//                         <span>{course.TrainerName || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Type:</span>
//                         <span>{course.category?.name || "N/A"}</span>
//                       </div>
//                     </div>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-0 p-3 pt-0">
//                     <Link
//                       to={`/courses/${course._id || course.id}`}
//                       className="btn w-100 mb-2"
//                       style={{ backgroundColor: "#C81A1E", color: "white" }}
//                     >
//                       View Details
//                     </Link>
//                     <div className="d-flex gap-2">
//                       <Button
//                         variant="outline-danger"
//                         className="w-50 btn-sm"
//                         onClick={() => {
//                           setDemoVideoUrl(course?.URL || "");
//                           setShowModal(true);
//                         }}
//                       >
//                         Free Demo
//                       </Button>
//                       <Link
//                         className="w-50"
//                         to={`/courses/${course._id || course.id}`}
//                       >
//                         <Button variant="outline-dark" className="w-100 btn-sm">
//                           Explore
//                         </Button>
//                       </Link>
//                     </div>
//                   </Card.Footer>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <div className="col-12 text-center py-5">
//               <h5>
//                 No courses found{" "}
//                 {courseId || selectedCategoryId || selectedSubCategoryId
//                   ? "for this selection"
//                   : ""}
//               </h5>
//               {!(courseId || selectedCategoryId || selectedSubCategoryId) && (
//                 <Button
//                   variant="primary"
//                   onClick={fetchCourses}
//                   className="mt-3"
//                 >
//                   Retry Loading Courses
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Demo Video Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Course Demo</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
//             {demoVideoUrl ? (
//               <iframe
//                 src={demoVideoUrl}
//                 title="Course Demo Video"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="border-0"
//               ></iframe>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center h-100 text-white">
//                 <div className="text-center">
//                   <div className="fs-1 mb-2">🎬</div>
//                   <p>Video Coming Soon</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default FoundationCourses;

// ~`~``````````````````````````````````````~~~~~~~~~~~~~~~~

// import React, { useState, useEffect } from "react";
// import { Card, Button, Modal } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const FoundationCourses = ({ selectedCategoryId, selectedSubCategoryId }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { id: courseId } = useParams();
//   const [showModal, setShowModal] = useState(false);
//   const [demoVideoUrl, setDemoVideoUrl] = useState("");

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       // let response;

//       console.log(selectedCategoryId?._id, "SOURABH");

//       if (selectedSubCategoryId?._id) {
//         const response = await axios.get(
//           `https://alic-website-2.onrender.com/api/getdata/${selectedSubCategoryId._id}`
//         );
//         // console.log(response.data, "Data filter");
//         setCourses(response.data);
//       } else {
//         const response = await axios.get(
//           "https://alic-website-2.onrender.com/api/alldisplay"
//         );

//         let filteredCourses = response.data;

//         if (selectedCategoryId?._id) {
//           filteredCourses = filteredCourses?.filter(
//             (course) => course?.category?._id === selectedCategoryId._id
//           );
//         }

//         setCourses(filteredCourses);
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
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

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <h3 className="text-center mb-4 fw-bold text-dark">
//           {courseId || selectedCategoryId || selectedSubCategoryId
//             ? ""
//             : "All Foundation Courses"}
//         </h3>
//         <div className="row g-4">
//           {courses && courses.length > 0 ? (
//             courses.map((course) => (
//               <div className="col-md-6" key={course._id || course.id}>
//                 <Card className="h-100 shadow-sm border-0">
//                   <div className="position-relative">
//                     <Card.Img
//                       variant="top"
//                       src={
//                         Array.isArray(course.images)
//                           ? course.images[0]
//                           : course.images
//                       }
//                       alt="Course"
//                     />
//                   </div>
//                   <Card.Body className="p-3">
//                     <div className="d-flex align-items-center justify-content-center">
//                       <span className="text-center fw-bold fs-5">
//                         {course.subCategory?.name || "N/A"}
//                       </span>
//                     </div>
//                     <Card.Title className="fs-5 text-primary mb-2">
//                       {course.title}
//                     </Card.Title>

//                     <div className="small">
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Judiciary:</span>
//                         <span>{course?.subsubCategory?.name || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Price:</span>
//                         <span>₹ {course.Price}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Duration:</span>
//                         <span>{course.Durations || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Faculty:</span>
//                         <span>{course.TrainerName || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Type:</span>
//                         <span>{course.category?.name || "N/A"}</span>
//                       </div>
//                     </div>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-0 p-3 pt-0">
//                     <Link
//                       to={`/courses/${course._id || course.id}`}
//                       className="btn w-100 mb-2"
//                       style={{ backgroundColor: "#C81A1E", color: "white" }}
//                     >
//                       View Details
//                     </Link>
//                     <div className="d-flex gap-2">
//                       <Button
//                         variant="outline-danger"
//                         className="w-50 btn-sm"
//                         onClick={() => {
//                           setDemoVideoUrl(course?.URL || "");
//                           setShowModal(true);
//                         }}
//                       >
//                         Free Demo
//                       </Button>
//                       <Link
//                         className="w-50"
//                         to={`/courses/${course._id || course.id}`}
//                       >
//                         <Button variant="outline-dark" className="w-100 btn-sm">
//                           Explore
//                         </Button>
//                       </Link>
//                     </div>
//                   </Card.Footer>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <div className="col-12 text-center py-5">
//               <h5>
//                 No courses found
//                 {courseId || selectedCategoryId || selectedSubCategoryId
//                   ? "for this selection"
//                   : ""}
//               </h5>
//               <Button variant="primary" onClick={fetchCourses} className="mt-3">
//                 Retry Loading Courses
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Course Demo</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
//             {demoVideoUrl ? (
//               <iframe
//                 src={demoVideoUrl}
//                 title="Course Demo Video"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="border-0"
//               ></iframe>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center h-100 text-white">
//                 <div className="text-center">
//                   <div className="fs-1 mb-2">🎬</div>
//                   <p>Video Coming Soon</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default FoundationCourses;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// import React, { useState, useEffect } from "react";
// import { Card, Button, Modal } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";

// const FoundationCourses = ({ selectedCategoryId, selectedSubCategoryId }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [demoVideoUrl, setDemoVideoUrl] = useState("");

//   const [storeId, setstoreId] = useState("");

//   const { id: courseId } = useParams(); // Route param from URL

//   // 🔍 Fetch courses from API based on category or subcategory
//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       let response;

//       // 💬 Debug logs for development
//       // console.log("selectedCategoryId:", storeId);
//       // console.log("selectedSubCategoryId:", selectedSubCategoryId);

//       if (selectedSubCategoryId) {
//         // If subcategory is selected
//         response = await axios.get(
//           `https://alic-website-2.onrender.com/api/getdata/${selectedSubCategoryId}`
//         );

//         // console.log(response, "DATAT");
//         setCourses(response.data);
//       } else {
//         // Fallback to all courses
//         response = await axios.get("https://alic-website-2.onrender.com/api/alldisplay");
//         let filteredCourses = response.data;
//         console.log("filteredCourse", filteredCourses);
//         // setstoreId(response.data.subsubCategory);

//         if (selectedCategoryId?._id) {
//           filteredCourses = filteredCourses.filter(
//             (course) => course?.category?._id === selectedCategoryId._id
//           );
//         }

//         setCourses(filteredCourses);
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📦 Fetch when any identifier changes
//   useEffect(() => {
//     // ✅ Only fetch if at least one prop or param is present
//     if (selectedCategoryId?._id || selectedSubCategoryId?._id || courseId) {
//       fetchCourses();
//     }
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

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <h3 className="text-center mb-4 fw-bold text-dark">
//           {!(courseId || selectedCategoryId || selectedSubCategoryId) &&
//             "All Foundation Courses"}
//         </h3>

//         <div className="row g-4">
//           {courses?.length > 0 ? (
//             courses.map((course) => {
//               const courseId = course._id || course.id;
//               const courseImage = Array.isArray(course.images)
//                 ? course.images[0]
//                 : course.images;

//               return (
//                 <div className="col-md-6" key={courseId}>
//                   <Card className="h-100 shadow-sm border-0">
//                     <Card.Img variant="top" src={courseImage} alt="Course" />
//                     <Card.Body className="p-3">
//                       <div className="text-center fw-bold fs-5 mb-2">
//                         {course.subCategory?.name || "Na/A"}
//                       </div>

//                       <Card.Title className="fs-5 text-primary mb-2">
//                         {course.title}
//                       </Card.Title>

//                       {/* Course Info */}
//                       <div className="small">
//                         <div className="d-flex justify-content-between">
//                           <span className="fw-semibold">Judiciary:</span>
//                           <span>{course.subsubCategory?.name || "N/A"}</span>
//                         </div>
//                         <div className="d-flex justify-content-between">
//                           <span className="fw-semibold">Price:</span>
//                           <span>₹ {course.Price || "N/A"}</span>
//                         </div>
//                         <div className="d-flex justify-content-between">
//                           <span className="fw-semibold">Duration:</span>
//                           <span>{course.Durations || "N/A"}</span>
//                         </div>
//                         <div className="d-flex justify-content-between">
//                           <span className="fw-semibold">Faculty:</span>
//                           <span>{course.TrainerName || "N/A"}</span>
//                         </div>
//                         <div className="d-flex justify-content-between">
//                           <span className="fw-semibold">Type:</span>
//                           <span>{course.category?.name || "N/A"}</span>
//                         </div>
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
//                           onClick={() => {
//                             setDemoVideoUrl(course.URL || "");
//                             setShowModal(true);
//                           }}
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
//             <div className="col-12 text-center py-5">
//               <h5>
//                 No courses found{" "}
//                 {(courseId || selectedCategoryId || selectedSubCategoryId) &&
//                   "for this selection"}
//               </h5>
//               <Button variant="primary" onClick={fetchCourses()} className="mt-3">
//                 Retry Loading Courses
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal for demo video */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Course Demo</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
//             {demoVideoUrl ? (
//               <iframe
//                 src={demoVideoUrl}
//                 title="Course Demo Video"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="border-0"
//               ></iframe>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center h-100 text-white">
//                 <div className="text-center">
//                   <div className="fs-1 mb-2">🎬</div>
//                   <p>Video Coming Soon</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default FoundationCourses;

// import React, { useState, useEffect } from "react";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";

// const FoundationCourses = ({ selectedCategoryId, selectedSubCategoryId }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { id: courseId } = useParams(); // Renamed to avoid confusion with categoryId

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://alic-website-2.onrender.com/api/alldisplay");
//       if (response.data) {
//         setCourses(response.data);
//         // Prioritize courseId (subcategory ID) from useParams, then fallback to selectedSubCategoryId
//         filterCourses(
//           response.data,
//           selectedCategoryId,
//           courseId || selectedSubCategoryId
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCourses = (coursesList, categoryId, subCategoryId) => {
//     let filtered = coursesList;
//     console.log(courseId);

//     if (courseId) {
//       console.log(filtered);

//       filtered = filtered.filter(
//         (course) => course?.subsubCategory?._id == courseId
//       );
//       console.log(filtered);
//     }

//     if (subCategoryId && subCategoryId !== courseId) {
//       console.log(subCategoryId);

//       filtered = filtered.filter(
//         (course) =>
//           course.subCategory && course.subCategory._id === subCategoryId
//       );
//     }

//     if (categoryId) {
//       console.log(categoryId);

//       filtered = filtered.filter(
//         (course) => course.category && course.category._id === categoryId
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

//   return (
//     <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
//       <div className="container">
//         <h3 className="text-center mb-4 fw-bold text-dark">
//           {courseId || selectedCategoryId || selectedSubCategoryId
//             ? ""
//             : "All Foundation Courses"}
//         </h3>
//         <div className="row g-4">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map((course) => (
//               <div className="col-md-6" key={course._id || course.id}>
//                 <Card className="h-100 shadow-sm border-0">
//                   <div className="position-relative">
//                     <Card.Img
//                       variant="top"
//                       src={
//                         Array.isArray(course.images)
//                           ? course.images[0]
//                           : course.images
//                       }
//                       alt="Course"
//                       style={{ height: "250px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <Card.Body className="p-3">
//                     <div className="d-flex align-items-center justify-content-center">
//                       <span className="text-center fw-bold fs-5">
//                         {course.subCategory.name || "N/A"}
//                       </span>
//                     </div>
//                     <Card.Title className="fs-5 text-primary mb-2">
//                       {course.title}
//                     </Card.Title>
//                     {/* <ul className="mb-2 ps-3 small text-muted">
//                       {course.features && course.features.length > 0 ? (
//                         course.features.map((feature, i) => (
//                           <li key={i}>{feature}</li>
//                         ))
//                       ) : (
//                         <li>No features listed</li>
//                       )}
//                     </ul> */}
//                     <div className="small">
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Judicarysss:</span>
//                         <span>{course?.subsubCategory?.name || "N/A"}</span>
//                       </div>

//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Price:</span>
//                         <span>₹ {course.Price}</span>
//                       </div>

//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Duration:</span>
//                         <span>{course.Durations || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Faculty:</span>
//                         <span>{course.TrainerName || "N/A"}</span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span className="fw-semibold">Type:</span>
//                         <span>{course.category?.name || "N/A"}</span>
//                       </div>
//                     </div>
//                   </Card.Body>
//                   <Card.Footer className="bg-white border-0 p-3 pt-0">
//                     <Link
//                       to={`/courses/${course._id || course.id}`}
//                       className="btn w-100 mb-2"
//                       style={{ backgroundColor: "#C81A1E", color: "white" }}
//                     >
//                       View Details
//                     </Link>
//                     <div className="d-flex gap-2">
//                       <Button variant="outline-danger" className="w-50 btn-sm">
//                         Free Demo
//                       </Button>
//                       <Link
//                         className="w-50"
//                         to={`/courses/${course._id || course.id}`}
//                       >
//                         <Button variant="outline-dark" className="w-100 btn-sm">
//                           Explore
//                         </Button>
//                       </Link>
//                     </div>
//                   </Card.Footer>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <div className="col-12 text-center py-5">
//               <h5>
//                 No courses found{" "}
//                 {courseId || selectedCategoryId || selectedSubCategoryId
//                   ? "for this selection"
//                   : ""}
//               </h5>
//               {!(courseId || selectedCategoryId || selectedSubCategoryId) && (
//                 <Button
//                   variant="primary"
//                   onClick={fetchCourses}
//                   className="mt-3"
//                 >
//                   Retry Loading Courses
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoundationCourses;

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

const FoundationCourses = ({ selectedCategoryId, selectedSubCategoryId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { id: courseId } = useParams();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/alldisplay"
      );
      if (data) {
        setCourses(data);
        filterCourses(
          data,
          selectedCategoryId,
          courseId || selectedSubCategoryId
        );
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = (coursesList, categoryId, subCategoryId) => {
    let filtered = coursesList;
console.log(filtered,"filterCourses")
    if (courseId) {
      filtered = filtered.filter(
        (course) => course?.subsubCategory?._id === courseId
      );
    }  else if (categoryId) {
      filtered = filtered.filter(
        (course) => course.category?._id === categoryId
      );
    }

    console.log(courseId, "courseId")
    console.log(subCategoryId, "subCategoryId")
    console.log(categoryId, "categoryId")



    setFilteredCourses(filtered);
  };

  useEffect(() => {
    fetchCourses();
  }, [courseId, selectedCategoryId, selectedSubCategoryId]);

  if (loading) {
    return (
      <div className="py-4 text-center" style={{ backgroundColor: "#f5f7fa" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const showAllCoursesHeader =
    !courseId && !selectedCategoryId && !selectedSubCategoryId;

  return (
    <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="container">
        {showAllCoursesHeader && (
          <h3 className="text-center mb-4 fw-bold text-dark">
            All Foundation Courses
          </h3>
        )}
       

        <div className="row g-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const courseId = course._id || course.id;
              const imageSrc = Array.isArray(course.images)
                ? course.images[0]
                : course.images;

              return (
                
                <div className="col-md-6" key={courseId}>
                  {/* <h3>AAAAAA</h3> */}
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img
                      variant="top"
                      src={imageSrc}
                      alt="Course"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="text-center fw-bold fs-5">
                          {course.subCategory?.name || "N/A"}
                        </span>
                      </div>
                      <Card.Title className="fs-5 text-primary mb-2">
                        {course.title}
                      </Card.Title>
                      <div className="small">
                        <CourseDetail
                          label="Judiciary:"
                          value={course?.subsubCategory?.name}
                        />
                        <CourseDetail
                          label="Price:"
                          value={`₹ ${course.Price}`}
                        />
                        <CourseDetail
                          label="Duration:"
                          value={course.Durations}
                        />
                        <CourseDetail
                          label="Faculty:"
                          value={course.TrainerName}
                        />
                        <CourseDetail
                          label="Type:"
                          value={course.category?.name}
                        />
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 p-3 pt-0">
                      <Link
                        to={`/courses/${courseId}`}
                        className="btn w-100 mb-2"
                        style={{ backgroundColor: "#C81A1E", color: "white" }}
                      >
                        View Details
                      </Link>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-danger"
                          className="w-50 btn-sm"
                        >
                          Free Demo
                        </Button>
                        <Link className="w-50" to={`/courses/${courseId}`}>
                          <Button
                            variant="outline-dark"
                            className="w-100 btn-sm"
                          >
                            Explore
                          </Button>
                        </Link>
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              );
            })
          ) : (
            <NoCoursesFound
              hasSelection={
                !!(courseId || selectedCategoryId || selectedSubCategoryId)
              }
              onRetry={fetchCourses}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CourseDetail = ({ label, value }) => (
  <div className="d-flex justify-content-between">
    <span className="fw-semibold">{label}</span>
    <span>{value || "N/A"}</span>
  </div>
);

const NoCoursesFound = ({ hasSelection, onRetry }) => (
  <div className="col-12 text-center py-5">
    <h5>No courses found {hasSelection ? "for this selection" : ""}</h5>
    {!hasSelection && (
      <Button variant="primary" onClick={onRetry} className="mt-3">
        Retry Loading Courses
      </Button>
    )}
  </div>
);

export default FoundationCourses;
