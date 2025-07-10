// import React from "react";
// import { Link } from "react-router-dom";

// import footerLogo from "../../assets/img/alec-for-judiciary.png";
// import playstore from "../../assets/alec-img/apple (1).png"; // Add appropriate Play Store image
// import appstore from "../../assets/alec-img/plays.png";   // Add appropriate App Store image

// export const FooterOne = () => {
//   return (
//     <footer className="td_footer td_style_1">
//       <div className="container">
//         <div className="td_footer_row">
//           {/* About Widget */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <div className="td_footer_text_widget td_fs_18">
//                 <img src={footerLogo} alt="Logo" />
//                 <p>
//                   About Aashayein Judiciary: In today's increasingly complex legal landscape,
//                   the demand for more judges and law officers has never been greater.....
//                 </p>
//               </div>
//               <ul className="td_footer_address_widget td_medium td_mp_0">
//                 <li>
//                   <i className="fa-solid fa-phone-volume"></i>
//                   <a href="tel:+919691073595"> +91 9691073595</a>
//                 </li>
//                 <li>
//                   <i className="fa-solid fa-location-dot"></i>
//                   3rd Floor, Radhika Heights, 284, in front of APT House, Zone-II,<br />
//                   Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
//                 Useful Links
//               </h2>
//               <ul className="td_footer_widget_menu">
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/courses-grid-view">Courses</Link></li>
//                 <li><Link to="/blog">Blogs</Link></li>
//                 <li><Link to="/contact">Contact</Link></li>
//                 <li><Link to="/refund">Refund</Link></li>
//                 <li><Link to="/help">Help Center</Link></li>
//                 <li><Link to="/privacy">Privacy Policy</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Courses */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
//                 Courses
//               </h2>
//              z
//               </ul>
//             </div>
//           </div>

//           {/* Newsletter & Socials */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
//                 Subscribe Now
//               </h2>
//               <div className="td_newsletter td_style_1">
//                 <p className="td_mb_20 td_opacity_7">
//                   Far far away, behind the word mountains, far from the Consonantia.
//                 </p>
//                 <form action="#" className="td_newsletter_form">
//                   <input
//                     type="email"
//                     className="td_newsletter_input"
//                     placeholder="Email address"
//                   />
//                   <button
//                     type="submit"
//                     className="td_btn td_style_1 td_radius_30 td_medium"
//                   >
//                     <span className="td_btn_in td_white_color td_accent_bg">
//                       <span>Subscribe</span>
//                     </span>
//                   </button>
//                 </form>
//               </div>

//              <div id="social" className="td_footer_social_btns td_fs_20">
//   <a
//     href="https://www.facebook.com/ALEC.AashayeinLawEducationCenter"
//     className="td_center"
//     style={{ color: "#1877F2" }}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <i className="fa-brands fa-facebook-f"></i>
//   </a>
//   <a
//     href="https://www.instagram.com/aashayein_judiciary"
//     className="td_center"
//     style={{ color: "#E4405F" }}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <i className="fa-brands fa-instagram"></i>
//   </a>
//   <a
//     href="#"
//     className="td_center"
//     style={{ color: "#25D366" }}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <i className="fa-brands fa-whatsapp"></i>
//   </a>
//   <a
//     href="https://youtube.com/@aashayeinJ?sub_confirmation=1"
//     className="td_center"
//     style={{ color: "#FF0000" }}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <i className="fa-brands fa-youtube"></i>
//   </a>
//   <a
//     href="https://www.linkedin.com/company/alec-bhopal"
//     className="td_center"
//     style={{ color: "#003A9B" }}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <i className="fa-brands fa-linkedin"></i>
//   </a>
//   <a
//     href="https://t.me/ALEC_for_Judiciary"
//     className="td_center"
//     style={{ color: "#0088CC" }}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <i className="fa-brands fa-telegram"></i>
//   </a>
// </div>

//   {/* App Download Section */}
//   <div className="td_footer_app_links td_mt_40 td_center mt-4">

//           <div className="td_app_buttons" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
//             <a href=" https://play.google.com/store/apps/details?id=co.shield.ndagj&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
//               <img src={playstore} alt="Download on Play Store" style={{ height: "40px" }} />
//             </a>
//             <a href="https://play.google.com/store/apps/details?id=co.shield.ndagj&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
//               <img src={appstore} alt="Download on App Store" style={{ height: "40px" }} />
//             </a>
//           </div>
//         </div>

