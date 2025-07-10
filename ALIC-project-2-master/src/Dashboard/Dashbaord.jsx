// // import { FaGraduationCap, FaEnvelope, FaUsers, FaChartLine, FaFilter } from 'react-icons/fa';
// // import React, { useState, useEffect } from 'react';
// // import DataTable from 'react-data-table-component';
// // import { toast } from 'react-toastify';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';

// // const Dashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalCourseEnquiries: 0,
// //     totalContactEnquiries: 0,
// //     todayEnquiries: 0,
// //     conversionRate: 0
// //   });
// //   const [enquiries, setEnquiries] = useState([]);
// //   const [contacts, setContacts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showTable, setShowTable] = useState(null);
// //   const [todayDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);
// //   const [filteredEnquiries, setFilteredEnquiries] = useState([]);
// //   const [filteredContacts, setFilteredContacts] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [enquiriesData, contactsData] = await Promise.all([
// //           fetchEnquiries(),
// //           fetchContacts()
// //         ]);

// //         // Calculate today's date once
// //         const today = new Date().toISOString().split('T')[0];

// //         // Calculate today's enquiries
// //         const todayEnqs = enquiriesData.filter(enquiry =>
// //           enquiry.createdAt && enquiry.createdAt.split('T')[0] === today
// //         ).length;

// //         const todayContacts = contactsData.filter(contact =>
// //           contact.createdAt && contact.createdAt.split('T')[0] === today
// //         ).length;

// //         // Calculate conversion rate
// //         const convertedEnquiries = enquiriesData.filter(e => e.status === 'converted').length;
// //         const conversionRate = enquiriesData.length > 0
// //           ? Math.round((convertedEnquiries / enquiriesData.length) * 100) //conversionRate
// //           : 0;

// // // Assume enquiriesData is an array of objects with date and converted status
// // const getMonthData = (data, monthOffset = 0) => {
// //   const currentDate = new Date();
// //   const targetDate = new Date(currentDate.setMonth(currentDate.getMonth() - monthOffset));

// //   // Filter enquiries based on the month (current or previous)
// //   return data.filter(item => {
// //     const enquiryDate = new Date(item.date);
// //     return enquiryDate.getMonth() === targetDate.getMonth() && enquiryDate.getFullYear() === targetDate.getFullYear();
// //   });
// // }

// // // Calculate conversion rate
// // const calculateConversionRate = (data) => {
// //   return data.length > 0
// //     ? Math.round((data.filter(item => item.converted).length / data.length) * 100)
// //     : 0;
// // }

// // // Get data for current and previous month
// // const currentMonthData = getMonthData(enquiriesData, 0);
// // const previousMonthData = getMonthData(enquiriesData, 1);

// // // Calculate conversion rates for both months
// // const currentMonthConversionRate = calculateConversionRate(currentMonthData);
// // const previousMonthConversionRate = calculateConversionRate(previousMonthData);

// // // Calculate percentage change between current and previous month
// // let percentageChange = 0;
// // if (previousMonthConversionRate > 0) {
// //   percentageChange = Math.round(((currentMonthConversionRate - previousMonthConversionRate) / previousMonthConversionRate) * 100);
// // }

// // // Output the results
// // console.log(`Current Month Conversion Rate: ${currentMonthConversionRate}%`);
// // console.log(`Previous Month Conversion Rate: ${previousMonthConversionRate}%`);
// // console.log(`Percentage Change: ${percentageChange}%`);

// //         // Update stats
// //         setStats({
// //           totalCourseEnquiries: enquiriesData.length,
// //           totalContactEnquiries: contactsData.length,
// //           todayEnquiries: todayEnqs + todayContacts,
// //           conversionRate: conversionRate
// //         });

// //         setEnquiries(enquiriesData);
// //         setContacts(contactsData);
// //         setFilteredEnquiries([...enquiriesData].reverse());
// //         setFilteredContacts([...contactsData].reverse());
// //       } catch (err) {
// //         setError(err.message);
// //         toast.error('Error fetching data: ' + err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     if (startDate && endDate) {
// //       const filtered = enquiries.filter(enquiry => {
// //         if (!enquiry.createdAt) return false;
// //         const enquiryDate = new Date(enquiry.createdAt);
// //         return enquiryDate >= startDate && enquiryDate <= endDate;
// //       });
// //       setFilteredEnquiries(filtered);
// //     } else {
// //       setFilteredEnquiries([...enquiries].reverse());
// //     }
// //   }, [startDate, endDate, enquiries]);

