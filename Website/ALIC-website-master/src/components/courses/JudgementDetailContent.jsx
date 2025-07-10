// import React from "react";
// // import { BlogSidebar } from "../blogs/BlogSidebar";
// import blogDetails1 from "../../assets/alec-img/judgement/2.jpg"
// export const JudgementDetailContent = ({ children }) => {
//   return (
//     <section id="margin-top">
//       <div className="td_height_20 td_height_lg_30" />
//       <div className="container">
//         <div>
//           <h4>Balaji Raghavan v. Union of India (1996) 1 SCC 361</h4>
//           <p>(Landmark Judgement)</p>
//         </div>
//         <div className="row td_row_reverse_lg td_gap_y_50">
//           {/* list */}

//           <div className="col-lg-6">{children}</div>
//           <div className="col-lg-6">
//             <img src={blogDetails1} alt="Blog Details" />

//           </div>

//         </div>
//       </div>

//     </section>
//   );
// };

// // import React from "react";
// // import { useState } from "react";
// // import { useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // export const JudgementDetailContent = ({ courseId }) => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState({});
// //   const [error, setError] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (courseId) {
// //       axios.get(`/judement/course/${courseId}`)
// //         .then((res) => {
// //           setProduct(res.data);
// //         })
// //         .catch(err => {
// //           console.error("Failed to fetch course", err);
// //         });
// //     }
// //   }, [courseId]);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get(`https://alic-website-2-1.onrender.com/judement/course/${id}`);
// //         setProduct(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch product", err);
// //         setError("Failed to load product details");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProduct();
// //   }, [id]);

// //   return (
// //     <section id="margin-top">
// //       <div className="td_height_20 td_height_lg_20" />
// //       <div className="container">
// //         <div>
// //           <h1>{product.title }</h1>
// //         </div>
// //         <div className="row td_row_reverse_lg td_gap_y_50">
// //           <div className="col-lg-6">
// //             <img
// //               src={product.images?.[0] }
// //               alt="Blog Details"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

import React from "react";
// import { BlogSidebar } from "../blogs/BlogSidebar";

export const JudgementDetailContent = ({ children, id, images, title }) => {
  console.log("Incoming ID:", id); // Logging the incoming ID

  return (
    <section id="margin-top">
      <div className="td_height_20 td_height_lg_30" />
      <div className="container">
        <div>
          <h4>{title}</h4>
          <p>(Landmark Judgement)</p>
        </div>
        <div className="row td_row_reverse_lg td_gap_y_50">
          {/* list */}

          <div className="col-lg-6">{children}</div>
          <div className="col-lg-6">
            <img src={images && images[0]} alt="Blog Details" />
          </div>
        </div>
      </div>
    </section>
  );
};
