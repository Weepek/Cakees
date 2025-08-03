 
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";

// function ProductDetails() {
//     const { id } = useParams();
//     const [cake, setCake] = useState(null);
//     const [error, setError] = useState(null);
//     const [mainImage, setMainImage] = useState(""); 

//     useEffect(() => {
//         const fetchCake = async () => {
//             try {
//                 const response = await axios.get(`https://cakes-backend-xgbw.onrender.com/api/dessert/${id}`);
//                 setCake(response.data); // Assuming API sends cake object
//             } catch (err) {
//                 setError("Failed to fetch cake details.");
//             }
//         };
//         fetchCake();
//     }, [id]);

//     if (error) return <p>{error}</p>;
//     if (!cake) return <p>Loading cake details...</p>;

//     return (
//         <div className="container mx-auto mt-8">
//             <div className="flex flex-col md:flex-row items-center">
//                 <motion.img
//                     src={`https://cakes-backend-xgbw.onrender.com/upload/${cake.mainImage}`}
//                     alt={cake.name}
//                     className="rounded-xl shadow-md w-full md:w-1/2"
//                 />
//          <div className="flex-1 lg:mt-20">
//           <h1 className="text-xl text-pink-500">{cake.name}</h1>
//           <p className="text-lg text-gray-700 mb-4">{cake.description}</p>
//           <p className="text-xl font-semibold text-blue-500 mb-4">Price: ${cake.price}</p>
//           <p className="text-md text-gray-600 mb-2">Category: {cake.category}</p>

//           {/* Additional Images */}
//           <div className="flex gap-4 mt-4">
//             {cake.addImage1 && (
//               <img
//                 src={`https://cakes-backend-xgbw.onrender.com/upload/${cake.addImage1}`}
//                 alt="Additional view 1"
//                 className="w-20 h-20 object-cover rounded shadow-md cursor-pointer"
//                 onClick={() => setMainImage(cake.addImage1)}
//                  // Fallback for missing images
//               />
//             )}
//             {cake.addImage2 && (
//               <img
//                 src={`https://cakes-backend-xgbw.onrender.com/upload/${cake.addImage2}`}
//                 alt="Additional view 2"
//                 className="w-20 h-20 object-cover rounded shadow-md cursor-pointer"
//                 onClick={() => setMainImage(cake.addImage2)}
//               // Fallback for missing images
//               />
//             )}
//           </div>
//         </div>
                
//             </div>
//         </div>
//     );
// }

// export default ProductDetails;
