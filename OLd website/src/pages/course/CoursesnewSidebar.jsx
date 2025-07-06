// import React from "react";
// import { Nav } from "react-bootstrap";

// const SidebarContent = ({ activeTab, setActiveTab }) => (
//   <div className="p-3">
//     <h5 className="fw-bold mb-3 border-bottom pb-2">Filters</h5>
//     <div className="mb-4">
//       <label className="form-label fw-semibold">Course Type</label>
//       <div className="form-check">
//         <input className="form-check-input" type="checkbox" id="foundation" />
//         <label className="form-check-label" htmlFor="foundation">
//           Foundation Course
//         </label>
//       </div>
//       <div className="form-check">
//         <input className="form-check-input" type="checkbox" id="advance" />
//         <label className="form-check-label" htmlFor="advance">
//           Foundation Advance
//         </label>
//       </div>
//     </div>

//     <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//     <Nav className="flex-column gap-2">
//       <Nav.Link
//         onClick={() => setActiveTab("foundation")}
//         className={`fw-medium ${activeTab === "foundation" ? "text-primary fw-bold" : ""}`}
//       >
//         Live Courses
//       </Nav.Link>
//       <Nav.Link
//         onClick={() => setActiveTab("target")}
//         className={`fw-medium ${activeTab === "target" ? "text-primary fw-bold" : ""}`}
//       >
//         Recorded Courses
//       </Nav.Link>
//       <Nav.Link
//         onClick={() => setActiveTab("prelims")}
//         className={`fw-medium ${activeTab === "prelims" ? "text-primary fw-bold" : ""}`}
//       >
//       Test Series
//       </Nav.Link>
//       {/* <Nav.Link
//         onClick={() => setActiveTab("mains")}
//         className={`fw-medium ${activeTab === "mains" ? "text-primary fw-bold" : ""}`}
//       >
//         Mains Test Series
//       </Nav.Link> */}
//     </Nav>
//   </div>
// );

// export default SidebarContent;




// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";

// const SidebarContent = ({ activeTab, setActiveTab }) => {
//   const [subCategories, setSubCategories] = useState([]);

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

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Filters</h5>
//       <div className="mb-4">
//         <label className="form-label fw-semibold">Course Type</label>

//         <div className="form-check">
//             <Nav className="flex-column gap-2">
//               <input className="form-check-input" type="checkbox"  />
//         {subCategories.map((category) => (
//           <Nav.Link
//             key={category._id}
//             onClick={() => setActiveTab(category._id)}
//             className={`fw-medium ${activeTab === category._id ? "text-primary fw-bold" : ""}`}
//           >
//             {category.name}

//           </Nav.Link>
//         ))}
//       </Nav>
//       </div>



//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <Nav className="flex-column gap-2">
//         <Nav.Link
//           onClick={() => setActiveTab("foundation")}
//           className={`fw-medium ${activeTab === "foundation" ? "text-primary fw-bold" : ""}`}
//         >
//           Live Courses
//         </Nav.Link>
//         <Nav.Link
//           onClick={() => setActiveTab("target")}
//           className={`fw-medium ${activeTab === "target" ? "text-primary fw-bold" : ""}`}
//         >
//           Recorded Courses
//         </Nav.Link>
//         <Nav.Link
//           onClick={() => setActiveTab("prelims")}
//           className={`fw-medium ${activeTab === "prelims" ? "text-primary fw-bold" : ""}`}
//         >
//           Test Series
//         </Nav.Link>
//       </Nav>

//     </div>
//      </div>

//   );
// };

// export default SidebarContent;


// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchcategory,fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";

// const SidebarContent = ({ activeTab, setActiveTab }) => {
//   const [subCategories, setSubCategories] = useState([]);

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


//     useEffect(() => {
//       const fetchCategories = async () => {
//         setLoading(true);
//         try {
//           const response = await fetchcategory();
//           if (response.data) {
//             setCategories(response.data);
//           }
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//           toast.error("Failed to load categories. Please try again.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCategories();
//     }, []);

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Filters</h5>
//       <div className="mb-4">
//         <label className="form-label fw-semibold">Course Type</label>

//         <Nav className="flex-column gap-2">
//           {subCategories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={activeTab === category._id}
//                 onChange={() => setActiveTab(category._id)}
//               />
//               <label
//                 className={`form-check-label fw-medium ${activeTab === category._id ? "text-primary fw-bold" : ""}`}
//                 onClick={() => setActiveTab(category._id)}
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <Nav className="flex-column gap-2">
//         <div className="form-check">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             checked={activeTab === "foundation"}
//             onChange={() => setActiveTab("foundation")}

