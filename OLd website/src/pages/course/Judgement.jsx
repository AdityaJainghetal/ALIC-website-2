// // import React from "react";
// // import { Layout } from "../../layouts/Layout";
// // import { CoursesAllContainerSidebar } from "../../components/courses/CoursesAllContainerSidebar";
// // // import { CoursesAllGridSidebar } from "../../components/courses/CoursesAllGridSidebar";
// // import { CoursesAllList } from "../../components/courses/CoursesAllList";

// // export const Judgement = () => {
// //   return (
// //     <Layout

// //     >
// //       <CoursesAllContainerSidebar isGrid>
// //         <CoursesAllList />
// //       </CoursesAllContainerSidebar>
// //     </Layout>
// //   );
// // };



// import React, { useState } from "react";
// import { Layout } from "../../layouts/Layout";
// import { CoursesAllContainerSidebar } from "../../components/courses/CoursesAllContainerSidebar";
// import { CoursesAllList } from "../../components/courses/CoursesAllList";

// export const Judgement = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategory(categoryId);
//   };

//   return (
//     <Layout>
//       <CoursesAllContainerSidebar
//         isGrid
//         onCategorySelect={handleCategorySelect}
//       >
//         <CoursesAllList selectedCategory={selectedCategory} />
//       </CoursesAllContainerSidebar>
//     </Layout>
//   );
// };


// import React, { useState } from "react";
// import { Layout } from "../../layouts/Layout";
// import { CoursesAllContainerSidebar } from "../../components/courses/CoursesAllContainerSidebar";
// import { CoursesAllList } from "../../components/courses/CoursesAllList";

// export const Judgement = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category.id); // Store just the ID in state
//   };

//   return (
//     <Layout>
//       <CoursesAllContainerSidebar
//         isGrid
//         onCategorySelect={handleCategorySelect}

//       >
//         {console.log(handleCategorySelect,'aaaaaaaaaaaaaaaaaaaaaaa')}
//         <CoursesAllList selectedCategoryId={selectedCategory} />
//       </CoursesAllContainerSidebar>
//     </Layout>
//   );
// };



import React, { useState } from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesAllContainerSidebar } from "../../components/courses/CoursesAllContainerSidebar";
import { CoursesAllList } from "../../components/courses/CoursesAllList";
import OtherCoursesSlider from "./OtherCourses";

export const Judgement = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategorySelect = (category) => {
    console.log("Selected category ID:", category.id); // Debug log
    setSelectedCategoryId(category.id);
  };

  return (
    <Layout>
      <CoursesAllContainerSidebar
        isGrid
        onCategorySelect={handleCategorySelect}
      >
        <CoursesAllList selectedCategoryId={selectedCategoryId} />

      </CoursesAllContainerSidebar>
       <OtherCoursesSlider />
    </Layout>
  );
};