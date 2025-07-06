import React from "react";
import { Link } from "react-router-dom";

import footerLogo from "../../assets/img/alec-for-judiciary.png";
import playstore from "../../assets/alec-img/apple (1).png"; // Add appropriate Play Store image
import appstore from "../../assets/alec-img/plays.png";   // Add appropriate App Store image

export const FooterOne = () => {
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
                  About Aashayein Judiciary: In today's increasingly complex legal landscape,
                  the demand for more judges and law officers has never been greater.....
                </p>
              </div>
              <ul className="td_footer_address_widget td_medium td_mp_0">
                <li>
                  <i className="fa-solid fa-phone-volume"></i>
                  <a href="tel:+919691073595"> +91 9691073595</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  3rd Floor, Radhika Heights, 284, in front of APT House, Zone-II,<br />
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/courses-grid-view">Courses</Link></li>
                <li><Link to="/blog">Blogs</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/refund">Refund</Link></li>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
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
                <li><Link to="/course-details">MP Judiciary Examination</Link></li>
                <li><Link to="/course-details">UP Judiciary Examination</Link></li>
                <li><Link to="/course-details">Jharkhand Judiciary Examination</Link></li>
                <li><Link to="/course-details">Bihar Judiciary Examination</Link></li>
                <li><Link to="/course-details">Uttarakhand Judiciary Examination</Link></li>
                <li><Link to="/course-details">Rajasthan Judicial Service Examination</Link></li>
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
                  Far far away, behind the word mountains, far from the Consonantia.
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
              <div id="social" className="td_footer_social_btns td_fs_20">
                <a href="https://www.facebook.com/ALEC.AashayeinLawEducationCenter" className="td_center" style={{ color: "#1877F2" }}>
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/aashayein_judiciary" className="td_center" style={{ color: "#E4405F" }}>
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="td_center" style={{ color: "#25D366" }}>
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="https://www.youtube.com/@aashayeinJ" className="td_center" style={{ color: "#FF0000" }}>
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://www.linkedin.com/company/alec-bhopal" className="td_center" style={{ color: "#003A9B" }}>
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://t.me/ALEC_for_Judiciary" className="td_center" style={{ color: "#0088CC" }}>
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </div>

  {/* App Download Section */}
  <div className="td_footer_app_links td_mt_40 td_center mt-4">

          <div className="td_app_buttons" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://play.google.com/store/apps/details?id=your.android.app" target="_blank" rel="noopener noreferrer">
              <img src={playstore} alt="Download on Play Store" style={{ height: "40px" }} />
            </a>
            <a href="https://apps.apple.com/in/app/your-ios-app" target="_blank" rel="noopener noreferrer">
              <img src={appstore} alt="Download on App Store" style={{ height: "40px" }} />
            </a>
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
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy & Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
