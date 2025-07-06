// // import React from "react";
// // import { Layout } from "../../layouts/Layout";
// // import { JudgementDetailContent } from "../../components/courses/JudgementDetailContent";
// // import { Link } from "react-router-dom";
// // // import blogDetails1 from "../../assets/alec-img/blogs/one.jpg";
// // import avatar1 from "../../assets/alec-img/testi/aryan.jpg";

// // export const JudgementDetails = () => {
// //   return (
// //    <Layout header={9} footer={1}>
// //       <JudgementDetailContent>

// //         <div className="td_blog_details mb-5">
// //           {/* <h2>Justice Yashwant Varma transfer? What is the In-House Enquiry Procedure?</h2>
// //           <h5>Introduction</h5> */}

// //           <p>
// //           Balaji Raghavan, a petitioner, approached the Kerala High Court under Article 226 of the Constitution, seeking a writ of mandamus to stop the government from granting National Awards like the Padma Vibhushan and Padma Shri. He argued these awards violated Article 18(1) of the Constitution, which prohibits the state from conferring non-military or non-academic titles. The case involved written submissions from both sides between 1992 and 1994, but no oral arguments or interim orders were made by the Kerala High Court. The matter was later transferred to the Supreme Court in 1993.
// //           </p>
// // {/* ---------------second----------------------- */}
// //           <h5>Issues before the Court</h5>
// //            <ul><li>Whether the Awards, Bharat Ratna, Padma Vibhushan, Padma Bhushan and Padma Shri constitute ‘Titles’ within the meaning of Article 18(1) of the Constitution of India?</li></ul>
// //            <h5>Arguments before the Court</h5>
// //           <p>
// //           The petitioner's counsel argued that Article 18(1) of the Constitution, which prohibits state-conferred titles, was intended to abolish the British colonial practice of awarding titles to curry favor, as such titles had bred public
// //           contempt before independence. They emphasized that the term "title" should be interpreted broadly to align with this intent, covering any state recognition creating social hierarchy. National awards like Padma Shri or Bharat Ratna,
// //            despite being non-hereditary, were criticized for establishing ranks among citizens (e.g., "Padma Vibhushan" implying higher status than "Padma Shri"),
// //            akin to British-era distinctions. This, they claimed, violates Article 14 (right to equality), as it perpetuates inequality by granting symbolic privileges. The only exceptions under Article 18, they noted, are military or academic
// //             distinctions (e.g., "Professor" or "General"), which are explicitly allowed.
// //           </p>
// // {/* -----------------third---------------------- */}
// //           {/* <h5>Can a Judge Be Transferred Due to an Ongoing Inquiry?</h5> */}
// //           <p>
// //           The Attorney General, representing the government, countered that "title" in Article 18(1) refers specifically to hereditary or honorific prefixes/suffixes (like "Sir" or "Maharaja"), not merit-based national awards. He clarified that national awards are neither titles nor used as name prefixes/suffixes, so they fall outside Article 18’s prohibition. The exemption for military/academic distinctions (e.g., "Dr." or "Param Vir Chakra") was included to preempt ambiguity, as these inherently involve prefixes but serve functional purposes. He stressed that global practices, including in democratic nations, support state recognition of exceptional service through awards, which do not erode equality since they lack hereditary status or enforceable privileges.
// //           </p>

// // {/* -----------------fourth---------------------- */}
// // <h5>Analysis of the Court</h5>
// //           <p>
// //           The court dismissed the petition, clarifying that National Awards like the Bharat Ratna do not qualify as "titles" under Article 18(1) of the Constitution. This means recipients cannot use these awards as prefixes or suffixes to their names (e.g., "Bharat Ratna Dr. X"). If anyone violates this rule, they risk losing the award through a formal process outlined in Regulation 10 of the relevant guidelines. The court emphasized the importance of such awards to honor exceptional contributions by citizens but raised concerns about the current selection process. It criticized the Ministry of Home Affairs' guidelines as overly broad, vague, and prone to misuse, lacking clear criteria such as annual limits on the number of awards or category-wise caps. While the Bharat Ratna has been awarded sparingly, maintaining its prestige, other awards suffer from inconsistent standards. To uphold the dignity of these honors, the court recommended forming a high-level committee (to be appointed by the Prime Minister in consultation with the President) to review and tighten the selection process. This committee would ensure awards are granted judiciously, fostering public respect rather than skepticism, and avoid making them an annual ritual without meaningful scrutiny.
// //           </p>

// //           {/* -----------------fourth---------------------- */}
// // <h5>In an In-House Inquiry:</h5>
// //           <ol>
// // <li>Chief Justice of the High Court conducts a preliminary confidential inquiry to ascertain the credibility of allegations.</li>
// // <li>If credible, the CJI is consulted, and a three-member committee (comprising two Chief Justices from other High Courts and one senior judge) is constituted.</li>
// // <li>The committee conducts an in-depth investigation, following principles of natural justice.</li>
// // <li>Based on the findings, the CJI may: </li>
// //           </ol>

