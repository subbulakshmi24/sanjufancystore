import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";
import "animate.css";

import handbag from "../img/handbag.jpg";
import sun from "../img/gal12.webp";
import jew from "../img/jew1.png";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Elegant Handbag", price: 1200, img: handbag || "https://via.placeholder.com/150" },
    { id: 2, name: "Trendy Sunglasses", price: 799, img: sun || "https://via.placeholder.com/150" },
    { id: 3, name: "Jewelry Set", price: 2500, img: jew || "https://via.placeholder.com/150" },
  ];

  const handlePurchase = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate__animated animate__fadeInDown">
          <h1>
            Welcome to <span>Sanju's Fancy Store</span>
          </h1>
          <p className="animate__animated animate__fadeInUp">
            “Little things that make life sparkle ✨”
          </p>
          <button
            className="shop-btn animate__animated animate__pulse animate__infinite"
            onClick={() => (!user ? navigate("/login") : navigate("/products"))}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2 className="animate__animated animate__fadeInUp">✨ Featured Products</h2>
        <p className="featured-subtitle">Handpicked collections just for you</p>
        <div className="product-list">
          {products.map((p) => (
            <div key={p.id} className="product-card animate__animated animate__zoomIn">
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button className="bt" onClick={() => handlePurchase(p)}>
                Purchase
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section">
        <h2>🌸 Discover More Sparkle</h2>
        <p>Stay trendy with our latest collection of fancy items.</p>
        <button
          className="explore-btn"
          onClick={() => (!user ? navigate("/login") : navigate("/products"))}
        >
          Explore More
        </button>
      </section>
    </div>
  );
};

export default Home;
