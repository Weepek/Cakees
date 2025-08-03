 


// import React, { useState } from "react";
// import axios from "axios";

// function Addpage() {
//   const url = "http://localhost:5000";
//   const [formData, setFormData] = useState({
//     mainImage: null,
//     addImage1: null,
//     addImage2: null,
//     name: "",
//     description: "",
//     category: "Cake",
//     price: "",
//   });

//   // Handle changes for text inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle file inputs
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files[0], // Store only the first file for now
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.mainImage) {
//       alert("Please upload the main image.");
//       return;
//     }
  
//     if (!formData.name || !formData.description || !formData.price) {
//       alert("Please fill in all the fields.");
//       return;
//     }
  
//     const data = new FormData();
//     data.append("mainImage", formData.mainImage);
//     if (formData.addImage1) data.append("addImage1", formData.addImage1);
//     if (formData.addImage2) data.append("addImage2", formData.addImage2);
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("category", formData.category);
//     data.append("price", formData.price);
  
//     try {
//       const response = await axios.post(`${url}/api/dessert/add`, data);
//       if (response.data.success) {
//         alert("Cake added successfully!");
//         setFormData({
//           mainImage: null,
//           addImage1: null,
//           addImage2: null,
//           name: "",
//           description: "",
//           category: "Cake",
//           price: "",
//         });
//       } else {
//         alert(response.data.message || "Error adding cake");
//       }
//     } catch (error) {
//       console.error("Error adding cake:", error);
//       alert("An error occurred while adding the cake. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-pink-200">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-8 w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-16"
//       >
//         {/* Main Image Field */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="mainImage">Main Product Image</label>
//           <input
//             type="file"
//             id="mainImage"
//             name="mainImage"
//             onChange={handleFileChange}
//             className="p-2 border rounded-md"
//             required // Ensure main image is required
//           />
//         </div>

//         {/* Additional Images Field */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="addImage1">Additional Image 1</label>
//           <input
//             type="file"
//             id="addImage1"
//             name="addImage1"
//             onChange={handleFileChange}
//             className="p-2 border rounded-md"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="addImage2">Additional Image 2</label>
//           <input
//             type="file"
//             id="addImage2"
//             name="addImage2"
//             onChange={handleFileChange}
//             className="p-2 border rounded-md"
//           />
//         </div>

//         {/* Product Name Field */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="name">Product Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="p-2 border rounded-md"
//             required
//           />
//         </div>

//         {/* Product Description Field */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="description">Product Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="p-2 border rounded-md"
//             rows="4"
//             required
//           />
//         </div>

//         {/* Product Category Field */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="category">Product Category</label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="p-2 border rounded-md"
//           >
//             <option value="Croissant">Croissant</option>
//             <option value="Cheesecake">Cheesecake</option>
//             <option value="Cupcake">Cupcake</option>
//             <option value="Cake">Cake</option>
//           </select>
//         </div>

//         {/* Product Price Field */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="$20"
//             className="p-2 border rounded-md"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="mt-4 p-2 rounded-lg bg-blue-400 text-white"
//         >
//           Add Upload
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Addpage;

 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addpage() {
  const url = "http://localhost:5000";
  const [formData, setFormData] = useState({
    mainImage: null,
    addImage1: null,
    addImage2: null,
    name: "",
    description: "",
    category: "Cake",
    price: "",
  });
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await axios.get(`${url}/api/dessert/list`);
      setProducts(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to load products");
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Handle changes for text inputs (unchanged)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file inputs (unchanged)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Handle form submission (unchanged except for adding fetchProducts after success)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.mainImage) {
      alert("Please upload the main image.");
      return;
    }
  
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all the fields.");
      return;
    }
  
    const data = new FormData();
    data.append("mainImage", formData.mainImage);
    if (formData.addImage1) data.append("addImage1", formData.addImage1);
    if (formData.addImage2) data.append("addImage2", formData.addImage2);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
  
    try {
      const response = await axios.post(`${url}/api/dessert/add`, data);
      if (response.data.success) {
        toast.success("Cake added successfully!");
        setFormData({
          mainImage: null,
          addImage1: null,
          addImage2: null,
          name: "",
          description: "",
          category: "Cake",
          price: "",
        });
        fetchProducts(); // Refresh the product list
      } else {
        alert(response.data.message || "Error adding cake");
      }
    } catch (error) {
      console.error("Error adding cake:", error);
      alert("An error occurred while adding the cake. Please try again.");
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await axios.delete(`${url}/api/dessert/${id}`);
      if (response.data.success) {
        toast.success("Product deleted successfully");
        fetchProducts(); // Refresh the product list
      } else {
        toast.error(response.data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.error || "Failed to delete product");
    }
  }
};

  return (
    <div className="min-h-screen bg-pink-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Original Form (unchanged) */}
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="mainImage">Main Product Image</label>
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                onChange={handleFileChange}
                className="p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="addImage1">Additional Image 1</label>
              <input
                type="file"
                id="addImage1"
                name="addImage1"
                onChange={handleFileChange}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="addImage2">Additional Image 2</label>
              <input
                type="file"
                id="addImage2"
                name="addImage2"
                onChange={handleFileChange}
                className="p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border rounded-md"
                rows="4"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category">Product Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded-md"
              >
                <option value="Croissant">Croissant</option>
                <option value="Cheesecake">Cheesecake</option>
                <option value="Cupcake">Cupcake</option>
                <option value="Cake">Cake</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="$20"
                className="p-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Added Product Cards Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Current Products</h2>
          
          {loadingProducts ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.mainImage || "/placeholder-image.png"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/placeholder-image.png")}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-pink-600">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {products.length === 0 && !loadingProducts && (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addpage;