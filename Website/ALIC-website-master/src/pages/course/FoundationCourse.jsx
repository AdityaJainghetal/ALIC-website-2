
import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

const FoundationCourses = ({ selectedCategoryId, selectedSubCategoryId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { id: courseId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [demoVideoUrl, setDemoVideoUrl] = useState("");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/alldisplay");
      if (response.data) {
        setCourses(response.data);
        filterCourses(
          response.data,
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

    if (courseId) {
      filtered = filtered.filter(
        (course) => course?.subsubCategory?._id === courseId
      );
    }

    if (subCategoryId && subCategoryId !== courseId) {
      filtered = filtered.filter(
        (course) =>
          course.subCategory && course.subCategory._id === subCategoryId
      );
    }

    if (categoryId) {
      filtered = filtered.filter(
        (course) => course.category && course.category._id === categoryId
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

  return (
    <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="container">
        <h3 className="text-center mb-4 fw-bold text-dark">
          {courseId || selectedCategoryId || selectedSubCategoryId
            ? ""
            : "All Foundation Courses"}
        </h3>
        <div className="row g-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div className="col-md-6" key={course._id || course.id}>
                <Card className="h-100 shadow-sm border-0">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={
                        Array.isArray(course.images)
                          ? course.images[0]
                          : course.images
                      }
                      alt="Course"
                      style={{}}
                    />
                  </div>
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
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Judiciary:</span>
                        <span>{course?.subsubCategory?.name || "N/A"}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Price:</span>
                        <span>₹ {course.Price}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Duration:</span>
                        <span>{course.Durations || "N/A"}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Faculty:</span>
                        <span>{course.TrainerName || "N/A"}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Type:</span>
                        <span>{course.category?.name || "N/A"}</span>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 p-3 pt-0">
                    <Link
                      to={`/courses/${course._id || course.id}`}
                      className="btn w-100 mb-2"
                      style={{ backgroundColor: "#C81A1E", color: "white" }}
                    >
                      View Details
                    </Link>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-danger"
                        className="w-50 btn-sm"
                        onClick={() => {
                          setDemoVideoUrl(course?.URL || "");
                          setShowModal(true);
                        }}
                      >
                        Free Demo
                      </Button>
                      <Link
                        className="w-50"
                        to={`/courses/${course._id || course.id}`}
                      >
                        <Button variant="outline-dark" className="w-100 btn-sm">
                          Explore
                        </Button>
                      </Link>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5>
                No courses found{" "}
                {courseId || selectedCategoryId || selectedSubCategoryId
                  ? "for this selection"
                  : ""}
              </h5>
              {!(courseId || selectedCategoryId || selectedSubCategoryId) && (
                <Button
                  variant="primary"
                  onClick={fetchCourses}
                  className="mt-3"
                >
                  Retry Loading Courses
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Demo Video Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Course Demo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
            {demoVideoUrl ? (
              <iframe
                src={demoVideoUrl}
                title="Course Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              ></iframe>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 text-white">
                <div className="text-center">
                  <div className="fs-1 mb-2">🎬</div>
                  <p>Video Coming Soon</p>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FoundationCourses;
