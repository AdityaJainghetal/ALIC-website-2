import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  CourseName, // fetch all
  // fetch by ID
} from "../../pages/Redux/CourseThunk";
import { QueryName } from "../../pages/Redux/Query/QueryThunk";
// import {QueryCreate} from "../../pages/Redux/Query/QueryThunk"

// import { fetchLeadType } from "../../../redux/feature/LeadType/LeadTypeThunx";

import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LdBFVArAAAAAF4__ail1UuDTBnqlCt0UCPYVRnC";

export const HeroThree = () => {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const DATA = useSelector((state) => state.leadsource);

  useEffect(() => {
    setBanners(DATA.courseNames);
  }, [DATA]);

  console.log("banners", banners);

  const [leadType, setLeadType] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const occupationType = useSelector((state) => state.leadsource);
  console.log(occupationType, "occupation type");

  useEffect(() => {
    dispatch(CourseName());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    State: "",
    Medium: "",
    message: "",
    captchaToken: "",
  });

  // useEffect(() => {
  //   const fetchBanners = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/banner/alldisplay");
  //       // http://localhost:8000/
  //       setBanners(response.data);
  //     } catch (error) {
  //       console.error("Error fetching banners:", error);
  //     }
  //   };
  //   fetchBanners();
  // }, []);

  const handleCaptcha = (value) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: value,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!formData.captchaToken)
      newErrors.captchaToken = "Please complete the CAPTCHA";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(QueryName(formData)).unwrap();
      console.log(result);
      alert("Query submitted successfully!");
      setFormData({
        Name: "",
        Phone: "",
        State: "",
        Medium: "",
        message: "",
        captchaToken: "",
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .glass-slider {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .neumorphic-form {
          background: #e0e5ec;
          border-radius: 25px;
          padding: 35px;
          box-shadow: 10px 10px 25px #c1c4cb, -10px -10px 25px #ffffff;
        }

        .form-floating {
          position: relative;
          margin-bottom: .5rem;
        }

        .form-floating input,
        .form-floating textarea {
          background: transparent;
          border: none;
          border-bottom: 2px solid #aaa;
          border-radius: 0;
          outline: none;
          width: 100%;
          padding: 20px 0px 0px 5px;
          font-size: 16px;
        }

        .form-floating label {
          position: absolute;
          top: 10px;
          left: 0;
          font-size: 14px;
          transition: 0.3s;
          color: #666;
          pointer-events: none;
        }

        .form-floating input:focus + label,
        .form-floating input:not(:placeholder-shown) + label,
        .form-floating textarea:focus + label,
        .form-floating textarea:not(:placeholder-shown) + label {
          top: -15px;
          font-size: 12px;
          color: #000;
        }

        .form-submit {
          background: linear-gradient(to right, #ED1E24, #b50004);
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 25px;
          width: 100%;
          font-weight: bold;
          font-size: 16px;
          transition: 0.3s ease;
          cursor: pointer;
        }

        .form-submit:hover {
          background: linear-gradient(to right, #b50004, #ED1E24);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(237, 30, 36, 0.4);
        }

        .swiper-pagination-bullet {
          background: #0072ff;
          opacity: 0.6;
          transition: 0.3s;
        }

        .swiper-pagination-bullet-active {
          transform: scale(1.3);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .neumorphic-form {
            padding: 20px;
          }
        }
      `}</style>
      <div className="td_height_60 td_height_lg_60" />
      <div className="container-fluid mt-0 px-4 margin-top" id="contact-sec">
        <div className="row g-4 align-items-stretch my-3">
          {/* Slider */}
          <div className="col-12 col-xl-8">
            <div className="glass-slider h-100">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                style={{ borderRadius: "15px", height: "100%" }}
              >
                {banners &&
                  banners.length > 0 &&
                  banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                      <a href={banner.URL}>
                        <img
                          src={banner.images[0]}
                          alt={banner.altText}
                          style={{
                            width: "100%",
                            height: "100%",

                            borderRadius: "15px",
                          }}
                        />
                      </a>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          {/* Form */}
          <div className="col-12 col-xl-4">
            <div className="neumorphic-form h-100">
              <h5 className="text-center fw-bold mb-4 td_accent_color">
                Do you have any query? <br /> Get a call back!
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label>Your Name*</label>
                </div>

                <div className="form-floating">
                  <input
                    type="tel"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    required
                    placeholder=" "
                  />
                  <label>Phone Number*</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label>Enter your State</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    name="Medium"
                    value={formData.Medium}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label>Enter your Medium</label>
                </div>

                <div className="form-floating">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="2"
                    placeholder=" "
                  ></textarea>
                  <label>Your message</label>
                </div>

                <div className="mb-4">
                  <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={handleCaptcha}
                    required
                  />
                </div>

                <div className="mt-3">
                  <button type="submit" className="form-submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
