// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // export const CoursesAllList = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleCourseClick = (courseId) => {
// //     navigate(`/judgements-details/${courseId}`);
// //   };

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await fetch('https://alic-website-2-1.onrender.com/judement/display');
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch courses');
// //         }
// //         const data = await response.json();
// //         setCourses(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //  <div className="row td_gap_y_10 td_row_gap_30">
// //   {courses.map((course) => (
// //     <div key={course.id} className="col-xl-12 mb-4 ">
// //       <div
// //         className="td_card td_style_5 td_type_3"
// //         style={{
// //           padding:"10px",
// //           border: '2px solid #e0e0e0', // Thicker border
// //           borderRadius: '12px', // Rounded corners
// //           boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Subtle shadow
// //           transition: 'all 0.3s ease', // Smooth hover effect
// //           ':hover': {
// //             boxShadow: '0 6px 16px rgba(0,0,0,0.15)', // Enhanced shadow on hover
// //             borderColor: '#0066cc' // Blue border on hover
// //           }
// //         }}
// //       >
// //         {/* Rest of your existing card content remains exactly the same */}
// //         <div className="td_card_thumb" onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //           <span className="td_card_thumb_in td_radius_10">
// //             <img src={Array.isArray(course.images) ? course.images[0] : course.images} alt={course.title} />
// //             <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
// //               {course.lastDate}
// //             </span>
// //           </span>
// //         </div>
// //         <div className="td_card_content">
// //           <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
// //             <span onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //               {course.title}
// //             </span>
// //           </h2>
// //           <div>
// //             <p>{course.subTitle}.</p>
// //           </div>
// //           <div className="td_card_btns_wrap justify-content-between">
// //             <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
// //               <span className="td_accent_color">
// //                 <span>Posted By : </span>
// //                 <span className="td_fs_18 td_medium td_heading_color">
// //                   {course.publicerName}
// //                 </span>
// //               </span>
// //             </div>
// //             <div
// //               onClick={() => handleCourseClick(course._id)}
// //               className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
// //               style={{ cursor: 'pointer' }}
// //             >
// //               <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   ))}
// // </div>
// //   );
// // };

// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import dayjs from "dayjs";

// // export const CoursesAllList = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleCourseClick = (courseId) => {
// //     navigate(`/judgements-details/${courseId}`);
// //   };

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await fetch('https://alic-website-2-1.onrender.com/judement/display');
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch courses');
// //         }
// //         const data = await response.json();
// //         setCourses(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div className="row td_gap_y_10 td_row_gap_30">
// //       {courses.map((course) => (
// //         <div key={course.id} className="col-xl-12 mb-4 ">
// //           <div
// //             className="td_card td_style_5 td_type_3"
// //             style={{
// //               padding: "10px",
// //               border: '2px solid #e0e0e0',
// //               borderRadius: '12px',
// //               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// //               transition: 'all 0.3s ease',
// //               ':hover': {
// //                 boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
// //                 borderColor: '#0066cc'
// //               }
// //             }}
// //           >
// //             <div className="td_card_thumb" onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //               <span className="td_card_thumb_in td_radius_10">
// //                 <img src={Array.isArray(course.images) ? course.images[0] : course.images} alt={course.title} />
// //                 <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
// //                   {dayjs(course.lastDate).format('DD MMM YYYY')}
// //                 </span>
// //               </span>
// //             </div>
// //             <div className="td_card_content">
// //               <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
// //                 <span onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //                   {course.title}
// //                 </span>
// //               </h2>
// //               <div>
// //                 <p>{course.subTitle}.</p>
// //               </div>
// //               <div className="td_card_btns_wrap justify-content-between">
// //                 <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
// //                   <span className="td_accent_color">
// //                     <span>Posted By : </span>
// //                     <span className="td_fs_18 td_medium td_heading_color">
// //                       {course.publicerName}
// //                     </span>
// //                   </span>
// //                 </div>
// //                 <div
// //                   onClick={() => handleCourseClick(course._id)}
// //                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
// //                   style={{ cursor: 'pointer' }}
// //                 >
// //                   <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import dayjs from "dayjs";