//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Footer Bottom */}
//       <div className="td_footer_bottom td_fs_18">
//         <div className="container">
//           <div className="td_footer_bottom_in">
//             <p className="td_copyright mb-0">
//               Copyright ©Aashyein judiciary | All Right Reserved
//             </p>
//             <ul className="td_footer_widget_menu">
//               <li><Link to="/terms">Terms & Conditions</Link></li>
//               <li><Link to="/privacy">Privacy & Policy</Link></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// import footerLogo from "../../assets/img/alec-for-judiciary.png";

// import { fetchcategory } from "../../api";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
//   FaPinterest,
//   FaTiktok,
//   FaWhatsapp,
//   FaTelegram,
//   FaGithub,
//   FaReddit,
//   FaDiscord,
//   FaTwitch,
//   FaSnapchat,
//   FaLink
// } from 'react-icons/fa';
// // import axios from "axios";

// export const FooterOne = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const [socialLinks, setSocialLinks] = useState([]);
//   const [playstorelink, setplaystorelink] = useState([]);

//   const navigate = useNavigate();

//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategory(categoryId);

//     if (categoryId) {
//      navigate(`/coursesone?category=${categoryId}`);
//     }
//   };

//   const api = "https://alic-website-2-1.onrender.com/social";

//     const fetchSocialLinks = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(api);
//         setSocialLinks(response.data.data);
//       } catch (error) {
//         console.error("Error fetching social links:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       fetchSocialLinks();
//     }, []);

//     const apis = "https://alic-website-2-1.onrender.com/playstore/alldisplay";
//      const fetchSocialplaystoreLinks = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(apis);
//         setplaystorelink(response.data.data);
//       } catch (error) {
//         console.error("Error fetching social links:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       fetchSocialplaystoreLinks();
//     }, []);

//       const getIconComponent = (iconName) => {
//         if (!iconName) return <FaLink style={{ color: '#000000' }} />;

//         const iconMap = {
//           facebook: <FaFacebook style={{ color: '#1877F2' }} />,
//           twitter: <FaTwitter style={{ color: '#1DA1F2' }} />,
//           instagram: <FaInstagram style={{ color: '#E1306C' }} />,
//           linkedin: <FaLinkedin style={{ color: '#0077B5' }} />,
//           youtube: <FaYoutube style={{ color: '#FF0000' }} />,
//           pinterest: <FaPinterest style={{ color: '#E60023' }} />,
//           tiktok: <FaTiktok style={{ color: '#000000' }} />,
//           whatsapp: <FaWhatsapp style={{ color: '#25D366' }} />,
//           telegram: <FaTelegram style={{ color: '#0088CC' }} />,
//           github: <FaGithub style={{ color: '#000000' }} />,
//           reddit: <FaReddit style={{ color: '#FF5700' }} />,
//           discord: <FaDiscord style={{ color: '#7289DA' }} />,
//           twitch: <FaTwitch style={{ color: '#9146FF' }} />,
//           snapchat: <FaSnapchat style={{ color: '#FFFC00' }} />
//         };

//         return iconMap[iconName.toLowerCase()] || <FaLink style={{ color: '#000000' }} />;
//       };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchcategory();
//         if (response.data) {
//           setCategories(response.data);
//         } else {
//           toast.error("No categories found.");
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to load categories. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <footer className="td_footer td_style_1">
//       <div className="container">
//         <div className="td_footer_row">
//           {/* About Widget */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <div className="td_footer_text_widget td_fs_18">
//                 <img src={footerLogo} alt="Logo" />
//                 <p>
//                   About Aashayein Judiciary: In today's increasingly complex legal landscape,
//                   the demand for more judges and law officers has never been greater.....
//                 </p>
//               </div>
//               <ul className="td_footer_address_widget td_medium td_mp_0">
//                 <li>
//                   <i className="fa-solid fa-phone-volume"></i>
//                   <a href="tel:+919691073595"> +91 9691073595</a>
//                 </li>
//                 <li>
//                   <i className="fa-solid fa-location-dot"></i>
//                   3rd Floor, Radhika Heights, 284, in front of APT House, Zone-II,<br />
//                   Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
//                 Useful Links
//               </h2>
//               <ul className="td_footer_widget_menu">
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/courses-grid-view">Courses</Link></li>
//                 <li><Link to="/blog">Blogs</Link></li>
//                 <li><Link to="/contact">Contact</Link></li>
//                 <li><Link to="/refund">Refund</Link></li>
//                 <li><Link to="/help">Help Center</Link></li>
//                 <li><Link to="/privacy">Privacy Policy</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Courses */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
//                 Courses
//               </h2>
//               <ul className="td_footer_widget_menu">
//                 {loading ? (
//                   <li>Loading categories...</li>
//                 ) : categories.length > 0 ? (
//                   categories.slice(0, 6).map((category) => (
//                     <li key={category._id}>
//                       <Link to={`/coursesone/${category?._id}`}>
//                         {category.name}
//                       </Link>
//                     </li>
//                   ))
//                 ) : (
//                   <li>No categories available</li>
//                 )}
//               </ul>
//             </div>
//           </div>

