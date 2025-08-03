// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function Breadcrumbs() {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   return (
//     <nav className="text-sm mb-4">
//       <ul className="flex items-center gap-2 text-gray-600">
//         <li>
//           <Link to="/" className="text-blue-500 hover:underline">
//             Home
//           </Link>
//         </li>
//         {pathnames.map((name, index) => {
//           const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//           const isLast = index === pathnames.length - 1;

//           return (
//             <React.Fragment key={to}>
//               <li>/</li>
//               <li>
//                 {isLast ? (
//                   <span className="text-gray-700 capitalize">{name}</span>
//                 ) : (
//                   <Link to={"/Menu"} className="text-blue-500 hover:underline capitalize">
//                     {name}
//                   </Link>
//                 )}
//               </li>
//             </React.Fragment>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

// export default Breadcrumbs;


// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// function Breadcrumbs() {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   const [productNames, setProductNames] = useState({}); // To store product names

//   useEffect(() => {
//     const fetchProductNames = async () => {
//       const namesMap = {}; // Temporary object to store fetched names
//       const idRegex = /^[0-9a-fA-F]{24}$/; // Check if the segment is an ObjectId (24-char hex)

//       for (const segment of pathnames) {
//         if (idRegex.test(segment)) {
//           try {
//             const response = await fetch(`/api/products/${segment}`);
//             if (response.ok) {
//               const data = await response.json();
//               namesMap[segment] = data.name; // Assuming the response contains `{ name: "Product Name" }`
//             }
//           } catch (error) {
//             console.error(`Failed to fetch product name for id ${segment}:`, error);
//           }
//         }
//       }
//       setProductNames(namesMap);
//     };

//     fetchProductNames();
//   }, [pathnames]);

//   return (
//     <nav className="text-sm mb-4">
//       <ul className="flex items-center gap-2 text-gray-600">
//         <li>
//           <Link to="/" className="text-blue-500 hover:underline">
//             Home
//           </Link>
//         </li>
//         {pathnames.map((name, index) => {
//           const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//           const isLast = index === pathnames.length - 1;

//           const displayName = productNames[name] || name; // Use product name if available

//           return (
//             <React.Fragment key={to}>
//               <li>/</li>
//               <li>
//                 {isLast ? (
//                   <span className="text-gray-700 capitalize">{displayName}</span>
//                 ) : (
//                   <Link
//                     to={to}
//                     className="text-blue-500 hover:underline capitalize"
//                   >
//                     {displayName}
//                   </Link>
//                 )}
//               </li>
//             </React.Fragment>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

// export default Breadcrumbs;
