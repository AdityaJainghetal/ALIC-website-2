// import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { HomeOne } from "./pages/home/HomeOne";

// import { useWow } from "./lib/hooks/useWow";

// import { CoursesGridView } from "./pages/course/CoursesGridView";
// import { CoursesListView } from "./pages/course/CoursesListView";
// // import { CoursesGridSidebar } from "./pages/course/CoursesGridSidebar";
// import { CoursesDetails } from "./pages/course/CoursesDetails";
// import { About } from "./lib/about/About";
// import { AboutInstitute } from "./lib/about/AboutInstitute";
// import { AboutWhy } from "./lib/about/AboutWhy";

// import { Error } from "./pages/error/Error";
// import { Event } from "./pages/event/Event";
// import { EventDetails } from "./pages/event/EventDetails";
// import { TeamMembers } from "./pages/team/TeamMembers";
// import { TeamMemberDetails } from "./pages/team/TeamMemberDetails";

// import { Faq } from "./pages/faq/Faq";
// import { Blog } from "./pages/blogs/Blog";
// import { BlogWithSidebar } from "./pages/blogs/BlogWithSidebar";
// import { BlogDetails } from "./pages/blogs/BlogDetails";
// import { Contact } from "./pages/contact/Contact";
// import { Enquiry } from "./pages/enquiry/Enquiry";
// import { Enroll } from "./pages/enroll/Enroll";
// import { SyllabusDownload } from "./pages/syllabus/Syllabus";
// import { JudicialServices } from "./pages/syllabus/JudicialServices";
// // import { JudicialServices} from "./pages/syllabus/JudicialServices";

// // Import Icons
// import { FaWhatsapp, FaPhone } from "react-icons/fa";
// import { DirectorMessage } from "./lib/about/DirectorMessage";
// import SuccessStories from "./components/success/SuccessStories";
// import BiharPerlims from "./pages/syllabus/BiharPerlims";
// import HimanchalHaryana from "./pages/syllabus/HimanchalHaryana";
// import JharkhandPrelims from "./pages/syllabus/JharkhandPerlims";

// import PrivacyPolicy from "./pages/privacy/Privacy";
// import { Judgement } from "./pages/course/Judgement";
// import { JudgementDetails } from "./pages/course/JudgementDetails";
// import OnlineClassesPage from "./pages/online/OnlineClassesPage";

// // import { CouresesNine } from "./components/courses/CouresesNine";
// import { Pretestseries } from "./testseries/Pretestseries";
// import { Maintestseries } from "./testseries/Maintestseries";
// import CoursesSummry from "./components/courses/CoursesSummry";
// import CouresesFull from "./components/courses/CouresesFull";
// import { Foundation } from "./pages/course/Foundation";
// import DetailSection from "./components/fun_facts/WhatsNewDetail";
// import CoursesOne from "./components/courses/CoursesOne";
// import CoursesPage from "./pages/course/CoursesOne";
// import FoundationCourses from "./pages/course/FoundationCourse";
// import CourseLayout from "./pages/course/MainLayout";
// import TestSeriesdeatil from "./pages/TestSeries/TestSeriesdeatil";
// import MainSeriesdeatils from "./pages/TestSeries/MainSeriesdeatils";
// import OtherCourse from "./components/courses/OtherCourse";
// import axios from "axios";
// // import { AboutWhy } from "./lib/about/AboutWhy";

// function App() {
//   useWow();

//   // Scroll to top on route change
//   const { pathname } = useLocation();
//   useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);

//   const [rouutesData, setRouutesData] = useState([]);

//   useEffect(() => {
//     const init = async () => {
//       const res = await axios.get("https://alic-website-2-1.onrender.com/dynamics");
//       // console.log(res, ":KLJHKH");
//       setRouutesData(res.data);
//     };

//     init();
//   }, []);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomeOne />} />

//         <Route path="/courses-grid-view" element={<CoursesGridView />} />
//         <Route path="/courses-list-view" element={<CoursesListView />} />
//         <Route path="/judgements" element={<Judgement />} />
//         <Route path="/judgements/:id" element={<Judgement />} />

//         {/* <Route path="/judgements/:id" element={< Judgement/>} /> */}
//         {/* <Route path="/courses/:id" element={<CoursesOne/>}/> */}

//         <Route path="/judgements-details/:id" element={<JudgementDetails />} />
//         <Route path="/course-details/:id" element={<CoursesDetails />} />
//         <Route path="/foundation" element={<Foundation />} />
//         <Route path="/coursesone" element={<CoursesPage />} />
//         <Route path="/coursesone/:courseId" element={<CoursesPage />} />
//         <Route path="/foundation-courses" element={<FoundationCourses />} />