// //   const fetchEnquiries = async () => {
// //     const response = await fetch('http://localhost:8000/enroll/alldisplay');
// //     if (!response.ok) {
// //       throw new Error('Failed to fetch enquiries');
// //     }
// //     const data = await response.json();
// //     return Array.isArray(data) ? data : data.data || [];
// //   };

// //   const fetchContacts = async () => {
// //     const response = await fetch('http://localhost:8000/contact/allcontact');
// //     if (!response.ok) throw new Error('Failed to fetch contacts');
// //     const data = await response.json();
// //     return Array.isArray(data) ? data : data.data || [];
// //   };

// //   const enquiryColumns = [
// //     {
// //       name: 'Name',
// //       selector: row => row.name || '-',
// //       sortable: true,
// //       cell: row => <span className="font-medium">{row.name || '-'}</span>
// //     },
// //     {
// //       name: 'Email',
// //       selector: row => row.email || '-',
// //       sortable: true,
// //       cell: row => <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">{row.email || '-'}</a>
// //     },
// //     {
// //       name: 'Phone',
// //       selector: row => row.phone || '-',
// //       cell: row => <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">{row.phone || '-'}</a>
// //     },
// //     {
// //       name: 'Product Name',
// //       selector: row => row?.productId?.Coursename || '-',
// //       sortable: true
// //     },
// //     {
// //       name: 'Date',
// //       selector: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-',
// //       sortable: true
// //     },
// //     {
// //       name: 'Status',
// //       selector: row => row.status || 'new',
// //       cell: row => (
// //         <span className={`px-2 py-1 rounded-full text-xs ${
// //           row.status === 'converted' ? 'bg-green-100 text-green-800' :
// //           row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
// //           'bg-blue-100 text-blue-800'
// //         }`}>
// //           {row.status || 'new'}
// //         </span>
// //       )
// //     }
// //   ];

// //   const contactColumns = [
// //     {
// //       name: 'Name',
// //       selector: row => row.name || '-',
// //       sortable: true,
// //       cell: row => <span className="font-medium">{row.name || '-'}</span>
// //     },
// //     {
// //       name: 'Email',
// //       selector: row => row.email || '-',
// //       sortable: true,
// //       cell: row => <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">{row.email || '-'}</a>
// //     },
// //     {
// //       name: 'Phone',
// //       selector: row => row.phone || '-',
// //       cell: row => <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">{row.phone || '-'}</a>
// //     },
// //     {
// //       name: 'Message',
// //       selector: row => row.message || '-',
// //       cell: row => <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">{row.message || '-'}</div>
// //     },
// //     {
// //       name: 'Date',
// //       selector: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-',
// //       sortable: true
// //     }
// //   ];

// //   const handleCardClick = (type) => {
// //     setShowTable(showTable === type ? null : type);
// //   };

// //   const clearDateFilter = () => {
// //     setStartDate(null);
// //     setEndDate(null);
// //     setFilteredEnquiries([...enquiries].reverse());
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Loading dashboard data...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
// //           <strong>Error:</strong> {error}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

// //       {/* Stats Cards Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //         {/* Total Course Enquiries Card */}
// //         <div
// //           className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
// //           onClick={() => handleCardClick('enquiries')}
// //         >
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-sm font-medium opacity-80">Total Course Enquiries</p>
// //               <h2 className="text-3xl font-bold mt-2">{stats.totalCourseEnquiries}</h2>
// //             </div>
// //             <div className="p-3 bg-white bg-opacity-20 rounded-full">
// //               <FaGraduationCap className="text-2xl" />
// //             </div>
// //           </div>
// //           <div className="mt-4 flex items-center text-sm">
// //             <FaChartLine className="mr-1" />
// //             <span>Click to view all</span>
// //           </div>
// //         </div>

