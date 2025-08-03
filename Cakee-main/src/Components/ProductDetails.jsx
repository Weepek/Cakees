
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { CartContext } from "./CartContext"; 
// import './Cakepro.css';
  

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     const controller = new AbortController();
//     let timeoutId;

//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/dessert/${id}`, {
//           signal: controller.signal,
//         });
//         if (response.data && typeof response.data === "object") {
//           setProduct(response.data);
//           setMainImage(response.data.mainImage || "");
//         } else {
//           throw new Error("Product not found.");
//         }
//       } catch (err) {
//         if (err.name === "AbortError") {
//           return;
//         }
//         setError(
//           err.response?.status === 404
//             ? "Product not found. It may have been removed."
//             : err.message === "Network Error"
//             ? "Network error. Please check your connection."
//             : "An unexpected error occurred."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     timeoutId = setTimeout(fetchProduct, 100);

//     return () => {
//       clearTimeout(timeoutId);
//       controller.abort();
//     };
//   }, [id]);

 
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="loader"></div>
//         <p className="ml-4 text-lg text-gray-600">Loading menu...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center">
//         <p className="text-red-600">{error}</p>
//         <button
//           className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-md"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   };

//   const additionalImages = [product.mainImage, product.addImage1, product.addImage2].filter(Boolean);
//   const maxDescriptionLength = 120;
//   const truncatedDescription =
//     product.description.length > maxDescriptionLength && !showFullDescription
//       ? product.description.slice(0, maxDescriptionLength) + "..."
//       : product.description;

//   const handleAddToCart = () => {
//     if (addToCart && product) {
//       addToCart({
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         mainImage: product.mainImage,
//       });
//       // alert(`${product.name} added to cart!`);
//     } else {
//       console.error("addToCart is not available or product is null", { addToCart, product });
//       alert("Unable to add to cart. Please try again later.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 mt-16 max-w-5xl">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         <div className="flex flex-col items-center">
//           <motion.img
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             src={mainImage || "/placeholder-image.png"}
//             alt={product.name || "Product"}
//             className="w-full max-w-md rounded-2xl shadow-lg object-cover"
//             onError={(e) => (e.target.src = "/placeholder-image.png")}
//           />
//           {additionalImages.length > 1 && (
//             <div className="flex gap-2 mt-4 flex-wrap justify-center">
//               {additionalImages.map((image, index) => (
//                 <motion.img
//                   key={index}
//                   src={image || "/placeholder-image.png"}
//                   alt={`Thumbnail ${index + 1}`}
//                   className={`w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity ${
//                     mainImage === image ? "ring-2 ring-pink-500" : ""
//                   }`}
//                   onClick={() => setMainImage(image)}
//                   whileHover={{ scale: 1.05 }}
//                   onError={(e) => (e.target.src = "/placeholder-image.png")}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col justify-center space-y-4">
//           <h1 className="text-3xl font-bold text-gray-800">{product.name || "Unnamed Product"}</h1>
//           <p className="text-xl font-semibold text-pink-500">
//             ${product.price ? product.price.toFixed(2) : "N/A"}
//           </p>
//           <p className="text-gray-600">
//             {truncatedDescription || "No description available."}
//             {product.description.length > maxDescriptionLength && (
//               <button
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//                 className="text-pink-500 hover:text-pink-600 font-medium ml-1"
//               >
//                 {showFullDescription ? "Show Less" : "Read More"}
//               </button>
//             )}
//           </p>
//           <p className="text-sm text-gray-500">
//             Category: {product.category || "Uncategorized"}
//           </p>
//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
//             >
//               Add to Cart
//             </button>
//             <Link to="/Menu" className="flex-1">
//               <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
//                 Back to Menu
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;



import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CartContext } from "./CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Cakepro.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart, cart } = useContext(CartContext);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dessert/${id}`, {
          signal: controller.signal,
        });

        if (!isMounted) return;

        // Handle both possible response structures
        const productData = response.data.data || response.data;
        
        if (!productData) {
          throw new Error("Invalid product data received");
        }

        setProduct(productData);
        setMainImage(productData.mainImage || "");
      } catch (err) {
        if (!isMounted) return;
        
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(
            err.response?.status === 404
              ? "Product not found. It may have been removed."
              : err.message === "Network Error"
              ? "Network error. Please check your connection."
              : "An unexpected error occurred."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  const isItemInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (isItemInCart(product._id)) {
      toast.info(`${product.name} is already in your cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (addToCart) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        mainImage: product.mainImage,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Unable to add to cart. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="loader"></div>
        <p className="ml-4 text-lg text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <div className="flex gap-4">
          <button
            className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          <button
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
            onClick={() => navigate('/menu')}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 text-lg mb-4">Product not found</p>
        <button
          className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition"
          onClick={() => navigate('/menu')}
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const additionalImages = [
    product.mainImage,
    product.addImage1,
    product.addImage2
  ].filter(Boolean);

  const maxDescriptionLength = 120;
  const truncatedDescription =
    product.description.length > maxDescriptionLength && !showFullDescription
      ? product.description.slice(0, maxDescriptionLength) + "..."
      : product.description;

  return (
    <div className="container mx-auto px-4 py-8 mt-16 max-w-5xl">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={mainImage || "/placeholder-image.png"}
            alt={product.name || "Product"}
            className="w-full max-w-md rounded-2xl shadow-lg object-cover aspect-square"
            onError={(e) => (e.target.src = "/placeholder-image.png")}
          />
          
          {additionalImages.length > 1 && (
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              {additionalImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image || "/placeholder-image.png"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity ${
                    mainImage === image ? "ring-2 ring-pink-500" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                  whileHover={{ scale: 1.05 }}
                  onError={(e) => (e.target.src = "/placeholder-image.png")}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          
          <p className="text-2xl font-semibold text-pink-600">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">
              {truncatedDescription}
              {product.description.length > maxDescriptionLength && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-pink-600 hover:text-pink-700 font-medium ml-2"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>
          
          <p className="text-sm text-gray-500">
            <span className="font-medium">Category:</span> {product.category}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={isItemInCart(product._id)}
              className={`flex-1 py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isItemInCart(product._id)
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 text-white focus:ring-pink-500"
              }`}
            >
              {isItemInCart(product._id) ? "Added to Cart" : "Add to Cart"}
            </button>
            
            <Link to="/menu" className="flex-1">
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Back to Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;