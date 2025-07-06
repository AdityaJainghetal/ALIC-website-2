// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import "jquery-ui-dist/jquery-ui"; // for #slider-range (make sure jquery-ui is installed)
// import { fetchcategory } from "../BlogsCategory/api";
// const categories = [
//   { name: "Landmark Judgement" },
//   { name: "Latest Judgement", count: 45 },
//   { name: "Judgement", count: 16 },
//   { name: "Law", count: 45 },
//   { name: "5 Years LLb", count: 42 },
//   { name: "Legal", count: 44 },
//   { name: "Landmark", count: 44 },
//   { name: "Latest", count: 44 },
// ];


// export const BlogSidebar = () => {
//   useEffect(() => {
//     // jQuery UI slider
//     $("#slider-range").slider({
//       range: true,
//       min: 10,
//       max: 400,
//       values: [60, 300],
//       slide: function (event, ui) {
//         $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//       },
//     });
//     $("#amount").val(
//       "$" +
//         $("#slider-range").slider("values", 0) +
//         " - $" +
//         $("#slider-range").slider("values", 1)
//     );
//   }, []);


//     const fetchCategories = async () => {
//     setLoading(true)
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data)
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error)
//       setError("Failed to load categories. Please try again.")
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <div className="d-lg-none d-flex justify-content-end p-3">
//         <button
//           className="btn btn-danger mt-4 shadow"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#mobileSidebar"
//           aria-controls="mobileSidebar"
//         >
//           <i className="bi bi-funnel-fill me-2"></i>Open Filter
//         </button>
//       </div>

//       {/* Mobile Sidebar (80% width) */}
//       <div
//         className="offcanvas offcanvas-start custom-offcanvas-width"
//         tabIndex="-1"
//         id="mobileSidebar"
//         aria-labelledby="mobileSidebarLabel"
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5 className="offcanvas-title" id="mobileSidebarLabel">
//             Filters
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <SidebarContent />
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
//         <SidebarContent />
//       </div>

//       {/* Custom style for 80% width on mobile sidebar */}
//       <style>{`
//         @media (max-width: 991.98px) {
//           .custom-offcanvas-width {
//             width: 80% !important;
//           }
//         }

//         .category-link:hover {
//           color: #dc3545;
//           text-decoration: underline;
//         }

//         #slider-range {
//           height: 8px;
//           background: #dee2e6;
//           border-radius: 5px;
//         }

//         #slider-range .ui-slider-handle {
//           background: #dc3545;
//           border: none;
//           width: 20px;
//           height: 20px;
//           top: -6px;
//           border-radius: 50%;
//         }
//       `}</style>
//     </>
//   );
// };

// // Sidebar Content Component
// const SidebarContent = () => {
//   return (
//     <div  className="td_sidebar_filter m-0 me-0">
//       {/* Categories Section */}
//       <div className="td_filter_widget mb-4">
//         <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
//           Categories
//         </h3>
//         <div className="td_filter_category fw-semibold">
//           {categories.map((category, index) => (
//             <Link
//               key={index}
//               to="/courses-grid-view"
//               className="d-block mb-2 text-dark text-decoration-none category-link"
//             >
//               {category.name}
//             </Link>
//           ))}
//         </div>
//       </div>


//     </div>
//   );
// };




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import "jquery-ui-dist/jquery-ui"; // for #slider-range (make sure jquery-ui is installed)
// import { fetchcategory } from "../BlogsCategory/api";

// export const BlogSidebar = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // jQuery UI slider
//     $("#slider-range").slider({
//       range: true,
//       min: 10,
//       max: 400,
//       values: [60, 300],
//       slide: function (event, ui) {
//         $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//       },
//     });
//     $("#amount").val(
//       "$" +
//         $("#slider-range").slider("values", 0) +
//         " - $" +
//         $("#slider-range").slider("values", 1)
//     );
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Failed to load categories. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <div className="d-lg-none d-flex justify-content-end p-3">
//         <button
//           className="btn btn-danger mt-4 shadow"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#mobileSidebar"
//           aria-controls="mobileSidebar"
//         >
//           <i className="bi bi-funnel-fill me-2"></i>Open Filter
//         </button>
//       </div>

