 
// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingBag, Search, Menu, X } from "lucide-react";
// import { CartContext } from "./CartContext"; 
// import cake from "../Asset/c1.png";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();
//   const { cart } = useContext(CartContext) || { cart: [] };  

//   // Calculate total item count (sum of quantities)
//   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setSearchResults([]);
//       return;
//     }

//     const fetchSearchResults = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://cakees.onrender.com/api/dessert/list?search=${encodeURIComponent(searchQuery)}`
//         );
//         if (Array.isArray(response.data.data)) {
//           setSearchResults(response.data.data);
//         } else {
//           setSearchResults([]);
//         }
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//         setSearchResults([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounce = setTimeout(fetchSearchResults, 300); // Debounce to avoid rapid API calls
//     return () => clearTimeout(debounce);
//   }, [searchQuery]);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

 

//   const handleHome = (e) => {
//     e.preventDefault();
//     setMenuOpen(false);
//     navigate("/");
//     setTimeout(() => scrollToSection("Home"), 10);
//   };

//   const handleAboutClick = (e) => {
//     e.preventDefault();
//     setMenuOpen(false);
//     navigate("/");
//     setTimeout(() => scrollToSection("about"), 0);
//   };

//   const handleContactClick = (e) => {
//     e.preventDefault();
//     setMenuOpen(false);
//     navigate("/");
//     setTimeout(() => scrollToSection("contact"), 0);
//   };