//         {/* <Route path="/foundation-courses/:id" element={<FoundationCoursess/>} /> */}

//         <Route path="/courses-layout/:id" element={<CourseLayout />} />

//         {/* -----------------About Section - Routing------------------------ */}
//         <Route path="/about" element={<About />} />
//         <Route path="/about-institue" element={<AboutInstitute />} />
//         <Route path="/about-why" element={<AboutWhy />} />
//         {/* <Route path="/about-why" element={<DirectorMessage />} /> */}
//         <Route path="/about-Director" element={<DirectorMessage />} />
//         <Route path="/success-stories" element={<SuccessStories />} />
//         <Route path="/online-classes" element={<OnlineClassesPage />} />
//         <Route path="/whats-new-detail/:id" element={<DetailSection />} />

//         {/* -----------------Syllabus - Page - Routing------------------------ */}
//         <Route path="/syllabus/:id" element={<SyllabusDownload />} />
//         <Route path="/judicial-services" element={<JudicialServices />} />
//         <Route path="/judicial-bihar" element={<BiharPerlims />} />
//         <Route path="/himanchal-haryana" element={<HimanchalHaryana />} />
//         <Route path="/jharkhand-perlims" element={<JharkhandPrelims />} />
//         <Route path="/event" element={<Event />} />
//         <Route path="/event-details/:id" element={<EventDetails />} />
//         <Route path="/team-members" element={<TeamMembers />} />
//         <Route
//           path="/team-member-details/:id"
//           element={<TeamMemberDetails />}
//         />
//         <Route path="/faqs" element={<Faq />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/blog-with-sidebar" element={<BlogWithSidebar />} />
//         <Route path="/blog-details/:id" element={<BlogDetails />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/enquiry" element={<Enquiry />} />
//         <Route path="/enroll/:id" element={<Enroll />} />
//         <Route path="/privacy" element={<PrivacyPolicy />} />
//         {/* <Route path="/course-details/:id" element={<CouresesNine />} /> */}
//         <Route path="/pretestseries/:id" element={<Pretestseries />} />
//         {/* <Route path="/" element={<CoursesPage />} /> */}
//         <Route path="/details" element={<CoursesSummry />} />
//         <Route path="/courses/:id" element={<CouresesFull />} />
//         <Route path="/testseries/:id" element={<TestSeriesdeatil />} />
//         <Route path="/mainseries/:id" element={<MainSeriesdeatils />} />
//         <Route path="/otherseries/:id" element={<OtherCourse />} />

//         <Route path="*" element={<Error />} />
//       </Routes>

//       {/* Fixed WhatsApp and Inquiry Icons */}
//       <div className="fixed-icons">
//         <a
//           href="https://wa.me/918888888888"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="whatsapp-icon"
//         >
//           <FaWhatsapp size={30} />
//         </a>

//         {/* Inquiry Button */}
//         <a href="/contact" className="inquiry-icon">
//           <FaPhone size={30} />
//         </a>
//       </div>

//       {/* CSS Styles */}
//       <style>
//         {`
//           .fixed-icons {
//             position: fixed;
//             bottom: 50px !important;
//             width: 100%;
//             display: flex;
//             justify-content: space-between;
//             pointer-events: none;
//           }

//           .whatsapp-icon,
//           .inquiry-icon {
//             pointer-events: auto;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             color: white;
//             background: #25D366;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             text-decoration: none;
//             transition: transform 0.3s ease;
//           }

//           .whatsapp-icon {
//   position: fixed;
//   left: 20px;
//   bottom: 20px;
//   z-index: 999999999999999999999999999999999; /* High z-index to stay on top */
// }

// .inquiry-icon {
//   position: fixed;
//   right: 20px;
//   bottom: 20px;
//   background: #ff5722;
//   z-index: 999999999999999999999; /* High z-index to stay on top */
// }

//           .whatsapp-icon:hover,
//           .inquiry-icon:hover {
//             transform: scale(1.1);
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import axios from "axios";
// import { useWow } from "./lib/hooks/useWow";
// import { FaWhatsapp, FaPhone } from "react-icons/fa";