// // export const CoursesAllList = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();
// //   const { categoryId } = useParams(); // Extract categoryId from URL

// //   const handleCourseClick = (courseId) => {
// //     navigate(`/judgements-details/${courseId}`);
// //   };

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         // If your API supports filtering by category, adjust the URL
// //         // Example: `https://alic-website-2-1.onrender.com/judement/display?categoryId=${categoryId}`
// //         const response = await fetch('https://alic-website-2-1.onrender.com/judement/display');
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch courses');
// //         }
// //         const data = await response.json();

// //         // Filter courses by categoryId if provided
// //         const filteredCourses = categoryId
// //           ? data.filter(course => course.categoryId === categoryId || course._categoryId === categoryId)
// //           : data; // Show all courses if no categoryId

// //         setCourses(filteredCourses);
// //         if (filteredCourses.length === 0 && categoryId) {
// //           setError("No courses found for this category.");
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCourses();
// //   }, [categoryId]); // Re-fetch when categoryId changes

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div className="row td_gap_y_10 td_row_gap_30">
// //       {courses.map((course) => (
// //         <div key={course._id} className="col-xl-12 mb-4">
// //           <div
// //             className="td_card td_style_5 td_type_3"
// //             style={{
// //               padding: "10px",
// //               border: '2px solid #e0e0e0',
// //               borderRadius: '12px',
// //               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// //               transition: 'all 0.3s ease',
// //               ':hover': {
// //                 boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
// //                 borderColor: '#0066cc'
// //               }
// //             }}
// //           >
// //             <div className="td_card_thumb" onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //               <span className="td_card_thumb_in td_radius_10">
// //                 <img src={Array.isArray(course.images) ? course.images[0] : course.images} alt={course.title} />
// //                 <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
// //                   {dayjs(course.lastDate).format('DD MMM YYYY')}
// //                 </span>
// //               </span>
// //             </div>
// //             <div className="td_card_content">
// //               <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
// //                 <span onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //                   {course.title}
// //                 </span>
// //               </h2>
// //               <div>
// //                 <p>{course.subTitle}.</p>
// //               </div>
// //               <div className="td_card_btns_wrap justify-content-between">
// //                 <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
// //                   <span className="td_accent_color">
// //                     <span>Posted By : </span>
// //                     <span className="td_fs_18 td_medium td_heading_color">
// //                       {course.publicerName}
// //                     </span>
// //                   </span>
// //                 </div>
// //                 <div
// //                   onClick={() => handleCourseClick(course._id)}
// //                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
// //                   style={{ cursor: 'pointer' }}
// //                 >
// //                   <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import dayjs from "dayjs";

// // export const CoursesAllList = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();
// //   const { categoryId } = useParams(); // Extract categoryId from URL

// //   const handleCourseClick = (courseId) => {
// //     navigate(`/judgements-details/${courseId}`);
// //   };

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch('https://alic-website-2-1.onrender.com/judement/display');
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch courses');
// //         }
// //         const data = await response.json();

// //         // Filter courses by categoryId if provided
// //         const filteredCourses = categoryId
// //           ? data.filter(course => {
// //               // Check multiple possible ID fields to handle different API responses
// //               const courseCategoryId = course.categoryId || course._categoryId || course.category?.id;
// //               return courseCategoryId === categoryId;
// //             })
// //           : data; // Show all courses if no categoryId

// //         setCourses(filteredCourses);
// //         if (filteredCourses.length === 0) {
// //           setError(categoryId
// //             ? "No courses found for this category."
// //             : "No courses available.");
// //         } else {
// //           setError(null);
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCourses();
// //   }, [categoryId]); // Re-fetch when categoryId changes