//           {/* Newsletter & Socials */}
//           <div className="td_footer_col">
//             <div className="td_footer_widget">
//               <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
//                 Subscribe Now
//               </h2>
//               <div className="td_newsletter td_style_1">
//                 <p className="td_mb_20 td_opacity_7">
//                   Far far away, behind the word mountains, far from the Consonantia.
//                 </p>
//                 <form action="#" className="td_newsletter_form">
//                   <input
//                     type="email"
//                     className="td_newsletter_input"
//                     placeholder="Email address"
//                   />
//                   <button
//                     type="submit"
//                     className="td_btn td_style_1 td_radius_30 td_medium"
//                   >
//                     <span className="td_btn_in td_white_color td_accent_bg">
//                       <span>Subscribe</span>
//                     </span>
//                   </button>
//                 </form>
//               </div>
// {/*
//               <div id="social" className="td_footer_social_btns td_fs_20">
//                 <a
//                   href="https://www.facebook.com/ALEC.AashayeinLawEducationCenter"
//                   className="td_center"
//                   style={{ color: "#1877F2" }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-facebook-f"></i>
//                 </a>
//                 <a
//                   href="https://www.instagram.com/aashayein_judiciary"
//                   className="td_center"
//                   style={{ color: "#E4405F" }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-instagram"></i>
//                 </a>
//                 <a
//                   href="#"
//                   className="td_center"
//                   style={{ color: "#25D366" }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-whatsapp"></i>
//                 </a>
//                 <a
//                   href="https://youtube.com/@aashayeinJ?sub_confirmation=1"
//                   className="td_center"
//                   style={{ color: "#FF0000" }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-youtube"></i>
//                 </a>
//                 <a
//                   href="https://www.linkedin.com/company/alec-bhopal"
//                   className="td_center"
//                   style={{ color: "#003A9B" }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-linkedin"></i>
//                 </a>
//                 <a
//                   href="https://t.me/ALEC_for_Judiciary"
//                   className="td_center"
//                   style={{ color: "#0088CC" }}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-telegram"></i>
//                 </a>
//               </div> */}
//   <div id="social" className="td_hero_icon_btns position-relative mt-3">
//                 <div className="td_footer_social_btns" style={{ display: 'flex', gap: '8px' }}>
//                   {socialLinks.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="td_center"
//                       style={{
//                         fontSize: "20px",
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: '32px',
//                         height: '32px',
//                         transition: 'transform 0.2s',
//                         borderRadius: '50%'
//                       }}
//                       title={link.altText}
//                     >
//                       {getIconComponent(link.icon)}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//               {/* App Download Section */}
//               <div className="td_footer_app_links td_mt_40 td_center mt-4">
//               <div className="td_app_buttons" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
//     {playstorelink.map((link, index) => (
//         <a key={index} href={link.URL} target="_blank" rel="noopener noreferrer">
//             <img src={link.images} alt="Download on Play Store" style={{ height: "40px" }} />
//         </a>
//     ))}
// </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="td_footer_bottom td_fs_18">
//         <div className="container">
//           <div className="td_footer_bottom_in">
//             <p className="td_copyright mb-0">
//               Copyright ©Aashyein judiciary | All Right Reserved
//             </p>
//             <ul className="td_footer_widget_menu">
//               <li><Link to="/terms">Terms & Conditions</Link></li>
//               <li><Link to="/privacy">Privacy & Policy</Link></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import footerLogo from "../../assets/img/alec-for-judiciary.png";
import { fetchcategory } from "../../api";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaGithub,
  FaReddit,
  FaDiscord,
  FaTwitch,
  FaSnapchat,
  FaLink,
} from "react-icons/fa";

