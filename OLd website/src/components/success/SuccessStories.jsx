import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "../../layouts/Layout";
import { CoursesAllGrid } from "../courses/CoursesAllGrid";
import OtherCoursesSlider from "../../pages/course/OtherCourses";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:8000/success/display");
        if (!response.ok) {
          throw new Error("Failed to fetch success stories");
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <Layout header={9} footer={1}>
      <div className="col-md-12">
        <CoursesAllGrid />
      </div>
      <section className=" p-0 text-center bg-light mt-5">
        <div className="container">
          <h2 className="text-danger fw-bold text-uppercase">Success Story</h2>
          <h3 className="fs-2 fw-bold mt-2 mb-4 text-dark">
            Our Recent Success Stories
          </h3>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : (
            <div className="row g-4">
              {stories.map((story, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card border-0 shadow-sm p-3 rounded-3 h-100">
                    <img
                      src={story.images ? story.images[0] : story.image}
                      alt={story.StudentName}
                      className="card-img-top rounded-3"
                      style={{ height: "230px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-dark">
                        {story.StudentName}
                      </h5>
                      <p className="card-text text-muted">{story.Judicial}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <OtherCoursesSlider />
    </Layout>
  );
};

export default SuccessStories;