// //         {/* Total Contact Enquiries Card */}
// //         <div
// //           className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
// //           onClick={() => handleCardClick('contacts')}
// //         >
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-sm font-medium opacity-80">Total Contact Enquiries</p>
// //               <h2 className="text-3xl font-bold mt-2">{stats.totalContactEnquiries}</h2>
// //             </div>
// //             <div className="p-3 bg-white bg-opacity-20 rounded-full">
// //               <FaEnvelope className="text-2xl" />
// //             </div>
// //           </div>
// //           <div className="mt-4 flex items-center text-sm">
// //             <FaChartLine className="mr-1" />
// //             <span>Click to view all</span>
// //           </div>
// //         </div>

// //         {/* Today's Enquiries Card */}
// //         <div className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-sm font-medium opacity-80">Today's Enquiries</p>
// //               <h2 className="text-3xl font-bold mt-2">{stats.todayEnquiries}</h2>
// //             </div>
// //             <div className="p-3 bg-white bg-opacity-20 rounded-full">
// //               <FaUsers className="text-2xl" />
// //             </div>
// //           </div>
// //           <div className="mt-4 flex items-center text-sm">
// //             <FaChartLine className="mr-1" />
// //             <span>As of {todayDate}</span>
// //           </div>
// //         </div>

// //         {/* Conversion Rate Card */}
// //         <div className="bg-gradient-to-r from-emerald-500 to-lime-400 rounded-xl shadow-lg p-6 text-white">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-sm font-medium opacity-80">Conversion Rate</p>
// //               <h2 className="text-3xl font-bold mt-2">{stats.conversionRate}%</h2>
// //             </div>
// //             <div className="p-3 bg-white bg-opacity-20 rounded-full">
// //               <FaChartLine className="text-2xl" />
// //             </div>
// //           </div>
// //           <div className="mt-4 flex items-center text-sm">
// //             <span>Based on {stats.totalCourseEnquiries} enquiries</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Data Tables Section */}
// //       {showTable === 'enquiries' && (
// //         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h2 className="text-xl font-semibold text-gray-800">All Course Enquiries</h2>
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center space-x-2">
// //                 <DatePicker
// //                   selected={startDate}
// //                   onChange={date => setStartDate(date)}
// //                   selectsStart
// //                   startDate={startDate}
// //                   endDate={endDate}
// //                   placeholderText="Start Date"
// //                   className="border rounded px-3 py-1 text-sm"
// //                   dateFormat="yyyy-MM-dd"
// //                 />
// //                 <span>to</span>
// //                 <DatePicker
// //                   selected={endDate}
// //                   onChange={date => setEndDate(date)}
// //                   selectsEnd
// //                   startDate={startDate}
// //                   endDate={endDate}
// //                   minDate={startDate}
// //                   placeholderText="End Date"
// //                   className="border rounded px-3 py-1 text-sm"
// //                   dateFormat="yyyy-MM-dd"
// //                 />
// //               </div>
// //               <button
// //                 onClick={() => handleDateFilter()}
// //                 className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
// //               >
// //                 <FaFilter className="mr-1" />
// //                 Filter
// //               </button>
// //               <button
// //                 onClick={clearDateFilter}
// //                 className="bg-gray-500 text-white px-3 py-1 rounded"
// //               >
// //                 Clear
// //               </button>
// //             </div>
// //           </div>
// //           <div className="mb-4">
// //             {startDate && endDate && (
// //               <p className="text-sm text-gray-600">
// //                 Showing {filteredEnquiries.length} enquiries from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
// //               </p>
// //             )}
// //           </div>
// //           <DataTable
// //             columns={enquiryColumns}
// //             data={filteredEnquiries}
// //             pagination
// //             highlightOnHover
// //             responsive
// //             className="border rounded-lg overflow-hidden"
// //             noDataComponent={<div className="p-4 text-gray-500">No enquiries found</div>}
// //           />
// //         </div>
// //       )}

// //       {showTable === 'contacts' && (
// //         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// //           <h2 className="text-xl font-semibold text-gray-800 mb-4">All Contact Enquiries</h2>
// //           <DataTable
// //             columns={contactColumns}
// //             data={filteredContacts}
// //             pagination
// //             highlightOnHover
// //             responsive
// //             className="border rounded-lg overflow-hidden"
// //             noDataComponent={<div className="p-4 text-gray-500">No contacts found</div>}
// //           />
// //         </div>
// //       )}

