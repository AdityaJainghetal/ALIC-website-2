import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OtherCoursesSlider = () => {
  const [courses, setCourses] = useState([]);
  // const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/othercourse");
      if (response.data) {
        setCourses(response.data);
        // Filter out the current course and get other courses from the same subcategory
        const filtered = response.data.filter(
          (course) =>
            course._id !== id &&
            course.subCategory?._id ===
              response.data.find((c) => c._id === id)?.subCategory?._id
        );
        setcourses(filtered);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      // toast.error("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [id]);

  const getImageUrl = (course) => {
    if (Array.isArray(course.images) && course.images.length > 0) {
      return course.images[0];
    }
    if (typeof course.images === "string") {
      return course.images;
    }
    return "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF3fGVufDB8fDB8fHww";
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="text-center py-5">Loading courses...</div>;
  }

  return (
    <div className="mt-5 mb-5">
      <h3 className="mb-4">Other Courses</h3>
      {courses.length > 0 ? (
        <Slider {...sliderSettings}>
          {courses.map((course) => (
            <div key={course._id} className="px-2">
              <Card
                className="h-100 cursor-pointer shadow-sm"
                onClick={() => navigate(`/otherseries/${course._id}`)}
              >
                <div className="d-flex flex-row" style={{ minHeight: "150px" }}>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      src={getImageUrl(course)}
                      alt={course.Coursename || "Course image"}
                      style={{
                        width: "150px",
                        height: "150px",
                        // objectFit: 'cover'
                      }}
                    />
                  </div>
                  <Card.Body className="flex-grow-1">
                    <Card.Title className="h6">
                      {course.Coursename || "Untitled Course"}
                    </Card.Title>
                    <Card.Text className="small">
                      <div>
                        <strong>Duration:</strong> {course.Durations || "N/A"}{" "}
                        months
                      </div>
                      <div>
                        <strong>Price:</strong> ₹{course.Price || "N/A"}
                      </div>
                      <div>
                        <strong>Trainer:</strong> {course.TrainerName || "N/A"}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center py-3">
          <p>No related courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default OtherCoursesSlider;