//   return (
//     <nav className="bg-white py-4 shadow-sm fixed w-full top-0 z-50">
//       <div className="container justify-around mx-auto flex items-center">
//         <Link to="/" className="flex gap-3">
//           <img src={cake} alt="Cake'es Logo" className="h-8 w-8" />
//           <span className="text-2xl font-fntprimary">Cake'es</span>
//         </Link>
//         <div className="hidden md:flex gap-8 font-fntprimary text-xl">
//           <Link to="/" onClick={handleHome} className="hover:text-pink-500 transition-colors">
//             Home
//           </Link>
//           <Link to="/Menu" className="hover:text-pink-500 transition-colors">
//             Menu
//           </Link>
//           <Link to="/" onClick={handleAboutClick} className="hover:text-pink-500 transition-colors">
//             About
//           </Link>
//           <Link to="/" onClick={handleContactClick} className="hover:text-pink-500 transition-colors">
//             Contact
//           </Link>
//           <Link to="/Login" className="hover:text-pink-500 transition-colors">
//             Admin
//           </Link>
//         </div>
//         <div className="flex justify-end items-center gap-2">
//           <Link to="/cart" className="p-2 hover:bg-pink-50 rounded-full transition-colors relative">
//             <ShoppingBag className="h-5 w-5 text-gray-600 hover:text-pink-500" />
//             {cartItemCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartItemCount}
//               </span>
//             )}
//           </Link>
//           <button className="p-2 hover:bg-pink-50 rounded-full transition-colors">
//             <Search className="h-5 w-5 text-gray-600 hover:text-pink-500" />
//           </button>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden p-2 rounded-full transition-colors"
//           >
//             {menuOpen ? (
//               <X className="h-6 w-6 text-gray-600" />
//             ) : (
//               <Menu className="h-6 w-6 text-gray-600" />
//             )}
//           </button>
//         </div>
//       </div>
//       {menuOpen && (
//         <div className="md:hidden bg-white w-full py-4 shadow-md justify-center">
//           <div className="flex flex-col items-center gap-4 font-fntprimary text-xl">
//             <Link to="/" onClick={handleHome} className="hover:text-pink-500 transition-colors">
//               Home
//             </Link>
//             <Link to="/Menu" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">
//               Menu
//             </Link>
//             <Link to="/" onClick={handleAboutClick} className="hover:text-pink-500 transition-colors">
//               About
//             </Link>
//             <Link to="/" onClick={handleContactClick} className="hover:text-pink-500 transition-colors">
//               Contact
//             </Link>
//             <Link to="/Login" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">
//               Admin
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { CartContext } from "./CartContext";
import axios from "axios";
import cake from "../Asset/c1.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext) || { cart: [] };

  // Calculate total item count (sum of quantities)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Fetch search results when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://cakees.onrender.com/api/dessert/list?search=${encodeURIComponent(searchQuery)}`
        );
        if (Array.isArray(response.data.data)) {
          setSearchResults(response.data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 300); // Debounce to avoid rapid API calls
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHome = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    setSearchOpen(false);
    navigate("/");
    setTimeout(() => scrollToSection("Home"), 10);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    setSearchOpen(false);
    navigate("/");
    setTimeout(() => scrollToSection("about"), 0);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    setSearchOpen(false);
    navigate("/");
    setTimeout(() => scrollToSection("contact"), 0);
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleResultClick = (productName) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/menu?category=${encodeURIComponent(productName)}`);
  };

  return (
    <nav className="bg-white py-4 shadow-sm fixed w-full top-0 z-50">
      <div className="container justify-around mx-auto flex items-center">
        <Link to="/" className="flex gap-3">
          <img src={cake} alt="Cake'es Logo" className="h-8 w-8" />
          <span className="text-2xl font-fntprimary">Cake'es</span>
        </Link>
        <div className="hidden md:flex gap-8 font-fntprimary text-xl">
          <Link to="/" onClick={handleHome} className="hover:text-pink-500 transition-colors">
            Home
          </Link>
          <Link to="/Menu" className="hover:text-pink-500 transition-colors">
            Menu
          </Link>
          <Link to="/" onClick={handleAboutClick} className="hover:text-pink-500 transition-colors">
            About
          </Link>
          <Link to="/" onClick={handleContactClick} className="hover:text-pink-500 transition-colors">
            Contact
          </Link>
          <Link to="/Login" className="hover:text-pink-500 transition-colors">
            Admin
          </Link>
        </div>
        <div className="flex justify-end items-center gap-2">
          <Link to="/cart" className="p-2 hover:bg-pink-50 rounded-full transition-colors relative">
            <ShoppingBag className="h-5 w-5 text-gray-600 hover:text-pink-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={handleSearchClick}
            className="p-2 hover:bg-pink-50 rounded-full transition-colors"
          >
            <Search className="h-5 w-5 text-gray-600 hover:text-pink-500" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full transition-colors"
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="bg-white w-full py-4 shadow-md">
          <div className="container mx-auto px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for cakes..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Search for cakes"
            />
            {loading && (
              <div className="mt-2 flex items-center gap-2">
                <div className="loader"></div>
                <span className="text-gray-600">Searching...</span>
              </div>
            )}
            {searchResults.length > 0 && !loading && (
              <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                {searchResults.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleResultClick(product.name)}
                    className="p-3 hover:bg-pink-50 cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={product.mainImage || "/placeholder-image.png"}
                      alt={product.name}
                      className="h-10 w-10 object-cover rounded"
                      onError={(e) => (e.target.src = "/placeholder-image.png")}
                    />
                    <span className="text-gray-800">{product.name}</span>
                  </li>
                ))}
              </ul>
            )}
            {!loading && searchQuery && searchResults.length === 0 && (
              <div className="mt-2 text-gray-600">No results found.</div>
            )}
          </div>
        </div>
      )}
      {menuOpen && (
        <div className="md:hidden bg-white w-full py-4 shadow-md justify-center">
          <div className="flex flex-col items-center gap-4 font-fntprimary text-xl">
            <Link to="/" onClick={handleHome} className="hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link to="/Menu" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">
              Menu
            </Link>
            <Link to="/" onClick={handleAboutClick} className="hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link to="/" onClick={handleContactClick} className="hover:text-pink-500 transition-colors">
              Contact
            </Link>
            <Link to="/Login" onClick={() => setMenuOpen(false)} className="hover:text-pink-500 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}