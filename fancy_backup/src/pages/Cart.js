import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Delete item
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  // Increment quantity
  const incrementCart = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  // Decrement quantity
  const decrementCart = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  // Calculate total
  const total = cartitems.reduce((sum, item) => {
    const price = Number(item.price.toString().replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  // Checkout
  const handleCheckout = async () => {
    if (cartitems.length === 0) return;
    setLoading(true);

    const payload = {
      items: cartitems,
      totalAmount: total,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Checkout success:", data);

      alert("Checkout successful!");
      dispatch(clearCart());
      navigate("/payment");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Buy Now button click
  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setShowBuyNow(true);
  };

  // Confirm order
  const confirmOrder = async () => {
    if (!customerDetails.name || !customerDetails.address || !customerDetails.city || !customerDetails.pincode) {
      alert("Please fill all details before confirming!");
      return;
    }

    setLoading(true);

    const payload = {
      item: selectedItem,
      customer: customerDetails,
      totalAmount: selectedItem.price,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Order confirmed:", data);

      alert("✅ Order placed successfully!");
      setShowBuyNow(false);
      dispatch(clearCart());
      navigate("/payment");
    } catch (error) {
      console.error("Order confirmation error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cart-section container py-4">
      <h4 className="cart-header mb-2">🛒 CART PRODUCTS</h4>
      <h6 className="cart-subheader mb-4">
        Grab our best products to brighten your day
      </h6>

      <div className="row">
        {/* Product List */}
        <div className="col-lg-8">
          <div className="row g-4">
            {cartitems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartitems.map((item) => {
                const price = Number(item.price.toString().replace(/[^0-9.-]+/g, ""));
                return (
                  <div className="col-md-6 col-lg-6" key={item.id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h6 className="card-title">{item.name}</h6>
                        <p className="card-text">₹{price.toLocaleString("en-IN")}</p>

                        {/* Quantity Controls */}
                        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                          <button
                            className="btn quantity-btn"
                            onClick={() => decrementCart(item.id, item.quantity)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn quantity-btn"
                            onClick={() => incrementCart(item.id, item.quantity)}
                          >
                            +
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => handleBuyNow(item)}
                          >
                            Buy Now
                          </button>
                          <button
                            className="btn btn-danger w-100"
                            onClick={() => deleteCart(item)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Cart Total Summary */}
        {cartitems.length > 0 && (
          <div className="col-lg-4">
            <div className="cart-total shadow-sm p-3">
              <h5>Total: ₹{total.toLocaleString("en-IN")}</h5>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Buy Now Popup */}
      {showBuyNow && selectedItem && (
        <div className="buy-now-popup">
          <div className="popup-content shadow p-4 rounded bg-white">
            <h5>🛍 Confirm Your Order</h5>
            <p><strong>Product:</strong> {selectedItem.name}</p>
            <p><strong>Price:</strong> {selectedItem.price}</p>

            <h6 className="mt-3">Customer Details</h6>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Full Name"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Address"
              value={customerDetails.address}
              onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="City"
              value={customerDetails.city}
              onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Pincode"
              value={customerDetails.pincode}
              onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={() => setShowBuyNow(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={confirmOrder} disabled={loading}>
                {loading ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