// // Import all components that may be used in backend
// import { HomeOne } from "./pages/home/HomeOne";
// import { CoursesGridView } from "./pages/course/CoursesGridView";
// import { CoursesListView } from "./pages/course/CoursesListView";
// import { CoursesDetails } from "./pages/course/CoursesDetails";
// import { About } from "./lib/about/About";
// import { AboutInstitute } from "./lib/about/AboutInstitute";
// import { AboutWhy } from "./lib/about/AboutWhy";
// import { Error } from "./pages/error/Error";
// import { Event } from "./pages/event/Event";
// import { EventDetails } from "./pages/event/EventDetails";
// import { TeamMembers } from "./pages/team/TeamMembers";
// import { TeamMemberDetails } from "./pages/team/TeamMemberDetails";
// import { Faq } from "./pages/faq/Faq";
// import { Blog } from "./pages/blogs/Blog";
// import { BlogWithSidebar } from "./pages/blogs/BlogWithSidebar";
// import { BlogDetails } from "./pages/blogs/BlogDetails";
// import { Contact } from "./pages/contact/Contact";
// import { Enquiry } from "./pages/enquiry/Enquiry";
// import { Enroll } from "./pages/enroll/Enroll";
// import { SyllabusDownload } from "./pages/syllabus/Syllabus";
// import { JudicialServices } from "./pages/syllabus/JudicialServices";
// import { DirectorMessage } from "./lib/about/DirectorMessage";
// import SuccessStories from "./components/success/SuccessStories";
// import BiharPerlims from "./pages/syllabus/BiharPerlims";
// import HimanchalHaryana from "./pages/syllabus/HimanchalHaryana";
// import JharkhandPrelims from "./pages/syllabus/JharkhandPerlims";
// import PrivacyPolicy from "./pages/privacy/Privacy";
// import { Judgement } from "./pages/course/Judgement";
// import { JudgementDetails } from "./pages/course/JudgementDetails";
// import OnlineClassesPage from "./pages/online/OnlineClassesPage";
// import { Pretestseries } from "./testseries/Pretestseries";
// import CoursesSummry from "./components/courses/CoursesSummry";
// import CouresesFull from "./components/courses/CouresesFull";
// import { Foundation } from "./pages/course/Foundation";
// import DetailSection from "./components/fun_facts/WhatsNewDetail";
// import CoursesPage from "./pages/course/CoursesOne";
// import FoundationCourses from "./pages/course/FoundationCourse";
// import CourseLayout from "./pages/course/MainLayout";
// import TestSeriesdeatil from "./pages/TestSeries/TestSeriesdeatil";
// import MainSeriesdeatils from "./pages/TestSeries/MainSeriesdeatils";
// import OtherCourse from "./components/courses/OtherCourse";
// import CoursesOne from "./components/courses/CoursesOne";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HomeOne } from "./pages/home/HomeOne";

import { useWow } from "./lib/hooks/useWow";

import { CoursesGridView } from "./pages/course/CoursesGridView";
import { CoursesListView } from "./pages/course/CoursesListView";
// import { CoursesGridSidebar } from "./pages/course/CoursesGridSidebar";
import { CoursesDetails } from "./pages/course/CoursesDetails";
import { About } from "./lib/about/About";
import { AboutInstitute } from "./lib/about/AboutInstitute";
import { AboutWhy } from "./lib/about/AboutWhy";

import { Error } from "./pages/error/Error";
import { Event } from "./pages/event/Event";
import { EventDetails } from "./pages/event/EventDetails";
import { TeamMembers } from "./pages/team/TeamMembers";
import { TeamMemberDetails } from "./pages/team/TeamMemberDetails";

import { Faq } from "./pages/faq/Faq";
import { Blog } from "./pages/blogs/Blog";
import { BlogWithSidebar } from "./pages/blogs/BlogWithSidebar";
import { BlogDetails } from "./pages/blogs/BlogDetails";
import { Contact } from "./pages/contact/Contact";
import { Enquiry } from "./pages/enquiry/Enquiry";
import { Enroll } from "./pages/enroll/Enroll";
import { SyllabusDownload } from "./pages/syllabus/Syllabus";
import { JudicialServices } from "./pages/syllabus/JudicialServices";
// import { JudicialServices} from "./pages/syllabus/JudicialServices";

// Import Icons
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { DirectorMessage } from "./lib/about/DirectorMessage";
import SuccessStories from "./components/success/SuccessStories";
import BiharPerlims from "./pages/syllabus/BiharPerlims";
import HimanchalHaryana from "./pages/syllabus/HimanchalHaryana";
import JharkhandPrelims from "./pages/syllabus/JharkhandPerlims";

import PrivacyPolicy from "./pages/privacy/Privacy";
import { Judgement } from "./pages/course/Judgement";
import { JudgementDetails } from "./pages/course/JudgementDetails";
import OnlineClassesPage from "./pages/online/OnlineClassesPage";

