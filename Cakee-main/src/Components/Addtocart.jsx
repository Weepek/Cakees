import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { CartContext } from "./CartContext";

function Addtocart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext) || {};
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Auto-close success popup after 2 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  if (!cart) {
    return (
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold mb-6 text-pink-500">Your Cart</h1>
        <div className="text-center">
          <p className="text-gray-600 mb-4">Error loading cart. Please try again.</p>
          <Link to="/Menu">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle clear cart by showing modal
  const handleClearCart = () => {
    setShowClearCartModal(true);
  };

  // Confirm clear cart action
  const confirmClearCart = () => {
    if (clearCart) {
      clearCart();
      setShowSuccessPopup(true); // Show success popup
    }
    setShowClearCartModal(false); // Close confirmation modal
  };

  // Cancel clear cart action
  const cancelClearCart = () => {
    setShowClearCartModal(false);
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-pink-500">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/Menu">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={item.mainImage || "/placeholder-image.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                  onError={(e) => (e.target.src = "/placeholder-image.png")}
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity && updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart && removeFromCart(item.id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border-t">
            <p className="text-xl font-semibold">
              Total: ${getTotalPrice ? getTotalPrice() : "0.00"}
            </p>
            <div className="mt-4 flex gap-4">
              <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cart Confirmation Modal */}
      {showClearCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Clear Cart</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to clear your cart?</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={cancelClearCart}
                className="px-4 py-2 bg-gray-200 text agregator-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                aria-label="Cancel clearing cart"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCart}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                aria-label="Confirm clearing cart"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup Card */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 bg-pink-500 text-white rounded-lg p-4 shadow-lg z-50 animate-fade-in-out">
          <p className="text-sm font-medium">Cart cleared successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Addtocart;