// import React from "react";
// import { Link } from "react-router-dom";
// import { useHobble } from "../../lib/hooks/useHobble";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import teamShape1 from "../../assets/img/home_2/team_shape_1.svg";
// import teamShape2 from "../../assets/img/home_2/team_shape_2.svg";

// import teamMember1 from "../../assets/alec-img/about-img/about-direct.jpg";
// import teamMember2 from "../../assets/alec-img/about-img/about-direct.jpg";
// import teamMember3 from "../../assets/alec-img/about-img/about-direct.jpg";
// import teamMember4 from "../../assets/alec-img/about-img/about-direct.jpg";

// export const TeamOne = () => {
//    const [members, setMembers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const apiUrl = 'http://localhost:8000/member/display';

//     useEffect(() => {
//       const fetchMembers = async () => {
//         try {
//           const response = await axios.get(apiUrl);
//           setMembers(response.data);
//           setError(null);
//         } catch (err) {
//           setError(err.message);
//           toast.error('Failed to fetch team members');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchMembers();
//     }, []);

//   useHobble();

//   const teamMembers = [
//     { img: teamMember1, name: "Mr. Nitesh Choubey", role: "Director" },
//     { img: teamMember2, name: "Mr. Nitesh Choubey", role: "Director" },
//     { img: teamMember3, name: "Mr. Nitesh Choubey", role: "Director" },
//     { img: teamMember4, name: "Mr. Nitesh Choubey", role: "Director" },
//   ];

//   return (
//     <section style={{ backgroundColor:"#f8f9fa" }}  className="td_shape_section_8 td_hobble">

//       <div className="td_shape_position_1 position-absolute td_hover_layer_3">
//         <img  src={Array.isArray(course.images) ? course.images[0] : course.images} alt="Team shape 1" />
//       </div>
//       <div className="td_shape_position_2 position-absolute td_hover_layer_3">
//         <img src={teamShape2} alt="Team shape 2" />
//       </div>

//       <div className="td_height_60 td_height_lg_75" />

//       <div className="container">
//         <div
//           className="td_section_heading td_style_1 text-center wow fadeInUp"
//           data-wow-duration="1s"
//           data-wow-delay="0.2s"
//         >
//           <p className="td_section_subtitle_up td_fs_30 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
//             <i></i>
//             team members
//             <i></i>
//           </p>
//           <h2 className="td_section_title td_fs_30 mb-0">Our Expert Instructor</h2>
//           <p className="td_section_subtitle td_fs_18 mb-0">
//             Far far away, behind the word mountains, far from the Consonantia, there <br />
//             live the blind texts. Separated they marks grove right
//           </p>
//         </div>
//         <div className="td_height_50 td_height_lg_50" />

//         {/* Swiper Slider */}
//         <Swiper
//           spaceBetween={30}
//           slidesPerView={1}
//           breakpoints={{
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           modules={[Navigation, Pagination, Autoplay]}
//           className="mySwiper"
//         >
//          {members.map((members, idx) => (
//             <SwiperSlide key={members._id || idx}>
//               <div className="td_team td_style_1 text-center position-relative">
//                 <img  src={Array.isArray(members.images) ? members.images[0] : members.images} className=" h-50 td_radius_10" />
//                 <div className="td_team_info td_white_bg">
//                   <h3 className="td_team_member_title td_fs_18 td_semibold mb-0">
//                     {members.Membername}
//                   </h3>
//                   <p className="td_team_member_designation mb-0 td_fs_14 td_opacity_7 td_heading_color">
//                     {members.Teamposition}
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}

//         </Swiper>

//         <div className="td_height_60 td_height_lg_40" />

//         <div className="text-center wow zoomIn" data-wow-duration="1s" data-wow-delay="0.2s">
//           <Link to="/team-members" className="td_btn td_style_1 td_radius_30 td_medium">
//             <span className="td_btn_in td_white_color td_accent_bg">
//               <span>See All Instructors</span>
//               <svg
//                 width="19"
//                 height="20"
//                 viewBox="0 0 19 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M15.1575 4.34302L3.84375 15.6567" stroke="currentColor" />
//                 <path
//                   d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
//                   stroke="currentColor"
//                 />
//               </svg>
//             </span>
//           </Link>
//         </div>
//       </div>

//       <div className="td_height_60 td_height_lg_80" />
//     </section>
//   );
// };

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHobble } from "../../lib/hooks/useHobble";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import teamShape1 from "../../assets/img/home_2/team_shape_1.svg";
import teamShape2 from "../../assets/img/home_2/team_shape_2.svg";
import { useNavigate } from "react-router-dom";

export const TeamOne = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:8000/member/display";

  useHobble();

  const handleMember = (id) => {
    return () => {
      navigate(`/team-member-details/${id}`);
    };
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMembers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch team members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section
      style={{ backgroundColor: "#f8f9fa" }}
      className="td_shape_section_8 td_hobble"
    >
      <div className="td_shape_position_1 position-absolute td_hover_layer_3">
        <img src={teamShape1} alt="Team shape 1" />
      </div>
      <div className="td_shape_position_2 position-absolute td_hover_layer_3">
        <img src={teamShape2} alt="Team shape 2" />
      </div>

      <div className="td_height_60 td_height_lg_75" />

      <div className="container">
        <div
          className="td_section_heading td_style_1 text-center wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
        >
          <p className="td_section_subtitle_up td_fs_30 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
            <i></i>
            team members
            <i></i>
          </p>
          <h2 className="td_section_title td_fs_30 mb-0">
            Our Expert Instructor
          </h2>
          <p className="td_section_subtitle td_fs_18 mb-0">
            Far far away, behind the word mountains, far from the Consonantia,
            there <br />
            live the blind texts. Separated they marks grove right
          </p>
        </div>
        <div className="td_height_50 td_height_lg_50" />

        {/* Swiper Slider */}
        {loading ? (
          <div className="text-center">Loading team members...</div>
        ) : error ? (
          <div className="text-center text-danger">
            Error loading team members
          </div>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {members.map((member, idx) => (
              <SwiperSlide key={member._id || idx}>
                <div
                  className="td_team td_style_1 text-center position-relative cursor:pointer"
                  onClick={handleMember(member._id)}
                >
                  <img
                    src={
                      Array.isArray(member.images)
                        ? member.images[0]
                        : member.images
                    }
                    alt={member.altText}
                    className="h-50 td_radius_10"
                  />
                  <div className="td_team_info td_white_bg">
                    <h3 className="td_team_member_title td_fs_18 td_semibold mb-0">
                      {member.Membername}
                    </h3>
                    <p className="td_team_member_designation mb-0 td_fs_14 td_opacity_7 td_heading_color">
                      {member.Teamposition}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* <div className="td_height_60 td_height_lg_40" /> */}

        {/* <div className="text-center wow zoomIn" data-wow-duration="1s" data-wow-delay="0.2s">
          <Link  className="td_btn td_style_1 td_radius_30 td_medium">
            <span className="td_btn_in td_white_color td_accent_bg">
              <span>See All Instructors</span>
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15.1575 4.34302L3.84375 15.6567" stroke="currentColor" />
                <path
                  d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
                  stroke="currentColor"
                />
              </svg>
            </span>
          </Link>
        </div> */}
      </div>

      <div className="td_height_60 td_height_lg_60" />
    </section>
  );
};
