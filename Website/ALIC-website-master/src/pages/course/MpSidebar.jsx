// import React, { useEffect, useState } from "react";
// import { Nav, Offcanvas, Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// const SidebarContent = ({ activeTab, setActiveTab }) => {
//   const {id} = useParams()

//   useEffect(()=>{
//     if(id){
//       // alert(id)
//     }
//   },[id])
//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <Nav className="flex-column gap-2 mb-4">
//         <Nav.Link
//           onClick={() => setActiveTab('foundation')}
//           className={`fw-medium ${activeTab === 'foundation' ? 'text-danger' : ''}`}
//         >
//            Live Courses
//         </Nav.Link>
//         <Nav.Link
//           onClick={() => setActiveTab('target')}
//           className={`fw-medium ${activeTab === 'target' ? 'text-danger' : ''}`}
//         >
//           Recorded Courses
//         </Nav.Link>
//       </Nav>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Test Series</h5>
//       <Nav className="flex-column gap-2">
//         <Nav.Link
//           onClick={() => setActiveTab('prelims')}
//           className={`fw-medium ${activeTab === 'prelims' ? 'text-danger' : ''}`}
//         >
//           Prelims Test Series
//         </Nav.Link>
//         <Nav.Link
//           onClick={() => setActiveTab('mains')}
//           className={`fw-medium ${activeTab === 'mains' ? 'text-danger' : ''}`}
//         >
//           Mains Test Series
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// const MpSidebar = ({ activeTab, setActiveTab }) => {
//   const [show, setShow] = useState(false);
//   const toggleSidebar = () => setShow(!show);

//   return (
//     <>
//       {/* Toggle button - visible only on mobile */}
//       <div className="d-md-none text-end p-2">
//         <Button variant="dark" onClick={toggleSidebar}>
//           ☰ Courses & Test Series
//         </Button>
//       </div>

//       {/* Offcanvas - Mobile */}
//       <Offcanvas
//         show={show}
//         onHide={toggleSidebar}
//         placement="start"
//         className="custom-offcanvas"
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Courses & Test Series</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Static Sidebar - Desktop Only */}
//       <div className="d-none d-md-block bg-light sidebar-desktop">
//         <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
//       </div>
//     </>
//   );
// };

// export default MpSidebar;