// import { CouresesNine } from "./components/courses/CouresesNine";
import { Pretestseries } from "./testseries/Pretestseries";
import { Maintestseries } from "./testseries/Maintestseries";
import CoursesSummry from "./components/courses/CoursesSummry";
import CouresesFull from "./components/courses/CouresesFull";
import { Foundation } from "./pages/course/Foundation";
import DetailSection from "./components/fun_facts/WhatsNewDetail";
import CoursesOne from "./components/courses/CoursesOne";
import CoursesPage from "./pages/course/CoursesOne";

import FoundationCourses from "./pages/course/FoundationCourse";
import CourseLayout from "./pages/course/MainLayout";
import TestSeriesdeatil from "./pages/TestSeries/TestSeriesdeatil";
import MainSeriesdeatils from "./pages/TestSeries/MainSeriesdeatils";
import OtherCourse from "./components/courses/OtherCourse";
import axios from "axios";
// import { AboutWhy } from "./lib/about/AboutWhy";

// ✅ Step 1: Map string names from backend to components
const componentMap = {
  HomeOne: <HomeOne />,
  CoursesGridView: <CoursesGridView />,
  CoursesListView: <CoursesListView />,
  CoursesDetails: <CoursesDetails />,
  About: <About />,
  AboutInstitute: <AboutInstitute />,
  AboutWhy: <AboutWhy />,
  Event: <Event />,
  TeamMembers: <TeamMembers />,
  TeamMemberDetails: <TeamMemberDetails />,
  Faq: <Faq />,
  Blog: <Blog />,
  BlogWithSidebar: <BlogWithSidebar />,
  BlogDetails: <BlogDetails />,
  Contact: <Contact />,
  Enquiry: <Enquiry />,
  Enroll: <Enroll />,
  CoursesOne: <CoursesOne />,
  SyllabusDownload: <SyllabusDownload />,
  JudicialServices: <JudicialServices />,
  DirectorMessage: <DirectorMessage />,
  SuccessStories: <SuccessStories />,
  BiharPerlims: <BiharPerlims />,
  HimanchalHaryana: <HimanchalHaryana />,
  JharkhandPrelims: <JharkhandPrelims />,
  PrivacyPolicy: <PrivacyPolicy />,
  Judgement: <Judgement />,
  JudgementDetails: <JudgementDetails />,
  OnlineClassesPage: <OnlineClassesPage />,
  Pretestseries: <Pretestseries />,
  CoursesSummry: <CoursesSummry />,
  CouresesFull: <CouresesFull />,
  Foundation: <Foundation />,
  CoursesOne: <CoursesPage />,
  DetailSection: <DetailSection />,
  CoursesPage: <CoursesPage />,
  FoundationCourses: <FoundationCourses />,
  CourseLayout: <CourseLayout />,
  TestSeriesdeatil: <TestSeriesdeatil />,
  MainSeriesdeatils: <MainSeriesdeatils />,
  OtherCourse: <OtherCourse />,
  EventDetails: <EventDetails />,
  Error: <Error />,
};

function App() {
  useWow();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const [rouutesData, setRouutesData] = useState([]);

  // ✅ Step 2: Fetch all route data from backend
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get(
          "https://alic-website-2-1.onrender.com/dynamics"
        );
        setRouutesData(res.data || []);
      } catch (err) {
        console.error("Failed to load dynamic routes:", err);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <>
      <Routes>
        {/* ✅ Step 3: Render all backend routes */}
        {rouutesData.map(
          (route, index) => (
            console.log(route, ":KJHKJHKJ"),
            (
              <Route
                key={index}
                path={route.path}
                element={componentMap[route.element] || <Error />}
              />
            )
          )
        )}

        {/* ✅ Optional fallback */}
        <Route path="*" element={<Error />} />
      </Routes>

      {/* ✅ WhatsApp + Phone Fixed Icons */}
      <div className="fixed-icons">
        <a
          href="https://wa.me/918888888888"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon"
        >
          <FaWhatsapp size={30} />
        </a>
        <a href="/contact" className="inquiry-icon">
          <FaPhone size={30} />
        </a>
      </div>

      {/* ✅ CSS */}
      <style>
        {`
          .fixed-icons {
            position: fixed;
            bottom: 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
          }

          .whatsapp-icon,
          .inquiry-icon {
            pointer-events: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: white;
            background: #25D366;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-decoration: none;
            transition: transform 0.3s ease;
          }

          .whatsapp-icon {
            position: fixed;
            left: 20px;
            bottom: 20px;
            z-index: 999999999;
          }

          .inquiry-icon {
            position: fixed;
            right: 20px;
            bottom: 20px;
            background: #ff5722;
            z-index: 999999999;
          }

          .whatsapp-icon:hover,
          .inquiry-icon:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </>
  );
}

export default App;