//       {/* Mobile Sidebar (80% width) */}
//       <div
//         className="offcanvas offcanvas-start custom-offcanvas-width"
//         tabIndex="-1"
//         id="mobileSidebar"
//         aria-labelledby="mobileSidebarLabel"
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5 className="offcanvas-title" id="mobileSidebarLabel">
//             Filters
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <SidebarContent
//             categories={categories}
//             loading={loading}
//             error={error}
//           />
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
//         <SidebarContent
//           categories={categories}
//           loading={loading}
//           error={error}
//         />
//       </div>

//       {/* Custom style for 80% width on mobile sidebar */}
//       <style>{`
//         @media (max-width: 991.98px) {
//           .custom-offcanvas-width {
//             width: 80% !important;
//           }
//         }

//         .category-link:hover {
//           color: #dc3545;
//           text-decoration: underline;
//         }

//         #slider-range {
//           height: 8px;
//           background: #dee2e6;
//           border-radius: 5px;
//         }

//         #slider-range .ui-slider-handle {
//           background: #dc3545;
//           border: none;
//           width: 20px;
//           height: 20px;
//           top: -6px;
//           border-radius: 50%;
//         }
//       `}</style>
//     </>
//   );
// };

// // Sidebar Content Component
// const SidebarContent = ({ categories, loading, error }) => {
//   return (
//     <div className="td_sidebar_filter m-0 me-0">
//       {/* Categories Section */}
//       <div className="td_filter_widget mb-4">
//         <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
//           Categories
//         </h3>
//         {loading ? (
//           <div className="text-center">
//             <div className="spinner-border text-danger" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger">{error}</div>
//         ) : (
//           <div className="td_filter_category fw-semibold">
//             {categories.map((category, index) => (
//               <Link
//                 key={index}
//                 to="/courses-grid-view"
//                 className="d-block mb-2 text-dark text-decoration-none category-link"
//               >
//                 {category.name}
//                 {category.count && <span className="text-muted ms-2">({category.count})</span>}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { fetchcategory } from "../BlogsCategory/api";

// export const BlogSidebar = ({ onCategoryClick }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);






//   useEffect(() => {
//     // jQuery UI slider
//     $("#slider-range").slider({
//       range: true,
//       min: 10,
//       max: 400,
//       values: [60, 300],
//       slide: function (event, ui) {
//         $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//       },
//     });
//     $("#amount").val(
//       "$" +
//       $("#slider-range").slider("values", 0) +
//       " - $" +
//       $("#slider-range").slider("values", 1)
//     );
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Failed to load categories. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // const handleCategoryClick = (categoryId) => {
//   //   setSelectedCategory(categoryId);
//   //   console.log(categoryId, "Sidebar id")
//   //   if (onCategorySelect) {
//   //     onCategorySelect(categoryId);
//   //   }
//   // };


//   const handleCategoryClick= (categoryId, e) => {
//   e.preventDefault();
//   if (onCategoryClick) {
//     onCategoryClick(categoryId);
//   }
// };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <div className="d-lg-none d-flex justify-content-end p-3">
//         <button
//           className="btn btn-danger mt-4 shadow"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#mobileSidebar"
//           aria-controls="mobileSidebar"
//         >
//           <i className="bi bi-funnel-fill me-2"></i>Open Filter
//         </button>
//       </div>

//       {/* Mobile Sidebar (80% width) */}
//       <div
//         className="offcanvas offcanvas-start custom-offcanvas-width"
//         tabIndex="-1"
//         id="mobileSidebar"
//         aria-labelledby="mobileSidebarLabel"
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5 className="offcanvas-title" id="mobileSidebarLabel">
//             Filters
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <SidebarContent
//             categories={categories}
//             loading={loading}
//             error={error}
//             selectedCategory={selectedCategory}
//             onCategoryClick={handleCategoryClick}
//           />
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
//         <SidebarContent
//           categories={categories}
//           loading={loading}
//           error={error}
//           selectedCategory={selectedCategory}
//           onCategoryClick={handleCategoryClick}
//         />
//       </div>

//       {/* Custom style for 80% width on mobile sidebar */}
//       <style>{`
//         @media (max-width: 991.98px) {
//           .custom-offcanvas-width {
//             width: 80% !important;
//           }
//         }

//         .category-link:hover {
//           color: #dc3545;
//           text-decoration: underline;
//         }