// //       {/* Recent Enquiries Section */}
// //       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// //         <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Enquiries</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <h3 className="text-lg font-medium text-gray-700 mb-3">Course Enquiries (Last 5)</h3>
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
// //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {enquiries.slice().reverse().slice(0, 5).map((enquiry, index) => (
// //                     <tr key={`enquiry-${index}`}>
// //                       <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
// //                         {enquiry.name || '-'}
// //                       </td>
// //                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
// //                         {enquiry?.productId?.Coursename || '-'}
// //                       </td>
// //                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
// //                         {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : '-'}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //           <div>
// //             <h3 className="text-lg font-medium text-gray-700 mb-3">Contact Enquiries (Last 5)</h3>
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {contacts.slice().reverse().slice(0, 5).map((contact, index) => (
// //                     <tr key={`contact-${index}`}>
// //                       <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
// //                         {contact.name || '-'}
// //                       </td>
// //                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
// //                         {contact.email || '-'}
// //                       </td>
// //                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
// //                         {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : '-'}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import {
//   FaGraduationCap,
//   FaEnvelope,
//   FaUsers,
//   FaChartLine,
//   FaFilter,
// } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalCourseEnquiries: 0,
//     totalContactEnquiries: 0,
//     todayEnquiries: 0,
//     conversionRate: 0,
//     conversionRateChange: 0,
//   });
//   const [enquiries, setEnquiries] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showTable, setShowTable] = useState(null);
//   const [todayDate] = useState(new Date().toISOString().split("T")[0]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [filteredEnquiries, setFilteredEnquiries] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);

//   const getMonthData = (data, monthOffset = 0) => {
//     const currentDate = new Date();
//     const targetDate = new Date(
//       currentDate.setMonth(currentDate.getMonth() - monthOffset)
//     );

//     return data.filter((item) => {
//       if (!item.createdAt) return false;
//       const enquiryDate = new Date(item.createdAt);
//       return (
//         enquiryDate.getMonth() === targetDate.getMonth() &&
//         enquiryDate.getFullYear() === targetDate.getFullYear()
//       );
//     });
//   };

//   const calculateConversionRate = (data) => {
//     const converted = data.filter((item) => item.status === "converted").length;
//     return data.length > 0 ? Math.round((converted / data.length) * 100) : 0;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enquiriesData, contactsData] = await Promise.all([
//           fetchEnquiries(),
//           fetchContacts(),
//           fetchContactsSyllabus()
//         ]);

//         const today = new Date().toISOString().split("T")[0];

//         const todayEnqs = enquiriesData.filter(
//           (enquiry) =>
//             enquiry.createdAt && enquiry.createdAt.split("T")[0] === today
//         ).length;

//         const todayContacts = contactsData.filter(
//           (contact) =>
//             contact.createdAt && contact.createdAt.split("T")[0] === today
//         ).length;

//         const overallConversionRate = calculateConversionRate(enquiriesData);

//         const currentMonthData = getMonthData(enquiriesData, 0);
//         const previousMonthData = getMonthData(enquiriesData, 1);

//         const currentMonthConversionRate =
//           calculateConversionRate(currentMonthData);
//         const previousMonthConversionRate =
//           calculateConversionRate(previousMonthData);

//         let percentageChange = 0;
//         if (previousMonthConversionRate > 0) {
//           percentageChange =
//             ((currentMonthConversionRate - previousMonthConversionRate) /
//               previousMonthConversionRate) *
//             100;
//         } else if (currentMonthConversionRate > 0) {
//           percentageChange = 100;
//         }

//         setStats({
//           totalCourseEnquiries: enquiriesData.length,
//           totalContactEnquiries: contactsData.length,
//           todayEnquiries: todayEnqs + todayContacts,
//           conversionRate: overallConversionRate,
//           conversionRateChange: Math.round(percentageChange),
//         });

//         setEnquiries(enquiriesData);
//         setContacts(contactsData);
//         setFilteredEnquiries([...enquiriesData].reverse());
//         setFilteredContacts([...contactsData].reverse());
//       } catch (err) {
//         setError(err.message);
//         toast.error("Error fetching data: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = enquiries.filter((enquiry) => {
//         if (!enquiry.createdAt) return false;
//         const enquiryDate = new Date(enquiry.createdAt);
//         return enquiryDate >= startDate && enquiryDate <= endDate;
//       });
//       setFilteredEnquiries(filtered);
//     } else {
//       setFilteredEnquiries([...enquiries].reverse());
//     }
//   }, [startDate, endDate, enquiries]);

//   const fetchEnquiries = async () => {
//     const response = await fetch("http://localhost:8000/enroll/alldisplay");
//     if (!response.ok) {
//       throw new Error("Failed to fetch enquiries");
//     }
//     const data = await response.json();
//     return Array.isArray(data) ? data : data.data || [];
//   };

//   const fetchContacts = async () => {
//     const response = await fetch("http://localhost:8000/contact/allcontact");
//     if (!response.ok) throw new Error("Failed to fetch contacts");
//     const data = await response.json();
//     return Array.isArray(data) ? data : data.data || [];
//   };

//     const fetchContactsSyllabus = async () => {
//     const response = await fetch("http://localhost:8000/register/allcontact");
//     if (!response.ok) throw new Error("Failed to fetch contacts");
//     const data = await response.json();
//     return Array.isArray(data) ? data : data.data || [];
//   };

//   const enquiryColumns = [
//     {
//       name: "Name",
//       selector: (row) => row.name || "-",
//       sortable: true,
//       cell: (row) => <span className="font-medium">{row.name || "-"}</span>,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email || "-",
//       sortable: true,
//       cell: (row) => (
//         <a
//           href={`mailto:${row.email}`}
//           className="text-blue-600 hover:underline"
//         >
//           {row.email || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.phone || "-",
//       cell: (row) => (
//         <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
//           {row.phone || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Product Name",
//       selector: (row) => row?.productId?.Coursename || "-",
//       sortable: true,
//     },
//     {
//       name: "Date",
//       selector: (row) =>
//         row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status || "new",
//       cell: (row) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             row.status === "converted"
//               ? "bg-green-100 text-green-800"
//               : row.status === "pending"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-blue-100 text-blue-800"
//           }`}
//         >
//           {row.status || "new"}
//         </span>
//       ),
//     },
//   ];

//   const contactColumns = [
//     {
//       name: "Name",
//       selector: (row) => row.name || "-",
//       sortable: true,
//       cell: (row) => <span className="font-medium">{row.name || "-"}</span>,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email || "-",
//       sortable: true,
//       cell: (row) => (
//         <a
//           href={`mailto:${row.email}`}
//           className="text-blue-600 hover:underline"
//         >
//           {row.email || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.phone || "-",
//       cell: (row) => (
//         <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
//           {row.phone || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Message",
//       selector: (row) => row.message || "-",
//       cell: (row) => (
//         <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">
//           {row.message || "-"}
//         </div>
//       ),
//     },
//     {
//       name: "Date",
//       selector: (row) =>
//         row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
//       sortable: true,
//     },
//   ];

//   const handleCardClick = (type) => {
//     setShowTable(showTable === type ? null : type);
//   };

//   const clearDateFilter = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setFilteredEnquiries([...enquiries].reverse());
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong>Error:</strong> {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">
//         Dashboard Overview
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div
//           className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
//           onClick={() => handleCardClick("enquiries")}
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium opacity-80">
//                 Total Course Enquiries
//               </p>
//               <h2 className="text-3xl font-bold mt-2">
//                 {stats.totalCourseEnquiries}
//               </h2>
//             </div>
//             <div className="p-3 bg-white bg-opacity-20 rounded-full">
//               <FaGraduationCap className="text-2xl" />
//             </div>
//           </div>
//           <div className="mt-4 flex items-center text-sm">
//             <FaChartLine className="mr-1" />
//             <span>Click to view all</span>
//           </div>
//         </div>

//         <div
//           className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
//           onClick={() => handleCardClick("contacts")}
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium opacity-80">
//                 Total Contact Enquiries
//               </p>
//               <h2 className="text-3xl font-bold mt-2">
//                 {stats.totalContactEnquiries}
//               </h2>
//             </div>
//             <div className="p-3 bg-white bg-opacity-20 rounded-full">
//               <FaEnvelope className="text-2xl" />
//             </div>
//           </div>
//           <div className="mt-4 flex items-center text-sm">
//             <FaChartLine className="mr-1" />
//             <span>Click to view all</span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium opacity-80">
//                 Today's Enquiries
//               </p>
//               <h2 className="text-3xl font-bold mt-2">
//                 {stats.todayEnquiries}
//               </h2>
//             </div>
//             <div className="p-3 bg-white bg-opacity-20 rounded-full">
//               <FaUsers className="text-2xl" />
//             </div>
//           </div>
//           <div className="mt-4 flex items-center text-sm">
//             <FaChartLine className="mr-1" />
//             <span>As of {todayDate}</span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-emerald-500 to-lime-400 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium opacity-80">Conversion Rate</p>
//               <h2 className="text-3xl font-bold mt-2">
//                 {stats.conversionRate}%
//               </h2>
//               <div className="mt-2 flex items-center">
//                 {stats.conversionRateChange !== 0 && (
//                   <>
//                     {stats.conversionRateChange > 0 ? (
//                       <span className="text-green-200 flex items-center">
//                         <svg
//                           className="w-4 h-4 mr-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 15l7-7 7 7"
//                           />
//                         </svg>
//                         {Math.abs(stats.conversionRateChange)}% vs last month
//                       </span>
//                     ) : (
//                       <span className="text-red-200 flex items-center">
//                         <svg
//                           className="w-4 h-4 mr-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                         {Math.abs(stats.conversionRateChange)}% vs last month
//                       </span>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="p-3 bg-white bg-opacity-20 rounded-full">
//               <FaChartLine className="text-2xl" />
//             </div>
//           </div>
//           <div className="mt-4 flex items-center text-sm">
//             <span>Based on {stats.totalCourseEnquiries} enquiries</span>
//           </div>
//         </div>
//       </div>

//       {showTable === "enquiries" && (
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               All Course Enquiries
//             </h2>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   selectsStart
//                   startDate={startDate}
//                   endDate={endDate}
//                   placeholderText="Start Date"
//                   className="border rounded px-3 py-1 text-sm"
//                   dateFormat="yyyy-MM-dd"
//                 />
//                 <span>to</span>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   selectsEnd
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   placeholderText="End Date"
//                   className="border rounded px-3 py-1 text-sm"
//                   dateFormat="yyyy-MM-dd"
//                 />
//               </div>
//               <button
//                 onClick={() => handleDateFilter()}
//                 className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
//               >
//                 <FaFilter className="mr-1" />
//                 Filter
//               </button>
//               <button
//                 onClick={clearDateFilter}
//                 className="bg-gray-500 text-white px-3 py-1 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//           <div className="mb-4">
//             {startDate && endDate && (
//               <p className="text-sm text-gray-600">
//                 Showing {filteredEnquiries.length} enquiries from{" "}
//                 {startDate.toLocaleDateString()} to{" "}
//                 {endDate.toLocaleDateString()}
//               </p>
//             )}
//           </div>
//           <DataTable
//             columns={enquiryColumns}
//             data={filteredEnquiries}
//             pagination
//             highlightOnHover
//             responsive
//             className="border rounded-lg overflow-hidden"
//             noDataComponent={
//               <div className="p-4 text-gray-500">No enquiries found</div>
//             }
//           />
//         </div>
//       )}

//       {showTable === "contacts" && (
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             All Contact Enquiries
//           </h2>
//           <DataTable
//             columns={contactColumns}
//             data={filteredContacts}
//             pagination
//             highlightOnHover
//             responsive
//             className="border rounded-lg overflow-hidden"
//             noDataComponent={
//               <div className="p-4 text-gray-500">No contacts found</div>
//             }
//           />
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Recent Enquiries
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-lg font-medium text-gray-700 mb-3">
//               Course Enquiries (Last 5)
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Name
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Course
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {enquiries
//                     .slice()
//                     .reverse()
//                     .slice(0, 5)
//                     .map((enquiry, index) => (
//                       <tr key={`enquiry-${index}`}>
//                         <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {enquiry.name || "-"}
//                         </td>
//                         <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                           {enquiry?.productId?.Coursename || "-"}
//                         </td>
//                         <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                           {enquiry.createdAt
//                             ? new Date(enquiry.createdAt).toLocaleDateString()
//                             : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-medium text-gray-700 mb-3">
//               Contact Enquiries (Last 5)
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Name
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Email
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {contacts
//                     .slice()
//                     .reverse()
//                     .slice(0, 5)
//                     .map((contact, index) => (
//                       <tr key={`contact-${index}`}>
//                         <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {contact.name || "-"}
//                         </td>
//                         <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                           {contact.email || "-"}
//                         </td>
//                         <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                           {contact.createdAt
//                             ? new Date(contact.createdAt).toLocaleDateString()
//                             : "-"}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import {
  FaGraduationCap,
  FaEnvelope,
  FaUsers,
  FaChartLine,
  FaFilter,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourseEnquiries: 0,
    totalContactEnquiries: 0,
    todayEnquiries: 0,
    conversionRate: 0,
    conversionRateChange: 0,
  });
  const [enquiries, setEnquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactsSyllabus, setContactsSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(null);
  const [todayDate] = useState(new Date().toISOString().split("T")[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const getMonthData = (data, monthOffset = 0) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.setMonth(currentDate.getMonth() - monthOffset)
    );

    return data.filter((item) => {
      if (!item.createdAt) return false;
      const enquiryDate = new Date(item.createdAt);
      return (
        enquiryDate.getMonth() === targetDate.getMonth() &&
        enquiryDate.getFullYear() === targetDate.getFullYear()
      );
    });
  };

  const calculateConversionRate = (data) => {
    const converted = data.filter((item) => item.status === "converted").length;
    return data.length > 0 ? Math.round((converted / data.length) * 100) : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enquiriesData, contactsData, syllabusData] = await Promise.all([
          fetchEnquiries(),
          fetchContacts(),
          fetchContactsSyllabus(),
        ]);

        const today = new Date().toISOString().split("T")[0];

        const todayEnqs = enquiriesData.filter(
          (enquiry) =>
            enquiry.createdAt && enquiry.createdAt.split("T")[0] === today
        ).length;

        const todayContacts = contactsData.filter(
          (contact) =>
            contact.createdAt && contact.createdAt.split("T")[0] === today
        ).length;

        const todaySyllabus = syllabusData.filter(
          (contact) =>
            contact.createdAt && contact.createdAt.split("T")[0] === today
        ).length;

        const overallConversionRate = calculateConversionRate(enquiriesData);

        const currentMonthData = getMonthData(enquiriesData, 0);
        const previousMonthData = getMonthData(enquiriesData, 1);

        const currentMonthConversionRate =
          calculateConversionRate(currentMonthData);
        const previousMonthConversionRate =
          calculateConversionRate(previousMonthData);

        let percentageChange = 0;
        if (previousMonthConversionRate > 0) {
          percentageChange =
            ((currentMonthConversionRate - previousMonthConversionRate) /
              previousMonthConversionRate) *
            100;
        } else if (currentMonthConversionRate > 0) {
          percentageChange = 100;
        }

        setStats({
          totalCourseEnquiries: enquiriesData.length,
          totalContactEnquiries: contactsData.length + syllabusData.length,
          todayEnquiries: todayEnqs + todayContacts + todaySyllabus,
          conversionRate: overallConversionRate,
          conversionRateChange: Math.round(percentageChange),
        });

        setEnquiries(enquiriesData);
        setContacts(contactsData);
        setContactsSyllabus(syllabusData);
        setFilteredEnquiries([...enquiriesData].reverse());
        setFilteredContacts([...contactsData, ...syllabusData].reverse());
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = enquiries.filter((enquiry) => {
        if (!enquiry.createdAt) return false;
        const enquiryDate = new Date(enquiry.createdAt);
        return enquiryDate >= startDate && enquiryDate <= endDate;
      });
      setFilteredEnquiries(filtered);
    } else {
      setFilteredEnquiries([...enquiries].reverse());
    }
  }, [startDate, endDate, enquiries]);

  const fetchEnquiries = async () => {
    const response = await fetch("http://localhost:8000/enroll/alldisplay");
    if (!response.ok) {
      throw new Error("Failed to fetch enquiries");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  };

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:8000/contact/allcontact");
    if (!response.ok) throw new Error("Failed to fetch contacts");
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  };

  const fetchContactsSyllabus = async () => {
    const response = await fetch("http://localhost:8000/register/allcontact");
    if (!response.ok) throw new Error("Failed to fetch contacts");
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  };

  const enquiryColumns = [
    {
      name: "Name",
      selector: (row) => row.name || "-",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.name || "-"}</span>,
    },
    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-blue-600 hover:underline"
        >
          {row.email || "-"}
        </a>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "-",
      cell: (row) => (
        <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
          {row.phone || "-"}
        </a>
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row?.productId?.Coursename || "-",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || "new",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "converted"
              ? "bg-green-100 text-green-800"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.status || "new"}
        </span>
      ),
    },
  ];

  const contactColumns = [
    {
      name: "Name",
      selector: (row) => row.name || "-",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.name || "-"}</span>,
    },
    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-blue-600 hover:underline"
        >
          {row.email || "-"}
        </a>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "-",
      cell: (row) => (
        <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
          {row.phone || "-"}
        </a>
      ),
    },
    {
      name: "Message",
      selector: (row) => row.message || "-",
      cell: (row) => (
        <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">
          {row.message || "-"}
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
      sortable: true,
    },
  ];

  const handleCardClick = (type) => {
    setShowTable(showTable === type ? null : type);
  };

  const handleDateFilter = () => {
    if (startDate && endDate) {
      const filtered = enquiries.filter((enquiry) => {
        if (!enquiry.createdAt) return false;
        const enquiryDate = new Date(enquiry.createdAt);
        return enquiryDate >= startDate && enquiryDate <= endDate;
      });
      setFilteredEnquiries(filtered);
    }
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredEnquiries([...enquiries].reverse());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleCardClick("enquiries")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">
                Total Course Enquiries
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.totalCourseEnquiries}
              </h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaGraduationCap className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="mr-1" />
            <span>Click to view all</span>
          </div>
        </div>

        <div
          className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleCardClick("contacts")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">
                Total Contact Enquiries
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.totalContactEnquiries}
              </h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaEnvelope className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="mr-1" />
            <span>Click to view all</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">
                Today's Enquiries
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.todayEnquiries}
              </h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaUsers className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="mr-1" />
            <span>As of {todayDate}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-lime-400 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">Conversion Rate</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.conversionRate}%
              </h2>
              <div className="mt-2 flex items-center">
                {stats.conversionRateChange !== 0 && (
                  <>
                    {stats.conversionRateChange > 0 ? (
                      <span className="text-green-200 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                        {Math.abs(stats.conversionRateChange)}% vs last month
                      </span>
                    ) : (
                      <span className="text-red-200 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        {Math.abs(stats.conversionRateChange)}% vs last month
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaChartLine className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span>Based on {stats.totalCourseEnquiries} enquiries</span>
          </div>
        </div>
      </div>

      {showTable === "enquiries" && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              All Course Enquiries
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="border rounded px-3 py-1 text-sm"
                  dateFormat="yyyy-MM-dd"
                />
                <span>to</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="border rounded px-3 py-1 text-sm"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <button
                onClick={handleDateFilter}
                className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
              >
                <FaFilter className="mr-1" />
                Filter
              </button>
              <button
                onClick={clearDateFilter}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="mb-4">
            {startDate && endDate && (
              <p className="text-sm text-gray-600">
                Showing {filteredEnquiries.length} enquiries from{" "}
                {startDate.toLocaleDateString()} to{" "}
                {endDate.toLocaleDateString()}
              </p>
            )}
          </div>
          <DataTable
            columns={enquiryColumns}
            data={filteredEnquiries}
            pagination
            highlightOnHover
            responsive
            className="border rounded-lg overflow-hidden"
            noDataComponent={
              <div className="p-4 text-gray-500">No enquiries found</div>
            }
          />
        </div>
      )}

      {showTable === "contacts" && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Contact Enquiries
          </h2>
          <DataTable
            columns={contactColumns}
            data={filteredContacts}
            pagination
            highlightOnHover
            responsive
            className="border rounded-lg overflow-hidden"
            noDataComponent={
              <div className="p-4 text-gray-500">No contacts found</div>
            }
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Enquiries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Course Enquiries (Last 5)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Course
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enquiries
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((enquiry, index) => (
                      <tr key={`enquiry-${index}`}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {enquiry.name || "-"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {enquiry?.productId?.Coursename || "-"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {enquiry.createdAt
                            ? new Date(enquiry.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Contact Enquiries (Last 5)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...contacts, ...contactsSyllabus]
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((contact, index) => (
                      <tr key={`contact-${index}`}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contact.name || "-"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {contact.email || "-"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
