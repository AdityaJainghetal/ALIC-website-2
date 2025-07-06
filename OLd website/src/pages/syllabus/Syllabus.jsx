import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { Layout } from "../../layouts/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import OtherCoursesSlider from "../course/OtherCourses";

export const SyllabusDownload = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/syllabus/category/${id}`
        );
        setSyllabusData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleShowModal = (syllabus) => {
    setSelectedSyllabus({
      ...syllabus,
      pdfUrl: syllabus.PDFbrochure, // Ensure this field is used in download
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", city: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadPdf = (pdfUrl, courseName) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${courseName}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register/add", formData);
      if (selectedSyllabus?.pdfUrl) {
        handleDownloadPdf(selectedSyllabus.pdfUrl, selectedSyllabus.Coursename);
      }
      alert(
        `Download started! Syllabus for ${selectedSyllabus.Coursename} has also been sent to ${formData.email}`
      );
      handleCloseModal();
    } catch (err) {
      alert("Error submitting form. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!syllabusData.length) return <EmptyView />;

  return (
    <Layout header={9} footer={1}>
      <section className="ptb py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{ marginTop: "100px" }}>
              <div className="cart_wrapper">
                <SyllabusTable
                  syllabusData={syllabusData}
                  onDownloadClick={handleShowModal}
                />
              </div>
            </div>
          </div>

          <DownloadModal
            show={showModal}
            onHide={handleCloseModal}
            onSubmit={handleSubmit}
            formData={formData}
            onInputChange={handleInputChange}
            courseName={selectedSyllabus?.Coursename}
          />
        </div>
      </section>
      <OtherCoursesSlider />
    </Layout>
  );
};

const SyllabusTable = ({ syllabusData, onDownloadClick }) => (
  <div className="table-responsive text-center">
    <div className="cart_wrapper">
      <h3 className="main-heading">
        Download the Syllabus for Judicial Services
      </h3>
      <Table striped bordered>
        <thead className="bg-dark text-white">
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Download PDF</th>
          </tr>
        </thead>
        <tbody>
          {syllabusData.map((item) => (
            <tr key={item._id}>
              <td>{item.Coursename}</td>
              <td>
                <Button
                  className="th-btn td_btn_in td_white_color td_accent_bg py-2 border-0 rounded  fw-semibold"
                  onClick={() => onDownloadClick(item)}
                >
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

const DownloadModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  onInputChange,
  courseName,
}) => (
  <Modal show={show} onHide={onHide} backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>Download {courseName} Syllabus</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={onInputChange}
            required
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Download
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

const LoadingView = () => (
  <Layout header={9} footer={1}>
    <section className="ptb ptb-xs-60 py-5">
      <div className="container text-center">
        <h4>Loading...</h4>
      </div>
    </section>
  </Layout>
);

const ErrorView = ({ error }) => (
  <Layout header={9} footer={1}>
    <section className="ptb ptb-xs-60 py-5">
      <div className="container text-center">
        <h4>Error: {error}</h4>
      </div>
    </section>
  </Layout>
);

const EmptyView = () => (
  <Layout header={9} footer={1}>
    <section className="ptb ptb-xs-60 py-5">
      <div className="container text-center">
        <h4>No syllabus available to download.</h4>
      </div>
    </section>
  </Layout>
);