//         .category-link.active {
//           color: #dc3545;
//           font-weight: bold;
//         }

//         #slider-range {
//           height: 8px;
//           background: #dee2e6;
//           border-radius: 5px;
//         }

//         #slider-range .ui-slider-handle {
//           background: #dc3545;
//           border: none;
//           width: 20px;
//           height: 20px;
//           top: -6px;
//           border-radius: 50%;
//         }
//       `}</style>
//     </>
//   );
// };

// // Sidebar Content Component
// const SidebarContent = ({ categories, loading, error, selectedCategory, onCategoryClick }) => {
//   const handleClick = (categoryId, e) => {
//     e.preventDefault();
//     if (onCategoryClick) {
//       onCategoryClick(categoryId);
//     }
//   };

//   // return (
//   //   <div className="td_sidebar_filter m-0 me-0">
//   //     {/* Categories Section */}
//   //     <div className="td_filter_widget mb-4">
//   //       <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
//   //         Categories
//   //       </h3>
//   //       {loading ? (
//   //         <div className="text-center">
//   //           <div className="spinner-border text-danger" role="status">
//   //             <span className="visually-hidden">Loading...</span>
//   //           </div>
//   //         </div>
//   //       ) : error ? (
//   //         <div className="alert alert-danger">{error}</div>
//   //       ) : (
//   //         <div className="td_filter_category fw-semibold">
//   //           {categories.map((category) => (
//   //             <Link
//   //               key={category.id}
//   //               to="#"
//   //               onClick={(e) => handleClick(category.id, e)}
//   //               className={`d-block mb-2 text-dark text-decoration-none category-link ${
//   //                 selectedCategory === category.id ? 'active' : ''
//   //               }`}
//   //             >
//   //               {category.name}
//   //               {category.count && <span className="text-muted ms-2">({category.count})</span>}
//   //             </Link>
//   //           ))}
//   //         </div>
//   //       )}
//   //     </div>
//   //   </div>
//   // );
// {categories.map((category) => {
//   console.log("Rendering category:", category); // ✅ Debug line
//   return (
//     <Link
//       key={category.id}
//       to="#"
//       onClick={(e) => handleClick(category.id, e)}
//       className={`d-block mb-2 text-dark text-decoration-none category-link ${
//         selectedCategory === category.id ? 'active' : ''
//       }`}
//     >
//       {category.name}
//       {category.count && <span className="text-muted ms-2">({category.count})</span>}
//     </Link>
//   );
// })}


// };


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { fetchcategory } from "../BlogsCategory/api";