// //           <ul>
// //             <li>Advise the judge to resign or take voluntary retirement.</li>
// //             <li>If the judge refuses, restrict their judicial work and inform the President and Prime Minister.
// //             </li>

// //             </ul>
// // <p>If the allegations are serious and require removal, impeachment proceedings under Article 124(4) are initiated.</p>

// // {/* -----------------fourth---------------------- */}
// // <h5>Judicial Transparency vs. Confidentiality: The Need for Reform</h5>
// //           <p>
// //           The Supreme Court's in-house inquiry mechanism has been criticized for its secrecy. In Indira Jaising v. Registrar General, Supreme Court, the Court held that inquiry reports are confidential to protect the judiciary’s independence. However, this has led to lack of transparency, raising public distrust. Given recent controversies, judicial reforms ensuring greater transparency in in-house inquiries are essential.{" "}

// //           </p>

// //           {/* -----------------fourth---------------------- */}
// // <h5>Judicial Transparency vs. Confidentiality: The Need for Reform</h5>
// //           <p>
// //           The Supreme Court's in-house inquiry mechanism has been criticized for its secrecy. In Indira Jaising v. Registrar General, Supreme Court, the Court held that inquiry reports are confidential to protect the judiciary’s independence. However, this has led to lack of transparency, raising public distrust. Given recent controversies, judicial reforms ensuring greater transparency in in-house inquiries are essential.{" "}

// //           </p>
// //         </div>

// //         {/* comment form */}
// //         {/* <BlogCommentForm /> */}
// //       </JudgementDetailContent>
// //     </Layout>
// //   );
// // };

// // import React from "react";
// // import { Layout } from "../../layouts/Layout";
// // import { JudgementDetailContent } from "../../components/courses/JudgementDetailContent";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { useState, useEffect } from "react";

// // export const JudgementDetails = ({ courseId }) => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState({});
// //   const [course, setCourse] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(false);

// //   useEffect(() => {
// //     if (courseId) {
// //       axios.get(`/judement/course/${courseId}`).then((res) => {
// //         setCourse(res.data);
// //       });
// //     }
// //   }, [courseId]);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get(`http://localhost:8000/judement/course/${id}`);
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

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>{error}</div>;

// //   return (
// //     <Layout header={9} footer={1}>
// //       <JudgementDetailContent courseId={id}>
// //         <div className="td_blog_details mb-5">
// //           {product.description}
// //         </div>
// //       </JudgementDetailContent>
// //     </Layout>
// //   );
// // };

// import React from "react";
// import { Layout } from "../../layouts/Layout";
// import { JudgementDetailContent } from "../../components/courses/JudgementDetailContent";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import DOMPurify from "dompurify";
// import OtherCoursesSlider from "./OtherCourses";

// export const JudgementDetails = ({ courseId }) => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [course, setCourse] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (courseId) {
//       axios.get(`/judement/course/${courseId}`)
//         .then((res) => {
//           setCourse(res.data);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch course", err);
//         });
//     }
//   }, [courseId]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const res = await axios.get(`http://localhost:8000/judement/course/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Failed to fetch product", err);
//         setError("Failed to load product details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   const sanitizedDescription = product.description
//     ? DOMPurify.sanitize(product.description)
//     : '';

//   return (
//     <Layout header={9} footer={1}>
//       <JudgementDetailContent courseId={id}>
//         <div className="td_blog_details">
//           <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
//         </div>
//       </JudgementDetailContent>
//        <OtherCoursesSlider />
//     </Layout>
//   );
// };

// export default JudgementDetails;

import React from "react";
import { Layout } from "../../layouts/Layout";
import { JudgementDetailContent } from "../../components/courses/JudgementDetailContent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import OtherCoursesSlider from "./OtherCourses";

export const JudgementDetails = ({ courseId }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (courseId) {
      axios
        .get(`/judement/course/${courseId}`)
        .then((res) => {
          setCourse(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch course", err);
        });
    }
  }, [courseId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(
          `http://localhost:8000/judement/course/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const sanitizedDescription = product.description
    ? DOMPurify.sanitize(product.description)
    : "";

  return (
    <Layout header={9} footer={1}>
      <JudgementDetailContent
        id={id}
        alt={product.altText}
        images={product.images || []}
        title={product.title || ""}
        courseId={id}
      >
        <div className="td_blog_details">
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      </JudgementDetailContent>
      <OtherCoursesSlider />
    </Layout>
  );
};

export default JudgementDetails;
