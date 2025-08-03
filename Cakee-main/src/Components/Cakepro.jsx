 
 
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CartContext } from './CartContext';
import './Cakepro.css';
import { CiShoppingCart } from 'react-icons/ci';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cakepro() {
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, cart } = useContext(CartContext);

  // Debug: Log cart state to verify updates
  useEffect(() => {
    console.log('Current cart state:', cart);
  }, [cart]);

  // Get category from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching menu items...');

        const response = await axios.get('https://cakeesbackend.onrender.com/api/dessert/list');
        console.log('Response data:', response.data);

        if (Array.isArray(response.data.data)) {
          setCakes(response.data.data);
          setLoading(false);

        } else {
          throw new Error('Invalid data format from API');
        }
        
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to fetch menu items. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    
  } , []);


  useEffect(() => {
    if (selectedCategory) {
      const filtered = cakes.filter(
        (cake) =>
          cake.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          cake.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredCakes(filtered);
    } else {
      setFilteredCakes(cakes);
    }
  }, [cakes, selectedCategory]);

  const handleAddToCart = (item) => {
    if (addToCart) {
      const cartItem = {
        id: item._id,
        name: item.name,
        price: item.price,
        mainImage: item.mainImage,
      };
      try {
        addToCart(cartItem);
        toast.success(`${item.name} added to cart!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        // Debug: Log the item being added
        console.log('Added to cart:', cartItem);
      } catch (err) {
        console.error('Error adding to cart:', err);
        toast.error('Failed to add item to cart.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } else {
      console.error('addToCart is not available');
      toast.error('Unable to add to cart. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const isItemInCart = (itemId) => {
    // Debug: Log itemId and cart for comparison
    console.log('Checking if item is in cart:', { itemId, cart });
    const isInCart = cart.some((cartItem) => {
      const match = String(cartItem.id) === String(itemId);
      console.log(`Comparing ${cartItem.id} === ${itemId}: ${match}`);
      return match;
    });
    console.log('isItemInCart result:', isInCart);
    return isInCart;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="loader"></div>
        <p className="ml-4 text-lg text-gray-600">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600">{error}</p>
        <button
          className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-md"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-fntprimary mt-5">
          {selectedCategory ? `${selectedCategory} Menu` : 'Our Menu'}
        </h1>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y:  0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-min ml-auto mr-auto"
        >
          {filteredCakes.length > 0 ? (
            filteredCakes.map((item) => (
              <div
                key={item._id}
                className="menu-card bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 w-10/12 sm:w-full sm:h-full justify-center mx-auto"
              >
                <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                  <img
                    src={item.mainImage || '/placeholder-image.png'}
                    alt={item.name || 'Menu Item'}
                    className="menu-img hover:scale-110 transition-all duration-500 w-8/12 sm:w-full object-cover rounded-t-2xl mx-auto"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </div>

                <div className="p-6 flex-grow">
                  <p className="text-xl font-serif italic text-pink-600 leading-relaxed">
                    {item.name || 'Unnamed Item'}
                  </p>
                </div>

                <div className="px-6 pb-6 flex gap-4">
                  <button
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className={`text-2xl rounded-xl ${
                      isItemInCart(item._id)
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:text-pink-700'
                    }`}
                    onClick={() => !isItemInCart(item._id) && handleAddToCart(item)}
                    disabled={isItemInCart(item._id)}
                    title={isItemInCart(item._id) ? 'Already in cart' : 'Add to cart'}
                  >
                    <CiShoppingCart />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No {selectedCategory} items found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Cakepro;