
// import React from "react";
// import { Link } from "react-router-dom";
// import { CoursesSidebar } from "./CoursesSidebar";

// export const CoursesAllContainerSidebar = ({ isGrid, children, onCategorySelect }) => {
//   return (
//     <section id="margin-top">
//       <div className="td_height_60 td_height_lg_0" />
//       <div className="container">
//         <div className="row">
//           {/* Sidebar Column */}
//           <div className="col-lg-4">
//             <CoursesSidebar onCategorySelect={onCategorySelect} />
//           </div>

//           {/* Main Content Column */}
//           <div className="col-lg-8">
//             {children}
//             <div className="td_height_60 td_height_lg_40" />

//             {/* Optional "More Courses" button - commented out as in your original */}
//             {/* <div className="text-center">
//               <Link
//                 to="/courses-grid-view"
//                 className="td_btn td_style_1 td_radius_10 td_medium"
//               >
//                 <span className="td_btn_in td_white_color td_accent_bg">
//                   <span>More Courses</span>
//                   <svg
//                     width="19"
//                     height="20"
//                     viewBox="0 0 19 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M15.1575 4.34302L3.84375 15.6567"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </Link>
//             </div> */}
//           </div>
//         </div>
//       </div>
//       <div className="td_height_120 td_height_lg_80" />
//     </section>
//   );
// };



import React from "react";
import { Link } from "react-router-dom";
import { CoursesSidebar } from "./CoursesSidebar";

export const CoursesAllContainerSidebar = ({ isGrid, children, onCategorySelect }) => {
  // Handler to pass the selected category to parent component
  const handleCategorySelect = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category); // Pass the entire category object
    }
  };

  return (
    <section id="margin-top">
      <div className="td_height_10 td_height_lg_10" />
      <div className="container">
        <h3 className="text-center  fw-bold mb-4 d-none d-sm-block">
  <span style={{ borderBottom: "3px solid red", paddingBottom: "5px" }}>
    Explore Our Judgements
  </span>
</h3>
        <div className="row">
          {/* Sidebar Column */}
          <div className="col-lg-4">
            <CoursesSidebar onCategorySelect={handleCategorySelect} />
          </div>

          {/* Main Content Column */}
          <div className="col-lg-8">
            {children}
            {/* <div className="td_height_60 td_height_lg_40" /> */}
          </div>
        </div>
      </div>
      {/* <div className="td_height_120 td_height_lg_80" /> */}
    </section>
  );
};