// //   if (loading) return (
// //     <div className="text-center py-5">
// //       <div className="spinner-border text-danger" role="status">
// //         <span className="visually-hidden">Loading...</span>
// //       </div>
// //     </div>
// //   );

// //   if (error) return (
// //     <div className="alert alert-danger text-center">
// //       {error}
// //       {categoryId && (
// //         <button
// //           className="btn btn-link"
// //           onClick={() => navigate('/judgements')}
// //         >
// //           Show all courses
// //         </button>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <div className="row td_gap_y_10 td_row_gap_30">
// //       {courses.map((course) => (
// //         <div key={course._id} className="col-xl-12 mb-4">
// //           <div
// //             className="td_card td_style_5 td_type_3"
// //             style={{
// //               padding: "10px",
// //               border: '2px solid #e0e0e0',
// //               borderRadius: '12px',
// //               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// //               transition: 'all 0.3s ease',
// //               ':hover': {
// //                 boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
// //                 borderColor: '#0066cc'
// //               }
// //             }}
// //           >
// //             <div className="td_card_thumb" onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //               <span className="td_card_thumb_in td_radius_10">
// //                 <img
// //                   src={Array.isArray(course.images) ? course.images[0] : course.images}
// //                   alt={course.title}
// //                   style={{ width: '100%', height: '200px', objectFit: 'cover' }}
// //                 />
// //                 <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
// //                   {dayjs(course.lastDate).format('DD MMM YYYY')}
// //                 </span>
// //               </span>
// //             </div>
// //             <div className="td_card_content">
// //               <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
// //                 <span onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
// //                   {course.title}
// //                 </span>
// //               </h2>
// //               <div>
// //                 <p>{course.subTitle}.</p>
// //               </div>
// //               <div className="td_card_btns_wrap justify-content-between">
// //                 <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
// //                   <span className="td_accent_color">
// //                     <span>Posted By : </span>
// //                     <span className="td_fs_18 td_medium td_heading_color">
// //                       {course.publicerName}
// //                     </span>
// //                   </span>
// //                 </div>
// //                 <div
// //                   onClick={() => handleCourseClick(course._id)}
// //                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
// //                   style={{ cursor: 'pointer' }}
// //                 >
// //                   <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // import React, { useState, useEffect, useCallback } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import dayjs from "dayjs";
// // import PropTypes from 'prop-types';

// // export const CoursesAllList = ({ selectedCategoryId }) => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();
// //   const { categoryId } = useParams();

// //   useEffect(() => {
// //     if (selectedCategoryId) {
// //       console.log("Received category ID in CoursesAllList:", selectedCategoryId);
// //       // Here you would typically fetch/filter data based on the category ID
// //       fetchCoursesByCategory(selectedCategoryId);
// //     } else {
// //       console.log("No category selected - showing all courses");
// //       fetchAllCourses();
// //     }
// //   }, [selectedCategoryId]);

// //   const handleCourseClick = useCallback((courseId) => {
// //     navigate(`/judgements-details/${courseId}`);
// //   }, [navigate]);

// //   const fetchCourses = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await fetch('https://alic-website-2-1.onrender.com/judement/display');
// //       if (!response.ok) throw new Error('Failed to fetch courses');

// //       const data = await response.json();

// //       const filteredCourses = categoryId
// //         ? data.filter(course => {
// //             const courseCategoryId = course.categoryId || course._categoryId || course.category?.id;
// //             return courseCategoryId === categoryId;
// //           })
// //         : data;

// //       setCourses(filteredCourses);

// //       if (filteredCourses.length === 0) {
// //         setError(categoryId
// //           ? "No courses found for this category."
// //           : "No courses available.");
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [categoryId]);

// //   useEffect(() => {
// //     fetchCourses();
// //   }, [fetchCourses]);

