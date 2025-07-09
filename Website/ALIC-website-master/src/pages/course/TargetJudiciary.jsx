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

// const TargetJudiciaryCourse = ({ subCategoryShow, selectedSubCategoryId }) => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [filteredCourses, setFilteredCourses] = useState([]);
//     const { id: courseId } = useParams();

//     console.log(courses,"dataaaaaaaaaaaaaa")
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get('http://localhost:8000/api/alldisplay'); // Replace with your actual API endpoint
//                 setCourses(res.data);
//                 setLoading(false);
//             } catch (error) {
//                 toast.error('Failed to fetch courses');
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, []);

//     useEffect(() => {
//         if (selectedSubCategoryId && courses.length > 0) {
//             const filtered = courses.filter(
//                 (course) => course.subsubCategory?._id === selectedSubCategoryId
//             );
//             setFilteredCourses(filtered);
//         } else {
//             setFilteredCourses([]);
//         }
//     }, [selectedSubCategoryId, courses]);

//     console.log(selectedSubCategoryId, "TARGET");

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

//                                 <Card.Body>
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

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

const TargetJudiciaryCourse = ({
  selectedCategoryId,
  selectedSubCategoryId,
}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { id: courseId } = useParams();


  // console.log(courseId,"dataaaaaaaaaaaaaaaa")
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:8000/api/getrecordedcourse/${courseId}`);
      if (data) {
        setCourses(data);
        filterCourses(
          data,
          selectedCategoryId,
          courseId || selectedSubCategoryId
        );
      }
      // console.log(data,"Course dataaaaaaaaaaaaaaaaaa")
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = (coursesList, categoryId, subCategoryId) => {
    console.log("Filtering for courseId:", courseId);
    console.log("SubcategoryId:", subCategoryId);
    console.log("CategoryId:", categoryId);

    coursesList.forEach((course) => {
     
    });

    let filtered = coursesList;

    if (courseId) {
      filtered = filtered.filter(
        (course) => course?.subsubCategory?._id === courseId
      );
    } else if (subCategoryId) {
      filtered = filtered.filter(
        (course) => course.subCategory?._id === subCategoryId
      );
    } else if (categoryId) {
      filtered = filtered.filter(
        (course) => course.category?._id === categoryId
      );
    }

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
        {/* <h1>aaaaaaaaaaaaaaaaaaaaaaa</h1> */}

        <div className="row g-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const courseId = course._id || course.id;
              const imageSrc = Array.isArray(course.images)
                ? course.images[0]
                : course.images;

              return (
                <div className="col-md-6" key={courseId}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img
                      variant="top"
                      src={imageSrc}
                      alt="Course"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center justify-content-center"></div>
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

export default TargetJudiciaryCourse;