//         {categories.map((category) => (
//           <option key={category._id} value={category._id}>
//             {category.name}
//           </option>
//             />
//       </Nav>
//     </div>
//   );
// };

// export default SidebarContent;


// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";

// const SidebarContent = ({ activeTab, setActiveTab }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

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

//   // Filter subcategories based on selected category
//   const filteredSubCategories = selectedCategory
//     ? subCategories.filter((subCat) => subCat.category === selectedCategory)
//     : subCategories;

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {categories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedCategory === category._id}
//                 onChange={() =>
//                   setSelectedCategory(selectedCategory === category._id ? null : category._id)
//                 }
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   selectedCategory === category._id ? "text-primary fw-bold" : ""
//                 }`}
//                 onClick={() =>
//                   setSelectedCategory(selectedCategory === category._id ? null : category._id)
//                 }
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Judicary</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {filteredSubCategories.map((subCategory) => (
//             <div className="form-check" key={subCategory._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={activeTab === subCategory._id}
//                 onChange={() => setActiveTab(subCategory._id)}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   activeTab === subCategory._id ? "text-primary fw-bold" : ""
//                 }`}
//                 onClick={() => setActiveTab(subCategory._id)}
//               >
//                 {subCategory.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default SidebarContent;





// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";
// import { Navigate, useNavigate } from "react-router-dom";

// const SidebarContent = ({ activeTab, setActiveTab , setSelectedCourseId}) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);



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

//   // Filter subcategories based on selected category
//   const filteredSubCategories = selectedCategory
//     ? subCategories.filter((subCat) => subCat.category === selectedCategory)
//     : subCategories;

//   const handleCourseClick = (courseId) => {
//     setSelectedCourse(selectedCourse === courseId ? null : courseId);
//    setSelectedCourseId(selectedCourse)
//     // You can use the courseId here as needed
//     console.log("Selected Course ID:", );

//   };

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {categories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedCourse === category._id}
//                 onChange={() => handleCourseClick(category._id)}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   selectedCourse === category._id ? "text-primary fw-bold" : ""
//                 }`}
//                 onClick={() => handleCourseClick(category._id)}
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Judicary</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {filteredSubCategories.map((subCategory) => (
//             <div className="form-check" key={subCategory._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={activeTab === subCategory._id}
//                 onChange={() => setActiveTab(subCategory._id)}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   activeTab === subCategory._id ? "text-primary fw-bold" : ""
//                 }`}
//                 onClick={() => setActiveTab(subCategory._id)}
//               >
//                 {subCategory.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default SidebarContent;





// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";

// const SidebarContent = ({ activeTab, setActiveTab, setSelectedCourseId }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

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

//   const handleCourseClick = (courseId) => {
//     const isSelected = selectedCourse === courseId;
//     const newCourseId = isSelected ? null : courseId;
//     setSelectedCourse(newCourseId);
//     setSelectedCourseId(newCourseId);
//   };

//   const handleSubCategoryClick = (subCatId) => {
//     setActiveTab(subCatId === activeTab ? null : subCatId);
//   };

//   // Filter subcategories based on selected category
//   const filteredSubCategories = selectedCourse
//     ? subCategories.filter((subCat) => subCat.category === selectedCourse)
//     : subCategories;

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {categories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedCourse === category._id}
//                 onChange={() => handleCourseClick(category._id)}
//                 id={`course-${category._id}`}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   selectedCourse === category._id ? "text-primary fw-bold" : ""
//                 }`}
//                 htmlFor={`course-${category._id}`}
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Judicary</h5>
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
//     </div>
//   );
// };

// export default SidebarContent;

// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";

// const SidebarContent = ({ activeTab, setActiveTab, onSelectionChange }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);

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

//   const handleCourseClick = (courseId) => {
//     const isSelected = selectedCourse === courseId;
//     const newCourseId = isSelected ? null : courseId;
//     setSelectedCourse(newCourseId);
//     onSelectionChange({ categoryId: newCourseId, subCategoryId: activeTab });
//   };

//   const handleSubCategoryClick = (subCatId) => {
//     const newSubCatId = activeTab === subCatId ? null : subCatId;
//     setActiveTab(newSubCatId);
//     onSelectionChange({ categoryId: selectedCourse, subCategoryId: newSubCatId });
//   };

//   const filteredSubCategories = selectedCourse
//     ? subCategories.filter((subCat) => subCat.category === selectedCourse)
//     : subCategories;

//   return (
//     <div className="p-3">
//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {categories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedCourse === category._id}
//                 onChange={() => handleCourseClick(category._id)}
//                 id={`course-${category._id}`}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   selectedCourse === category._id ? "text-primary fw-bold" : ""
//                 }`}
//                 htmlFor={`course-${category._id}`}
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Judicary</h5>
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
//     </div>
//   );
// };

// export default SidebarContent;


// import React, { useEffect, useState } from "react";
// import { Nav } from "react-bootstrap";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";
// import { useParams, useNavigate } from "react-router-dom";

// const SidebarContent = ({
//   activeTab,
//   setActiveTab,
//   setSelectedCategoryId,
//   setSelectedSubCategoryId,
// }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const { courseId } = useParams();
//   const navigate = useNavigate();

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

//   const handleCourseClick = (courseId1) => {
//     const isSelected = selectedCourse === courseId1;
//     const newCourseId = isSelected ? null : courseId1;
//     setSelectedCourse(newCourseId);
//     setSelectedCategoryId(newCourseId);
//     // Redirect to /courseone/:courseId
//     navigate(`/coursesone/${courseId1}`);
//   };

//   const handleSubCategoryClick = (subCatId) => {
//     const newSubCatId = activeTab === subCatId ? null : subCatId;
//     setActiveTab(newSubCatId);
//     setSelectedSubCategoryId(newSubCatId);
//   };

//   const filteredSubCategories = selectedCourse
//     ? subCategories.filter((subCat) => subCat.category === selectedCourse)
//     : subCategories;

//   useEffect(() => {
//     if (courseId) {
//       setSelectedCourse(courseId);
//       setSelectedCategoryId(courseId);
//     }
//   }, [courseId, setSelectedCategoryId]);

//   return (
//     <div className="p-3">


//  <h5 className="fw-bold mb-3 border-bottom pb-2">Judiciary</h5>
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







//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {categories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedCourse === category._id}
//                 onChange={() => handleCourseClick(category._id)}
//                 id={`course-${category._id}`}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   selectedCourse === category._id ? "text-primary fw-bold" : ""
//                 }`}
//                 htmlFor={`course-${category._id}`}
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>


//     </div>
//   );
// };

// export default SidebarContent;






// import React, { useEffect, useState } from "react";
// import { Nav, Offcanvas, Button } from "react-bootstrap";
// import { fetchcategory, fetchSubcategory } from "../../api";
// import { toast } from "react-toastify";
// import { useParams, useNavigate } from "react-router-dom";

// const SidebarContent = ({
//   activeTab,
//   setActiveTab,
//   setSelectedCategoryId,
//   setSelectedSubCategoryId,
// }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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

//   const handleCourseClick = (courseId1) => {
//     const isSelected = selectedCourse === courseId1;
//     const newCourseId = isSelected ? null : courseId1;
//     setSelectedCourse(newCourseId);
//     setSelectedCategoryId(newCourseId);
//     navigate(`/coursesone/${courseId1}`);
//     setShowMobileSidebar(false); // Close mobile sidebar after selection
//   };

//   const handleSubCategoryClick = (subCatId) => {
//     const newSubCatId = activeTab === subCatId ? null : subCatId;
//     setActiveTab(newSubCatId);
//     setSelectedSubCategoryId(newSubCatId);
//     setShowMobileSidebar(false); // Close mobile sidebar after selection
//   };

//   const filteredSubCategories = selectedCourse
//     ? subCategories.filter((subCat) => subCat.category === selectedCourse)
//     : subCategories;

//   useEffect(() => {
//     if (courseId) {
//       setSelectedCourse(courseId);
//       setSelectedCategoryId(courseId);
//     }
//   }, [courseId, setSelectedCategoryId]);

//   const renderSidebarContent = () => (
//     <div className="p-3">
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

//       <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
//       <div className="mb-4">
//         <Nav className="flex-column gap-2">
//           {categories.map((category) => (
//             <div className="form-check" key={category._id}>
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={selectedCourse === category._id}
//                 onChange={() => handleCourseClick(category._id)}
//                 id={`course-${category._id}`}
//               />
//               <label
//                 className={`form-check-label fw-medium ${
//                   selectedCourse === category._id ? "text-primary fw-bold" : ""
//                 }`}
//                 htmlFor={`course-${category._id}`}
//               >
//                 {category.name}
//               </label>
//             </div>
//           ))}
//         </Nav>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Toggle Button - Only visible on small screens */}
//       <div className="d-md-none mb-3">
//         <Button
//           variant="primary"
//           onClick={() => setShowMobileSidebar(true)}
//           className="w-100"
//         >
//           ☰ Filter Courses
//         </Button>
//       </div>

//       {/* Mobile Sidebar (Offcanvas) */}
//       <Offcanvas
//         show={showMobileSidebar}
//         onHide={() => setShowMobileSidebar(false)}
//         placement="start"
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Menu</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {renderSidebarContent()}
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Desktop Sidebar - Only visible on medium screens and up */}
//       <div className="d-none d-md-block">
//         {renderSidebarContent()}
//       </div>
//     </>
//   );
// };

// export default SidebarContent;










import React, { useEffect, useState } from "react";
import { Nav, Offcanvas, Button } from "react-bootstrap";
import { fetchcategory, fetchSubcategory } from "../../api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const SidebarContent = ({
  activeTab,
  setActiveTab,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
}) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const fetchAllSubcategories = async () => {
      try {
        const response = await fetchSubcategory();
        if (response.data) {
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to load subcategories. Please try again.");
      }
    };
    fetchAllSubcategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchcategory();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCourseClick = (courseId1) => {
    const isSelected = selectedCourse === courseId1;
    const newCourseId = isSelected ? null : courseId1;
    setSelectedCourse(newCourseId);
    setSelectedCategoryId(newCourseId);
    navigate(`/coursesone/${courseId1}`);
    setShowMobileSidebar(false);
  };

  const handleSubCategoryClick = (subCatId) => {
    const newSubCatId = activeTab === subCatId ? null : subCatId;
    setActiveTab(newSubCatId);
    setSelectedSubCategoryId(newSubCatId);
    setShowMobileSidebar(false);
  };

  const filteredSubCategories = selectedCourse
    ? subCategories.filter((subCat) => subCat.category === selectedCourse)
    : subCategories;

  useEffect(() => {
    if (courseId) {
      setSelectedCourse(courseId);
      setSelectedCategoryId(courseId);
    }
  }, [courseId, setSelectedCategoryId]);

  const renderSidebarContent = () => (
    <div className="p-3" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <h5 className="fw-bold mb-3 border-bottom pb-2">Judiciary</h5>
      <div className="mb-4">
        <Nav className="flex-column gap-2">
          {filteredSubCategories.map((subCategory) => (
            <div className="form-check" key={subCategory._id}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={activeTab === subCategory._id}
                onChange={() => handleSubCategoryClick(subCategory._id)}
                id={`subcat-${subCategory._id}`}
              />
              <label
                className={`form-check-label fw-medium ${
                  activeTab === subCategory._id ? "text-primary fw-bold" : ""
                }`}
                htmlFor={`subcat-${subCategory._id}`}
              >
                {subCategory.name}
              </label>
            </div>
          ))}
        </Nav>
      </div>

      <h5 className="fw-bold mb-3 border-bottom pb-2">Courses</h5>
      <div className="mb-4">
        <Nav className="flex-column gap-2">
          {categories.map((category) => (
            <div className="form-check" key={category._id}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedCourse === category._id}
                onChange={() => handleCourseClick(category._id)}
                id={`course-${category._id}`}
              />
              <label
                className={`form-check-label fw-medium ${
                  selectedCourse === category._id ? "text-primary fw-bold" : ""
                }`}
                htmlFor={`course-${category._id}`}
              >
                {category.name}
              </label>
            </div>
          ))}
        </Nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button - Only visible on small screens */}
      <div className="d-md-none d-flex justify-content-between">
      <h4 className="mb-0">Explore Our Courses</h4>

        <Button
          className="td_btn_in td_white_color td_accent_bg border-0 mb-0 py-2 fw-semibold"
          onClick={() => setShowMobileSidebar(true)}
          
        >
          ☰ Filter
        </Button>
      </div>

      {/* Mobile Sidebar (Offcanvas) - Now opens from top with 80% height */}
      <Offcanvas
        show={showMobileSidebar}
        onHide={() => setShowMobileSidebar(false)}
        placement="top"
        style={{ height: '80%' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ overflowY: 'auto' }}>
          {renderSidebarContent()}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Desktop Sidebar - Only visible on medium screens and up */}
      <div className="d-none d-md-block">
        {renderSidebarContent()}
      </div>
    </>
  );
};

export default SidebarContent;