// //   const renderCourseCard = (course) => (
// //     <div key={course._id} className="col-xl-12 mb-4">
// //       <div className="td_card td_style_5 td_type_3 hover-effect">
// //         <div
// //           className="td_card_thumb clickable"
// //           onClick={() => handleCourseClick(course._id)}
// //         >
// //           <span className="td_card_thumb_in td_radius_10">
// //             <img
// //               src={Array.isArray(course.images) ? course.images[0] : course.images}
// //               alt={course.title}
// //               className="course-thumbnail"
// //             />
// //             <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
// //               {dayjs(course.lastDate).format('DD MMM YYYY')}
// //             </span>
// //           </span>
// //         </div>
// //         <div className="td_card_content">
// //           <h2 className="td_card_title td_fs_24 td_semibold td_mb_12 clickable"
// //               onClick={() => handleCourseClick(course._id)}>
// //             {course.title}
// //           </h2>
// //           <p className="td_mb_3">{course.subTitle}.</p>
// //           <div className="td_card_btns_wrap justify-content-between">
// //             <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
// //               <span className="td_accent_color">
// //                 <span>Posted By: </span>
// //                 <span className="td_fs_18 td_medium td_heading_color">
// //                   {course.publicerName}
// //                 </span>
// //               </span>
// //             </div>
// //             <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14 clickable"
// //                 onClick={() => handleCourseClick(course._id)}>
// //               <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   if (loading) return (
// //     <div className="text-center py-5">
// //       <div className="spinner-border text-danger" role="status">
// //         <span className="visually-hidden">Loading...</span>
// //       </div>
// //       <p className="mt-2">Loading courses...</p>
// //     </div>
// //   );

// //   if (error) return (
// //     <div className="alert alert-danger text-center">
// //       <div>{error}</div>
// //       {categoryId && (
// //         <button
// //           className="btn btn-outline-primary mt-2"
// //           onClick={() => navigate('/judgements')}
// //         >
// //           Show all courses
// //         </button>
// //       )}
// //       <button
// //         className="btn btn-link mt-2"
// //         onClick={fetchCourses}
// //       >
// //         Try Again
// //       </button>
// //     </div>

// //   );

// //   return (
// //     <div className="row td_gap_y_10 td_row_gap_30">
// //       {courses.length > 0 ? (
// //         courses.map(renderCourseCard)
// //       ) : (
// //         <div className="col-12 text-center py-5">
// //           <h4>No courses found</h4>
// //           <button
// //             className="btn btn-primary mt-3"
// //             onClick={() => navigate('/judgements')}
// //           >
// //             Browse All Courses
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // CSS should be added to your stylesheet
// // const styles = `
// //   .hover-effect {
// //     padding: 10px;
// //     border: 2px solid #e0e0e0;
// //     border-radius: 12px;
// //     box-shadow: 0 4px 12px rgba(0,0,0,0.1);
// //     transition: all 0.3s ease;
// //   }
// //   .hover-effect:hover {
// //     box-shadow: 0 6px 16px rgba(0,0,0,0.15);
// //     border-color: #0066cc;
// //   }
// //   .course-thumbnail {
// //     width: 100%;
// //     height: 200px;
// //     object-fit: cover;
// //   }
// //   .clickable {
// //     cursor: pointer;
// //   }
// // `;

// import React, { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import dayjs from "dayjs";
// import PropTypes from 'prop-types';

// export const CoursesAllList = ({ selectedCategoryId }) => {
//   const [allCourses, setAllCourses] = useState([]); // Store all courses
//   const [filteredCourses, setFilteredCourses] = useState([]); // Store filtered courses
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { categoryId } = useParams();

//   console.log(selectedCategoryId,"id")
//   // Fetch all courses when component mounts
//   const fetchAllCourses = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('https://alic-website-2-1.onrender.com/judement/display');
//       if (!response.ok) throw new Error('Failed to fetch courses');
//       console.log(allCourses,'data')

//       const data = await response.json();
//       setAllCourses(data);