// export const BlogSidebar = ({ onCategoryClick }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     // jQuery UI slider
//     $("#slider-range").slider({
//       range: true,
//       min: 10,
//       max: 400,
//       values: [60, 300],
//       slide: function (event, ui) {
//         $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//       },
//     });
//     $("#amount").val(
//       "$" +
//       $("#slider-range").slider("values", 0) +
//       " - $" +
//       $("#slider-range").slider("values", 1)
//     );
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Failed to load categories. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId, e) => {
//     e.preventDefault();
//     setSelectedCategory(categoryId); // Update the selected category state
//     if (onCategoryClick) {
//       onCategoryClick(categoryId);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <div className="d-lg-none d-flex justify-content-end p-3">
//         <button
//           className="btn btn-danger mt-4 shadow"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#mobileSidebar"
//           aria-controls="mobileSidebar"
//         >
//           <i className="bi bi-funnel-fill me-2"></i>Open Filter
//         </button>
//       </div>

//       {/* Mobile Sidebar (80% width) */}
//       <div
//         className="offcanvas offcanvas-start custom-offcanvas-width"
//         tabIndex="-1"
//         id="mobileSidebar"
//         aria-labelledby="mobileSidebarLabel"
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5 className="offcanvas-title" id="mobileSidebarLabel">
//             Filters
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <SidebarContent
//             categories={categories}
//             loading={loading}
//             error={error}
//             selectedCategory={selectedCategory}
//             onCategoryClick={handleCategoryClick}
//           />
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
//         <SidebarContent
//           categories={categories}
//           loading={loading}
//           error={error}
//           selectedCategory={selectedCategory}
//           onCategoryClick={handleCategoryClick}
//         />
//       </div>

//       {/* Custom style for 80% width on mobile sidebar */}
//       <style>{`
//         @media (max-width: 991.98px) {
//           .custom-offcanvas-width {
//             width: 80% !important;
//           }
//         }

//         .category-link:hover {
//           color: #dc3545;
//           text-decoration: underline;
//         }

//         .category-link.active {
//           color: #dc3545;
//           font-weight: bold;
//         }

//         #slider-range {
//           height: 8px;
//           background: #dee2e6;
//           border-radius: 5px;
//         }

//         #slider-range .ui-slider-handle {
//           background: #dc3545;
//           border: none;
//           width: 20px;
//           height: 20px;
//           top: -6px;
//           border-radius: 50%;
//         }
//       `}</style>
//     </>
//   );
// };

// // Sidebar Content Component
// const SidebarContent = ({ categories, loading, error, selectedCategory, onCategoryClick,onCategorySelect }) => {
//   const handleClick = (categoryId, e) => {
//     e.preventDefault();
//     if (onCategoryClick) {
//       onCategoryClick(categoryId, e);
//     }
//     console.log(categoryId,"iddddddddddd")
//   };

//    onCategorySelect?.({
//       id: categoryId,
//       name: categoryName
//     });

//   return (
//     <div className="td_sidebar_filter m-0 me-0">
//       {/* Categories Section */}
//       <div className="td_filter_widget mb-4">
//         <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
//           Categories
//         </h3>
//         {loading ? (
//           <div className="text-center">
//             <div className="spinner-border text-danger" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger">{error}</div>
//         ) : (
//           <div className="td_filter_category fw-semibold">
//             {categories.map((category) => (
//               <Link
//                 key={category.id}
//                 to="#"
//                 onClick={(e) => handleCategoryClick(e, categoryId, categoryName)}
//                 className={`d-block mb-2 text-dark text-decoration-none category-link ${
//                   selectedCategory === category.id ? 'active' : ''
//                 }`}
//               >
//                 {category.name}
//                 {category.count && <span className="text-muted ms-2">({category.count})</span>}
//               </Link>

// ))}
//           </div>
//         )}
//        { console.log(handleClick)}
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { fetchcategory } from "../BlogsCategory/api";

// export const BlogSidebar = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);


//   console.log(selectedCategory, "KIO")


//   useEffect(() => {
//     // jQuery UI slider
//     $("#slider-range").slider({
//       range: true,
//       min: 10,
//       max: 400,
//       values: [60, 300],
//       slide: function (event, ui) {
//         $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
//       },
//     });
//     $("#amount").val(
//       "$" +
//       $("#slider-range").slider("values", 0) +
//       " - $" +
//       $("#slider-range").slider("values", 1)
//     );
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Failed to load categories. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId, e) => {
//     e.preventDefault();
//     setSelectedCategory(categoryId); // Update the selected category state

//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <div className="d-lg-none d-flex justify-content-end p-3">
//         <button
//           className="btn btn-danger mt-4 shadow"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#mobileSidebar"
//           aria-controls="mobileSidebar"
//         >
//           <i className="bi bi-funnel-fill me-2"></i>Open Filter
//         </button>
//       </div>

//       {/* Mobile Sidebar (80% width) */}
//       <div
//         className="offcanvas offcanvas-start custom-offcanvas-width"
//         tabIndex="-1"
//         id="mobileSidebar"
//         aria-labelledby="mobileSidebarLabel"
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5 className="offcanvas-title" id="mobileSidebarLabel">
//             Filters
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <SidebarContent
//             categories={categories}
//             loading={loading}
//             error={error}
//             selectedCategory={selectedCategory}
//             onCategoryClick={handleCategoryClick}
//           />
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
//         <SidebarContent
//           categories={categories}
//           loading={loading}
//           error={error}
//           selectedCategory={selectedCategory}
//           onCategoryClick={handleCategoryClick}
//         />
//       </div>

//       {/* Custom style for 80% width on mobile sidebar */}
//       <style>{`
//         @media (max-width: 991.98px) {
//           .custom-offcanvas-width {
//             width: 80% !important;
//           }
//         }

//         .category-link:hover {
//           color: #dc3545;
//           text-decoration: underline;
//         }

//         .category-link.active {
//           color: #dc3545;
//           font-weight: bold;
//         }

//         #slider-range {
//           height: 8px;
//           background: #dee2e6;
//           border-radius: 5px;
//         }

//         #slider-range .ui-slider-handle {
//           background: #dc3545;
//           border: none;
//           width: 20px;
//           height: 20px;
//           top: -6px;
//           border-radius: 50%;
//         }
//       `}</style>
//     </>
//   );
// };

// // Sidebar Content Component
// const SidebarContent = ({ categories, loading, error, selectedCategory, onCategoryClick }) => {

//   const handleClick = (categoryId, categoryName, e) => {
//     e.preventDefault();
//     if (onCategoryClick) {
//       onCategoryClick(categoryId, e);
//     }
//   };

//   return (
//     <div className="td_sidebar_filter m-0 me-0">
//       {/* Categories Section */}
//       <div className="td_filter_widget mb-4">
//         <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
//           Categories
//         </h3>
//         {loading ? (
//           <div className="text-center">
//             <div className="spinner-border text-danger" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="alert alert-danger">{error}</div>
//         ) : (
//           <div className="td_filter_category fw-semibold">
//             {categories.map((category) => (
//               // console.log(category, "LION"),
//               <Link
//                 key={category._id}
//                 to="#"
//                 onClick={(e) => handleClick(category._id, category.name, e)}
//                 className={`d-block mb-2 text-dark text-decoration-none category-link ${
//                   selectedCategory === category._id ? 'active' : ''
//                 }`}
//               >
//                 {category.name}
//                 {category.count && <span className="text-muted ms-2">({category.count})</span>}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { fetchcategory } from "../BlogsCategory/api";

export const BlogSidebar = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // jQuery UI slider
    $("#slider-range").slider({
      range: true,
      min: 10,
      max: 400,
      values: [60, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
      $("#slider-range").slider("values", 0) +
      " - $" +
      $("#slider-range").slider("values", 1)
    );
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchcategory();
      if (response.data) {
        setCategories(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, e) => {
    e.preventDefault();
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="d-lg-none d-flex align-items-center justify-content-between p-3">
        <h4 className="mb-0">Explore Our Blog</h4>
        <button
          className="btn btn-danger x shadow"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          <i className="bi bi-funnel-fill me-2"></i>Open Filter
        </button>
      </div>

      {/* Mobile Sidebar (80% width) */}
      <div
        className="offcanvas offcanvas-start custom-offcanvas-width"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SidebarContent
            categories={categories}
            loading={loading}
            error={error}
            selectedCategoryId={selectedCategoryId}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
        <SidebarContent
          categories={categories}
          loading={loading}
          error={error}
          selectedCategoryId={selectedCategoryId}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Custom style for 80% width on mobile sidebar */}
      <style>{`
        @media (max-width: 991.98px) {
          .custom-offcanvas-width {
            width: 80% !important;
          }
        }

        .category-link:hover {
          color: #dc3545;
          text-decoration: underline;
        }

        .category-link.active {
          color: #dc3545;
          font-weight: bold;
        }

        #slider-range {
          height: 8px;
          background: #dee2e6;
          border-radius: 5px;
        }

        #slider-range .ui-slider-handle {
          background: #dc3545;
          border: none;
          width: 20px;
          height: 20px;
          top: -6px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

// Sidebar Content Component
const SidebarContent = ({ categories, loading, error, selectedCategoryId, onCategoryClick }) => {
  const handleClick = (categoryId, e) => {
    e.preventDefault();
    if (onCategoryClick) {
      onCategoryClick(categoryId, e);
    }
  };

  return (
    <div className="td_sidebar_filter m-0 me-0">
      {/* Categories Section */}
      <div className="td_filter_widget mb-4">
        <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
          Categories
        </h3>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="td_filter_category fw-semibold">
            <Link
              to="#"
              onClick={(e) => handleClick(null, e)}
              className={`d-block mb-2 text-dark text-decoration-none category-link ${
                selectedCategoryId === null ? 'active' : ''
              }`}
            >
              All Categories
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                to="#"
                onClick={(e) => handleClick(category._id, e)}
                className={`d-block mb-2 text-dark text-decoration-none category-link ${
                  selectedCategoryId === category._id ? 'active' : ''
                }`}
              >
                {category.name}
                {category.count && <span className="text-muted ms-2">({category.count})</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};