export const FooterOne = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [playstoreLinks, setPlaystoreLinks] = useState([]);
  const navigate = useNavigate();

  // Fetch all data in a single useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesResponse = await fetchcategory();
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        // Fetch social links
        const socialResponse = await axios.get(
          "https://alic-website-2-1.onrender.com/social"
        );
        setSocialLinks(socialResponse.data.data);

        // Fetch playstore links
        const playstoreResponse = await axios.get(
          "https://alic-website-2-1.onrender.com/playstore/alldisplay"
        );
        setPlaystoreLinks(playstoreResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      navigate(`/coursesone?category=${categoryId}`);
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      facebook: <FaFacebook style={{ color: "#1877F2" }} />,
      twitter: <FaTwitter style={{ color: "#1DA1F2" }} />,
      instagram: <FaInstagram style={{ color: "#E1306C" }} />,
      linkedin: <FaLinkedin style={{ color: "#0077B5" }} />,
      youtube: <FaYoutube style={{ color: "#FF0000" }} />,
      pinterest: <FaPinterest style={{ color: "#E60023" }} />,
      tiktok: <FaTiktok style={{ color: "#000000" }} />,
      whatsapp: <FaWhatsapp style={{ color: "#25D366" }} />,
      telegram: <FaTelegram style={{ color: "#0088CC" }} />,
      github: <FaGithub style={{ color: "#000000" }} />,
      reddit: <FaReddit style={{ color: "#FF5700" }} />,
      discord: <FaDiscord style={{ color: "#7289DA" }} />,
      twitch: <FaTwitch style={{ color: "#9146FF" }} />,
      snapchat: <FaSnapchat style={{ color: "#FFFC00" }} />,
    };

    return (
      iconMap[iconName?.toLowerCase()] || (
        <FaLink style={{ color: "#000000" }} />
      )
    );
  };

  return (
    <footer className="td_footer td_style_1">
      <div className="container">
        <div className="td_footer_row">
          {/* About Widget */}
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <div className="td_footer_text_widget td_fs_18">
                <img src={footerLogo} alt="Logo" />
                <p>
                  About Aashayein Judiciary: In today's increasingly complex
                  legal landscape, the demand for more judges and law officers
                  has never been greater.....
                </p>
              </div>
              <ul className="td_footer_address_widget td_medium td_mp_0">
                <li>
                  <i className="fa-solid fa-phone-volume"></i>
                  <a href="tel:+919691073595"> +91 9691073595</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  3rd Floor, Radhika Heights, 284, in front of APT House,
                  Zone-II,
                  <br />
                  Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011
                </li>
              </ul>
            </div>
          </div>

          {/* Useful Links */}
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
                Useful Links
              </h2>
              <ul className="td_footer_widget_menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/courses-grid-view">Courses</Link>
                </li>
                <li>
                  <Link to="/blog">Blogs</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/refund">Refund</Link>
                </li>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Courses */}
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
                Courses
              </h2>
              <ul className="td_footer_widget_menu">
                {loading ? (
                  <li>Loading categories...</li>
                ) : categories.length > 0 ? (
                  categories.slice(0, 6).map((category) => (
                    <li key={category._id}>
                      <Link to={`/coursesone/${category?._id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No categories available</li>
                )}
              </ul>
            </div>
          </div>

          {/* Newsletter & Socials */}
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
                Subscribe Now
              </h2>
              <div className="td_newsletter td_style_1">
                <p className="td_mb_20 td_opacity_7">
                  Far far away, behind the word mountains, far from the
                  Consonantia.
                </p>
                <form action="#" className="td_newsletter_form">
                  <input
                    type="email"
                    className="td_newsletter_input"
                    placeholder="Email address"
                  />
                  <button
                    type="submit"
                    className="td_btn td_style_1 td_radius_30 td_medium"
                  >
                    <span className="td_btn_in td_white_color td_accent_bg">
                      <span>Subscribe</span>
                    </span>
                  </button>
                </form>
              </div>

              <div
                id="social"
                className="td_hero_icon_btns position-relative mt-3"
              >
                <div
                  className="td_footer_social_btns"
                  style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link._id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="td_center"
                      style={{
                        fontSize: "20px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        transition: "transform 0.2s",
                        borderRadius: "50%",
                      }}
                      title={link.altText}
                    >
                      {getIconComponent(link.icon)}
                    </a>
                  ))}
                </div>
              </div>

              {/* App Download Section */}
              <div className="td_footer_app_links td_mt_40 td_center mt-4">
                <div
                  className="td_app_buttons"
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {playstoreLinks?.map((link) => (
                    <a
                      href={link.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={link.images}
                        alt={link.altText || "Download on Play Store"}
                        style={{ height: "40px" }}
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="td_footer_bottom td_fs_18">
        <div className="container">
          <div className="td_footer_bottom_in">
            <p className="td_copyright mb-0">
              Copyright ©Aashyein judiciary | All Right Reserved
            </p>
            <ul className="td_footer_widget_menu">
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy & Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