//       if (data.length === 0) {
//         setError("No courses available.");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllCourses();
//   }, [fetchAllCourses]);

//   // Filter courses whenever selectedCategoryId or URL categoryId changes
//   useEffect(() => {
//     if (allCourses.length === 0) return;

//     let activeCategoryId = selectedCategoryId || categoryId;

//     if (activeCategoryId) {
//       const filtered = allCourses.filter(course => {
//         const courseCategoryId = course.categoryId || course._categoryId || course.category?.id;
//         return courseCategoryId === activeCategoryId;
//       });
//       setFilteredCourses(filtered);

//       if (filtered.length === 0) {
//         setError("No courses found for this category.");
//       } else {
//         setError(null);
//       }
//     } else {
//       setFilteredCourses(allCourses);
//       setError(null);
//     }
//   }, [selectedCategoryId, categoryId, allCourses]);

//   const handleCourseClick = useCallback((courseId) => {
//     navigate(`/judgements-details/${courseId}`);
//   }, [navigate]);

//   const renderCourseCard = (course) => (
//     <div key={course._id} className="col-xl-12 mb-4">
//       <div className="td_card td_style_5 td_type_3 hover-effect">
//         <div
//           className="td_card_thumb clickable"
//           onClick={() => handleCourseClick(course._id)}
//         >
//           <span className="td_card_thumb_in td_radius_10">
//             <img
//               src={Array.isArray(course.images) ? course.images[0] : course.images}
//               alt={course.title}
//               className="course-thumbnail"
//             />
//             <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
//               {dayjs(course.lastDate).format('DD MMM YYYY')}
//             </span>
//           </span>
//         </div>
//         <div className="td_card_content">
//           <h2 className="td_card_title td_fs_24 td_semibold td_mb_12 clickable"
//               onClick={() => handleCourseClick(course._id)}>
//             {course.title}
//           </h2>
//           <p className="td_mb_3">{course.subTitle}.</p>
//           <div className="td_card_btns_wrap justify-content-between">
//             <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
//               <span className="td_accent_color">
//                 <span>Posted By: </span>
//                 <span className="td_fs_18 td_medium td_heading_color">
//                   {course.publicerName}
//                 </span>
//               </span>
//             </div>
//             <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14 clickable"
//                 onClick={() => handleCourseClick(course._id)}>
//               <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) return (
//     <div className="text-center py-5">
//       <div className="spinner-border text-danger" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//       <p className="mt-2">Loading courses...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="alert alert-danger text-center">
//       <div>{error}</div>
//       {(selectedCategoryId || categoryId) && (
//         <button
//           className="btn btn-outline-primary mt-2"
//           onClick={() => navigate('/judgements')}
//         >
//           Show all courses
//         </button>
//       )}
//       <button
//         className="btn btn-link mt-2"
//         onClick={fetchAllCourses}
//       >
//         Try Again
//       </button>
//     </div>
//   );

//   return (
//     <div className="row td_gap_y_10 td_row_gap_30">
//       {filteredCourses.length > 0 ? (
//         filteredCourses.map(renderCourseCard)
//       ) : (
//         <div className="col-12 text-center py-5">
//           <h4>No courses found</h4>
//           <button
//             className="btn btn-primary mt-3"
//             onClick={() => navigate('/judgements')}
//           >
//             Browse All Courses
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// CoursesAllList.propTypes = {
//   selectedCategoryId: PropTypes.string
// };

// // Add this to your stylesheet
// const styles = `
//   .hover-effect {
//     padding: 10px;
//     border: 2px solid #e0e0e0;
//     border-radius: 12px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//     transition: all 0.3s ease;
//   }
//   .hover-effect:hover {
//     box-shadow: 0 6px 16px rgba(0,0,0,0.15);
//     border-color: #0066cc;
//   }
//   .course-thumbnail {
//     width: 100%;
//     height: 200px;
//     object-fit: cover;
//   }
//   .clickable {
//     cursor: pointer;
//   }
// `;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";

