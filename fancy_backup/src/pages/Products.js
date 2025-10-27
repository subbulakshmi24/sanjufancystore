import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux
import { useAuth } from "../context/AuthContext";       // Auth
import { addToCart } from "../redux/cartSlice";         // Redux action
import products from "../components/Const";            // Product data
import "./Products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth(); // Access logged-in user
  const cart = useSelector((state) => state.cart.items); // Access cart items

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
    navigate("/cart"); // optional redirect
  };

  return (
    <div className="product-container">
      <h2 className="section-title">✨ Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <p className="description">{product.description}</p>
            <button
              className="buy-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
