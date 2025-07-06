// // import React, { useState } from "react";
// // import CoursesnewSidebar from "./CoursesnewSidebar";

// // import { Layout } from "../../layouts/Layout";

// // import TargetJudiciaryCourse from "./TargetJudiciary";
// // import FoundationCourses from "./FoundationCourse";
// // import PrelimsTestSeries from "./PrelimsTestSeries";
// // import MainsTestSeries from "./MainsTestSeries";
// // import { CoursesAllGrid } from "../../components/courses/CoursesAllGrid";
// // import OtherCoursesSlider from "./OtherCourses";
// // import { useParams } from "react-router-dom";

// // const CoursesPage = () => {
// //   const [activeTab, setActiveTab] = useState("foundation");





// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case "target":
// //         return <TargetJudiciaryCourse />;
// //       case "prelims":
// //         return <PrelimsTestSeries />;
// //       case "mains":
// //         return <MainsTestSeries />;
// //       case "foundation":
// //       default:
// //         return <FoundationCourses />;
// //     }
// //   };

// //   return (
// //     <Layout header={9} footer={1}>


// //       <div className="container-fluid courses-page">
// //         <div className="row">
// //           <div className="col-md-12">
// //                 <CoursesAllGrid />
// //           </div>
// //           <div className="col-md-2 bg-light sidebar-wrapper">
// //             <CoursesnewSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
// //           </div>

// //           <div className="col-md-9 mx-auto py-4">


// //             {/* <h5 className="mb-5">Available Courses</h5> */}

// //               <div className="row">{renderContent()}</div>

// //           </div>

// //           <div className="col-md-12">
// //             <OtherCoursesSlider />
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default CoursesPage;



// import React, { useState } from "react";
// import CoursesnewSidebar from "./CoursesnewSidebar";
// import { Layout } from "../../layouts/Layout";
// import TargetJudiciaryCourse from "./TargetJudiciary";
// import FoundationCourses from "./FoundationCourse";
// import PrelimsTestSeries from "./PrelimsTestSeries";
// import MainsTestSeries from "./MainsTestSeries";
// import { CoursesAllGrid } from "../../components/courses/CoursesAllGrid";
// import OtherCoursesSlider from "./OtherCourses";

// const CoursesPage = () => {
//   const [activeTab, setActiveTab] = useState("foundation");
//   const [selectedCourseId, setSelectedCourseId] = useState(null);


//   console.log(selectedCourseId,'course id')

//   const renderContent = () => {
//     switch (activeTab) {
//       case "target":
//         return <TargetJudiciaryCourse />;
//       case "prelims":
//         return <PrelimsTestSeries />;
//       case "mains":
//         return <MainsTestSeries />;
//       case "foundation":
//       default:
//         return <FoundationCourses selectedCourseId={selectedCourseId} />;
//     }
//   };

//   return (
//     <Layout header={9} footer={1}>
//       <div className="container-fluid courses-page">
//         <div className="row">
//           <div className="col-md-12">
//             <CoursesAllGrid />
//           </div>
//           <div className="col-md-2 bg-light sidebar-wrapper">
//             <CoursesnewSidebar
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//               setSelectedCourseId={setSelectedCourseId}
//             />
//           </div>
//           <div className="col-md-9 mx-auto py-4">
//             <div className="row">{renderContent()}</div>
//           </div>
//           <div className="col-md-12">
//             <OtherCoursesSlider />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CoursesPage;


import React, { useState } from "react";
import CoursesnewSidebar from "./CoursesnewSidebar";
import { Layout } from "../../layouts/Layout";
import TargetJudiciaryCourse from "./TargetJudiciary";
import FoundationCourses from "./FoundationCourse";
import PrelimsTestSeries from "./PrelimsTestSeries";
import MainsTestSeries from "./MainsTestSeries";
import { CoursesAllGrid } from "../../components/courses/CoursesAllGrid";
import OtherCoursesSlider from "./OtherCourses";

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("foundation");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "target":
        return <TargetJudiciaryCourse />;
      case "prelims":
        return <PrelimsTestSeries />;
      case "mains":
        return <MainsTestSeries />;
      case "foundation":
      default:
        return (
          <FoundationCourses
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
          />
        );
    }
  };

  return (
    <Layout header={9} footer={1}>
      <div className="container-fluid courses-page">

        <div className="row">

          <div className="col-md-12">
            <CoursesAllGrid />
          </div>
                    <h3 className="text-center  fw-bold mb-2 d-none d-sm-block">
  <span style={{ borderBottom: "3px solid red", paddingBottom: "5px" }}>
    Explore Our Courses
  </span>
</h3>
          <div className="col-md-2 bg-light sidebar-wrapper">
            <CoursesnewSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSelectedCategoryId={setSelectedCategoryId}
              setSelectedSubCategoryId={setSelectedSubCategoryId}
            />
          </div>
          <div className="col-md-9 mx-auto py-4">
            <div className="row">{renderContent()}</div>
          </div>
          <div className="col-md-12">
            <OtherCoursesSlider />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
