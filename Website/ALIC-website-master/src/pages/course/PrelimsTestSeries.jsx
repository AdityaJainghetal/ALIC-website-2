// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Card, Button, Carousel } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import DOMPurify from "dompurify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   fetchcategory,
//   fetchSubcategory,
//   fetchSubsubcategory,
// } from "../../api";

// const PrelimsTestSeries = ({ selectedCategoryId }) => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subsubCategories, setSubsubCategories] = useState([]);
//   const { category, subcategory, subsubcategory } = useParams();

//   console.log(selectedCategoryId, "PRE");
//   console.log(filteredCourses, "data show");

//   useEffect(() => {
//     fetchCourses();
//     fetchCategories();
//     fetchAllSubcategories();
//     fetchAllSubsubcategories();
//   }, []);

//   useEffect(() => {
//     if (courses.length > 0) {
//       filterCourses();
//     }
//   }, [category, subcategory, subsubcategory, courses, selectedCategoryId]);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to load categories. Please try again.");
//     }
//   };

//   const fetchAllSubcategories = async () => {
//     try {
//       const response = await fetchSubcategory();
//       if (response.data) {
//         setSubCategories(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       toast.error("Failed to load subcategories. Please try again.");
//     }
//   };

//   const fetchAllSubsubcategories = async () => {
//     try {
//       const response = await fetchSubsubcategory();
//       if (response.data) {
//         setSubsubCategories(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching subsubcategories:", error);
//       toast.error("Failed to load subsubcategories. Please try again.");
//     }
//   };

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8000/test/display");
//       if (response.data && Array.isArray(response.data.data)) {
//         setCourses(response.data.data);
//       } else {
//         console.error(
//           "API response data is not in expected format:",
//           response.data
//         );
//         setCourses([]);
//         toast.error("Invalid course data format received from server");
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCourses = () => {
//     let filtered = [...courses];

//     if (category) {
//       const categoryObj = categories.find(
//         (cat) => cat.categoryname.toLowerCase() === category.toLowerCase()
//       );
//       if (categoryObj) {
//         filtered = filtered.filter(
//           (course) => course.category === categoryObj._id
//         );
//       }
//     }

//     if (subcategory) {
//       const subcategoryObj = subCategories.find(
//         (sub) => sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
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
//             selectedCategoryId.name.toLowerCase()
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   const sanitizeHtml = (html) => {
//     return DOMPurify.sanitize(html);
//   };

//   if (loading) {
//     return <div className="container my-5 text-center">Loading courses...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <div className="row">
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((test) => (
//             <div className="col-md-6 mb-4" key={test._id}>
//               <Card className="h-100 shadow-sm">
//                 {/* Image Carousel Section */}
//                 {test.images && test.images.length > 0 ? (
//                   <Carousel
//                     indicators={test.images.length > 1}
//                     controls={test.images.length > 1}
//                   >
//                     {test.images.map((image, index) => (
//                       <Carousel.Item key={index}>
//                         <div
//                           className="d-block w-100"
//                           style={{
//                             backgroundImage: `url(${image})`,
//                             backgroundSize: "cover",
//                             backgroundPosition: "center",
//                           }}
//                         />
//                       </Carousel.Item>
//                     ))}
//                   </Carousel>
//                 ) : (
//                   <div
//                     className="bg-secondary d-flex justify-content-center align-items-center"
//                     style={{ height: "200px" }}
//                   >
//                     <span className="text-white">No Image Available</span>
//                   </div>
//                 )}

//                 <Card.Header className="bg-white d-flex justify-content-center  align-items-center">
//                   <Card.Title className="mb-0 fs-5 fw-bold">
//                     {test.testmodule}
//                   </Card.Title>
//                 </Card.Header>
//                 <Card.Body>
//                   {/* <h6>Features:</h6>
//                                     <div
//                                         className="mb-3"
//                                         dangerouslySetInnerHTML={{ __html: sanitizeHtml(test.CourseDescription) }}
//                                     /> */}

//                   <div className="card-text">
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Judicary:</span>
//                       <span>{test.subsubCategory.name}</span>
//                     </div>

//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Course:</span>
//                       <span>{test.subsubCategory.subCategory}</span>
//                     </div>

//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Price:</span>
//                       <span>₹{test.Price}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2 border-bottom">
//                       <span className="fw-bold">Duration:</span>
//                       <span>{test.Durations}</span>
//                     </div>
//                     {test.LastDate && (
//                       <div className="d-flex justify-content-between mb-2 border-bottom">
//                         <span className="fw-bold">Last Date:</span>
//                         <span>
//                           {new Date(test.LastDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </Card.Body>
//                 <Card.Footer className="bg-white d-flex gap-2 ">
//                   <Link
//                     to={`/testseries/${test._id}`}
//                     className="btn w-100 mb-2"
//                     style={{ background: "#C81A1E", color: "white" }}
//                   >
//                     View Details
//                   </Link>
//                   {/* <Button className="btn mb-2 p-0 w-50">Explore</Button> */}
//                   <div className="">
//                     {/* <Button variant="outline-danger" className="w-50">Free Demo</Button> */}
//                   </div>
//                 </Card.Footer>
//               </Card>
//             </div>
//           ))
//         ) : (
//           <div className="col-12 text-center">
//             <h4>No test series found for this category</h4>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrelimsTestSeries;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Button, Carousel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchcategory,
  fetchSubcategory,
  fetchSubsubcategory,
} from "../../api";

const PrelimsTestSeries = ({ selectedCategoryId }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const { category, subcategory, subsubcategory } = useParams();

  console.log(selectedCategoryId, "PRE");
  console.log(filteredCourses, "data show");

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
      const response = await axios.get("http://localhost:8000/test/display");
      if (response.data && Array.isArray(response.data.data)) {
        setCourses(response.data.data);
      } else {
        console.error(
          "API response data is not in expected format:",
          response.data
        );
        setCourses([]);
        toast.error("Invalid course data format received from server");
      }
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

    if (category) {
      const categoryObj = categories.find(
        (cat) => cat.categoryname.toLowerCase() === category.toLowerCase()
      );
      if (categoryObj) {
        filtered = filtered.filter(
          (course) => course.category === categoryObj._id
        );
      }
    }

    if (subcategory) {
      const subcategoryObj = subCategories.find(
        (sub) => sub.subcategoryname.toLowerCase() === subcategory.toLowerCase()
      );
      if (subcategoryObj) {
        filtered = filtered.filter(
          (course) => course.subcategory === subcategoryObj._id
        );
      }
    }

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
    <div className="container my-5">
      <div className="row">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((test) => (
            <div className="col-md-6 mb-4" key={test._id}>
              <Card className="h-100 shadow-sm">
                {/* Image Carousel Section */}
                {test.images && test.images.length > 0 ? (
                  <Carousel
                    indicators={test.images.length > 1}
                    controls={test.images.length > 1}
                  >
                    {test.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <div
                          className="d-block w-100"
                          style={{
                            height: "200px",
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <div
                    className="bg-secondary d-flex justify-content-center align-items-center"
                    style={{ height: "200px" }}
                  >
                    <span className="text-white">No Image Available</span>
                  </div>
                )}

                <Card.Header className="bg-white d-flex justify-content-center  align-items-center">
                  <Card.Title className="mb-0 fs-5 fw-bold">
                    {test.testmodule}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  {/* <h6>Features:</h6>
                                    <div
                                        className="mb-3"
                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(test.CourseDescription) }}
                                    /> */}

                  <div className="card-text">
                    <div className="d-flex justify-content-between mb-2 border-bottom">
                      <span className="fw-bold">Judicary:</span>
                      <span>{test.subsubCategory.name}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2 border-bottom">
                      <span className="fw-bold">Course:</span>
                      <span>{test.subsubCategory.subCategory}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2 border-bottom">
                      <span className="fw-bold">Price:</span>
                      <span>₹{test.Price}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2 border-bottom">
                      <span className="fw-bold">Duration:</span>
                      <span>{test.Durations}</span>
                    </div>
                    {test.LastDate && (
                      <div className="d-flex justify-content-between mb-2 border-bottom">
                        <span className="fw-bold">Last Date:</span>
                        <span>
                          {new Date(test.LastDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white d-flex gap-2 ">
                  <Link
                    to={`/testseries/${test._id}`}
                    className="btn w-100 mb-2"
                    style={{ background: "#C81A1E", color: "white" }}
                  >
                    View Details
                  </Link>
                  {/* <Button className="btn mb-2 p-0 w-50">Explore</Button> */}
                  <div className="">
                    {/* <Button variant="outline-danger" className="w-50">Free Demo</Button> */}
                  </div>
                </Card.Footer>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h4>No test series found for this category</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrelimsTestSeries;
