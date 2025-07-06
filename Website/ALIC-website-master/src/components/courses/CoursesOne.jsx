import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";

import { CoursesOneItem } from "./CoursesOneItem";
import courseThumb1 from "../../assets/alec-img/courses/course-1.jpg";
import courseThumb2 from "../../assets/alec-img/courses/up-course.jpg";
import courseThumb3 from "../../assets/alec-img/courses/jh-course.jpg";
import courseThumb4 from "../../assets/alec-img/courses/bihar-course.jpg";
import courseThumb5 from "../../assets/alec-img/courses/uttarakhand-course.jpg";
import courseThumb6 from "../../assets/alec-img/courses/rj-course.jpg";

export const CoursesOne = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/allcourse");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  // Fallback images in case API data doesn't include images
  const images = [
    courseThumb1,
    courseThumb2,
    courseThumb3,
    courseThumb4,
    courseThumb5,
    courseThumb6,
  ];

  if (loading) {
    return <div className="text-center py-5">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <section style={{ backgroundColor: "#f8f9fa" }} className="back-cover">
      <div className="td_height_20 td_height_lg_20" />
      <div className="px-2 px-md-5">
        {/* Header */}
        <div className="td_section_heading td_style_1 text-center">
          <p className="td_section_subtitle_up td_fs_30 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
            Popular Courses
          </p>
          <h2 className="td_section_title td_fs_30 mb-0">Academic Courses</h2>
        </div>
        <div className="td_height_30 td_height_lg_30" />

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="course-slider"
        >
          {courses.map((course, idx) => (
            <SwiperSlide key={course._id || idx}>
              <div
                className="course-item"
                onClick={() => handleCourseClick(course._id)}
                style={{ cursor: "pointer" }}
              >
                <CoursesOneItem
                  // src={images[idx % images.length]}
                  src={
                    Array.isArray(course.images)
                      ? course.images[0]
                      : course.images
                  }
                  seats={course.Price || 100}
                  alt={course.Alttage}
                  semesters={course.Durations || 12}
                  subtitle={course?.category?.name}
                  title={course.Coursename || "Judiciary Examination"}
                  description={
                    course.TrainerName ||
                    "A competitive exam for Civil Judge recruitment."
                  }
                  totalRatings={course.Review || 5}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="td_height_20 td_height_lg_20" />
    </section>
  );
};

export default CoursesOne;

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";

// import axios from "axios";
// import { CoursesOneItem } from "./CoursesOneItem";

// export const CoursesOne = () => {
//   const [courses, setCourses] = useState([]);
//   const api = 'http://localhost:8000/api/allcourse';

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(api);
//         setCourses(response.data);
//       } catch (error) {
//         console.error('Error fetching course data:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <section style={{ backgroundColor:"#f8f9fa" }} className="back-cover">
//   <div className="td_height_10 td_height_lg_10" /> {/* reduced from 20 */}
//   <div className="px-2 px-md-5">
//     {/* Header */}
//     <div className="td_section_heading td_style_1 text-center">
//       <p className="td_section_subtitle_up td_fs_30 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
//         Popular Courses
//       </p>
//       <h2 className="td_section_title td_fs_30 mb-0">Academic Courses</h2>
//     </div>
//     <div className="td_height_20 td_height_lg_20" /> {/* reduced from 30 */}

//     <Swiper
//       modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
//       spaceBetween={20}
//       slidesPerView={3}
//       navigation={{ clickable: true }}
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 2500 }}
//       loop={true}
//       breakpoints={{
//         320: { slidesPerView: 1 },
//         768: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 },
//       }}
//       className="course-slider"
//     >
//       {courses.map((course, idx) => (
//         <SwiperSlide key={idx}>
//           <div className="course-item">
//             <CoursesOneItem
//               src={Array.isArray(course.images) ? course.images[0] : course.images}
//               seats={course.Seat}
//               semesters={course.Semester}
//               subtitle={course.Coursename}
//               title={course.InstructorCourse}
//               description={course.CourseDescription}
//               totalRatings={course.Review}
//             />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>
//   <div className="td_height_10 td_height_lg_10" /> {/* reduced from 20 */}
// </section>

//   );
// };

// export default CoursesOne;