import React, { useEffect, useState } from "react";
import { Nav, Offcanvas, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SidebarContent = ({ activeTab, setActiveTab, closeSidebar }) => {
  const {id} = useParams()

  useEffect(()=>{
    if(id){
      // alert(id)
    }
  },[id])

  const handleLinkClick = (tab) => {
    setActiveTab(tab);
    closeSidebar(); // Close the sidebar when a link is clicked
  };

  return (
    <div className="p-3">
      <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
      <Nav className="flex-column gap-2 mb-4">
        <Nav.Link
          onClick={() => handleLinkClick('foundation')}
          className={`fw-medium ${activeTab === 'foundation' ? 'text-danger' : ''}`}
        >
           Live Courses
        </Nav.Link>
        <Nav.Link
          onClick={() => handleLinkClick('target')}
          className={`fw-medium ${activeTab === 'target' ? 'text-danger' : ''}`}
        >
          Recorded Courses
        </Nav.Link>
      </Nav>

      <h5 className="fw-bold mb-3 border-bottom pb-2">Test Series</h5>
      <Nav className="flex-column gap-2">
        <Nav.Link
          onClick={() => handleLinkClick('prelims')}
          className={`fw-medium ${activeTab === 'prelims' ? 'text-danger' : ''}`}
        >
          Prelims Test Series
        </Nav.Link>
        <Nav.Link
          onClick={() => handleLinkClick('mains')}
          className={`fw-medium ${activeTab === 'mains' ? 'text-danger' : ''}`}
        >
          Mains Test Series
        </Nav.Link>
      </Nav>
    </div>
  );
};

const MpSidebar = ({ activeTab, setActiveTab }) => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => setShow(!show);

  return (
    <>
      {/* Toggle button - visible only on mobile */}
      <div className="d-md-none text-end p-2">
        <Button className="td_btn_in td_white_color td_accent_bg border-0 mb-0 py-2 fw-semibold" onClick={toggleSidebar}>
          ☰ Filter
        </Button>
      </div>

      {/* Offcanvas - Mobile */}
      <Offcanvas
        show={show}
        onHide={toggleSidebar}
        placement="start"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton>

          <Offcanvas.Title>Courses & Test Series</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeSidebar={toggleSidebar} // Pass the toggle function to close sidebar
          />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Static Sidebar - Desktop Only */}
      <div className="d-none d-md-block bg-light sidebar-desktop">
        <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default MpSidebar;






































// import React, { useEffect, useState } from "react";
// import { Nav, Offcanvas, Button, Spinner } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import axios from "axios";
// import { toast } from "react-toastify";

// const SidebarContent = ({ 
//   activeTab, 
//   setActiveTab, 
//   closeSidebar,
//   setSelectedCategoryId,
//   setSelectedSubCategoryId,
//   showMobileSidebar,
//   setShowMobileSidebar
// }) => {
//   const {id} = useParams();
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const fetchCoursesData = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/alldisplay");
//       if (data) {
//         setCourses(data);
//         filterCourses(data, selectedCourse, courseId || activeTab);
//       }
//       console.log(courses,"dataaaa")
//       console.log(data,"treu  dataaaa")

//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       toast.error("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCourses = (coursesList, categoryId, subCategoryId) => {
//     let filtered = coursesList;

//     if (courseId) {
//       filtered = filtered.filter(
//         (course) => course?.subsubCategory?._id === courseId
//       );
//     } else if (subCategoryId) {
//       filtered = filtered.filter(
//         (course) => course.subCategory?._id === subCategoryId
//       );
//     } else if (categoryId) {
//       filtered = filtered.filter(
//         (course) => course.category?._id === categoryId
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   useEffect(() => {
//     const fetchAllSubcategories = async () => {
//       try {
//         const response = await fetchSubcategory();
//         if (response.data) {
//           setSubCategories(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//         toast.error("Failed to load subcategories. Please try again.");
//       }
//     };
//     fetchAllSubcategories();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchcategory();
//         if (response.data) {
//           setCategories(response.data);
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

//   useEffect(() => {
//     fetchCoursesData();
//   }, [courseId, selectedCourse, activeTab]);

//   const handleCourseClick = (courseId1) => {
//     const isSelected = selectedCourse === courseId1;
//     const newCourseId = isSelected ? null : courseId1;
//     setSelectedCourse(newCourseId);
//     if (setSelectedCategoryId) {
//       setSelectedCategoryId(newCourseId);
//     }
//     navigate(`/courses-layout/${courseId1}`);
//     if (setShowMobileSidebar) {
//       setShowMobileSidebar(false);
//     }
//   };

//   const handleSubCategoryClick = (subCatId) => {
//     const newSubCatId = activeTab === subCatId ? null : subCatId;
//     setActiveTab(newSubCatId);
//     if (setSelectedSubCategoryId) {
//       setSelectedSubCategoryId(newSubCatId);
//     }
//     if (setShowMobileSidebar) {
//       setShowMobileSidebar(false);
//     }
//   };

//   const filteredSubCategories = selectedCourse
//     ? subCategories.filter((subCat) => subCat.category === selectedCourse)
//     : subCategories;

//   useEffect(() => {
//     if (courseId) {
//       setSelectedCourse(courseId);
//       if (setSelectedCategoryId) {
//         setSelectedCategoryId(courseId);
//       }
//     }
//   }, [courseId, setSelectedCategoryId]);

//   const handleLinkClick = (tab) => {
//     setActiveTab(tab);
//     if (closeSidebar) {
//       closeSidebar();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="py-4 text-center" style={{ backgroundColor: "#f5f7fa" }}>
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <Nav className="flex-column gap-2 mb-4">
//         {categories.map((category) => (
//           <div className="form-check" key={category._id}>
//             <input
//               className="form-check-input"
//               type="checkbox"
//               checked={selectedCourse === category._id}
//               onChange={() => handleCourseClick(category._id)}
//               id={`course-${category._id}`}
//             />
//             <label
//               className={`form-check-label fw-medium ${
//                 selectedCourse === category._id ? "text-primary fw-bold" : ""
//               }`}
//               htmlFor={`course-${category._id}`}
//             >
//               {category.name}
//             </label>
//           </div>
//         ))}
//       </Nav>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Judiciary</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {filteredSubCategories.map((subCategory) => (
//             <div className="form-check" key={subCategory._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={activeTab === subCategory._id}
//                 onChange={() => handleSubCategoryClick(subCategory._id)}
//                 id={`subcat-${subCategory._id}`}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   activeTab === subCategory._id ? "text-primary fw-bold" : ""
//                 }`}
//                 htmlFor={`subcat-${subCategory._id}`}
//               >
//                 {subCategory.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Test Series</h5>
//       <Nav className="flex-column gap-2">
//         <Nav.Link
//           onClick={() => handleLinkClick('prelims')}
//           className={`fw-medium ${activeTab === 'prelims' ? 'text-danger' : ''}`}
//         >
//           Prelims Test Series
//         </Nav.Link>
//         <Nav.Link
//           onClick={() => handleLinkClick('mains')}
//           className={`fw-medium ${activeTab === 'mains' ? 'text-danger' : ''}`}
//         >
//           Mains Test Series
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// const MpSidebar = ({ activeTab, setActiveTab, setSelectedCategoryId, setSelectedSubCategoryId }) => {
//   const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
//   const toggleMobileSidebar = () => setShowMobileSidebar(!showMobileSidebar);

//   return (
//     <>
//       {/* Toggle button - visible only on mobile */}
//       <div className="d-md-none text-end p-2">
//         <Button 
//           className="td_btn_in td_white_color td_accent_bg border-0 mb-0 py-2 fw-semibold" 
//           onClick={toggleMobileSidebar}
//         >
//           ☰ Filter
//         </Button>
//       </div>

//       {/* Mobile Sidebar (Offcanvas) */}
//       <Offcanvas
//         show={showMobileSidebar}
//         onHide={() => setShowMobileSidebar(false)}
//         placement="top"
//         style={{ height: '80%' }}
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Filter Options</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body style={{ overflowY: 'auto' }}>
//           <SidebarContent 
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             closeSidebar={() => setShowMobileSidebar(false)}
//             setSelectedCategoryId={setSelectedCategoryId}
//             setSelectedSubCategoryId={setSelectedSubCategoryId}
//             showMobileSidebar={showMobileSidebar}
//             setShowMobileSidebar={setShowMobileSidebar}
//           />
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Desktop Sidebar - Only visible on medium screens and up */}
//       <div className="d-none d-md-block">
//         <SidebarContent 
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           closeSidebar={() => {}}
//           setSelectedCategoryId={setSelectedCategoryId}
//           setSelectedSubCategoryId={setSelectedSubCategoryId}
//           showMobileSidebar={showMobileSidebar}
//           setShowMobileSidebar={setShowMobileSidebar}
//         />
//       </div>
//     </>
//   );
// };

// export default MpSidebar;