export const CoursesAllList = ({ selectedCategoryId }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const fetchAllCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://alic-website-2-1.onrender.com/judement/display"
      );
      if (!response.ok) throw new Error("Failed to fetch judgments");

      const data = await response.json();
      console.log("API Response:", data); // Debug
      setAllCourses(data);

      if (data.length === 0) {
        setError("No judgments available.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    if (allCourses.length === 0) return;

    const activeCategoryId = selectedCategoryId || categoryId;

    if (!activeCategoryId) {
      setFilteredCourses(allCourses);
      setError(null);
      return;
    }

    console.log("Active Category ID:", activeCategoryId); // Debug

    const filtered = allCourses.filter((judgment) => {
      const categoryIdFromJudgment =
        judgment.judementCategory?._id || judgment.judementCategory;

      console.log(
        `Judgment ${judgment._id} has category:`,
        categoryIdFromJudgment
      ); // Debug

      return categoryIdFromJudgment?.toString() === activeCategoryId.toString();
    });

    setFilteredCourses(filtered);

    if (filtered.length === 0) {
      setError(`No judgments found for this category.`);
    } else {
      setError(null);
    }
  }, [selectedCategoryId, categoryId, allCourses]);

  const handleCourseClick = useCallback(
    (courseId) => {
      navigate(`/judgements-details/${courseId}`);
    },
    [navigate]
  );

  const renderCourseCard = (course) => (
    <div key={course._id} className="col-xl-12 mb-4">
      <div className="td_card td_style_5 td_type_3 hover-effect">
        <div
          className="td_card_thumb clickable"
          onClick={() => handleCourseClick(course._id)}
        >
          <span className="td_card_thumb_in td_radius_10">
            <img
              src={
                Array.isArray(course.images) ? course.images[0] : course.images
              }
              alt={course.altText}
              className="course-thumbnail"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
            <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
              {dayjs(course.lastDate).format("DD MMM YYYY")}
            </span>
          </span>
        </div>
        <div className="td_card_content">
          <h2
            className="td_card_title td_fs_24 td_semibold td_mb_12 clickable"
            onClick={() => handleCourseClick(course._id)}
          >
            {course.title}
          </h2>
          <p className="td_mb_3">{course.subTitle}</p>
          <div className="td_card_btns_wrap justify-content-between">
            <div className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
              <span className="td_accent_color">
                <span>Posted By: </span>
                <span className="td_fs_18 td_medium td_heading_color">
                  {course.publicerName}
                </span>
              </span>
            </div>
            <div
              className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14 clickable"
              onClick={() => handleCourseClick(course._id)}
            >
              <span className="td_btn_in td_white_color td_accent_bg">
                Read more...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading judgments...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center">
        <div>{error}</div>
        <div className="d-flex justify-content-center gap-2 mt-3">
          {(selectedCategoryId || categoryId) && (
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/judgements")}
            >
              Show all judgments
            </button>
          )}
          <button className="btn btn-primary" onClick={fetchAllCourses}>
            Refresh
          </button>
        </div>
      </div>
    );

  return (
    <div className="row td_gap_y_10 td_row_gap_30">
      {filteredCourses.length > 0 ? (
        filteredCourses.map(renderCourseCard)
      ) : (
        <div className="col-12 text-center py-5">
          <h4>No judgments found</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/judgements")}
          >
            Browse All Judgments
          </button>
        </div>
      )}
    </div>
  );
};

CoursesAllList.propTypes = {
  selectedCategoryId: PropTypes.string,
};

// Styles
const styles = `
  .hover-effect {
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  .hover-effect:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    border-color: #0066cc;
    transform: translateY(-2px);
  }
  .course-thumbnail {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  .clickable {
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .clickable:hover {
    color: #0066cc;
  }
`;

// Inject styles
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
