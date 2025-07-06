

import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const TargetJudiciaryCourse = ({ selectedCategoryId, selectedSubCategoryId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const { id: courseId } = useParams();

  


    console.log(selectedCategoryId, "TARGET")

    return (
        <div className="py-4" style={{ backgroundColor: "#f5f7fa" }}>
            <div className="container">
                <div className="row justify-content-center">
                    {filteredCourses.map((course) => (
                        <div key={course._id} className="col-md-6 mb-4">
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={Array.isArray(course.images) ? course.images[0] : course.images}
                                    alt={course.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                    <Card.Title className="mb-0">{course.title}</Card.Title>
                                    <span style={{ color: "#C81A1E" }} className="fw-bold">
                                        {course.Price}
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    <h6>Features:</h6>
                                    <ul className="mb-3">
                                        {course.features && course.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>

                                    <div className="card-text">
                                        <div className="d-flex justify-content-between mb-2 border-bottom">
                                            <span className="fw-bold">Price:</span>
                                            <span>{course.Price}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2 border-bottom">
                                            <span className="fw-bold">Duration:</span>
                                            <span>{course.Durations || 'N/A'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2 border-bottom">
                                            <span className="fw-bold">Faculty:</span>
                                            <span>{course.TrainerName || 'N/A'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="fw-bold">Course Type:</span>
                                            <span>{course.category?.name || 'N/A'}</span>
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
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-danger" className="w-50">Free Demo</Button>
                                        <Button variant="outline-dark" className="w-50">Explore Courses</Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TargetJudiciaryCourse;