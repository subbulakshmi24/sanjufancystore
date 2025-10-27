import React from "react";
import "./About.css";
import abt from "../img/san1.jpg";
import "animate.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container animate__animated animate__fadeInUp">
        {/* Left - Image */}
        <div className="about-image-wrapper">
          <img
            src={abt}
            alt="Sanju's Fancy Store"
            className="about-img animate__animated animate__zoomIn"
          />
        </div>

        {/* Right - Text */}
        <div className="about-text animate__animated animate__fadeInRight">
          <h2>About Sanju’s Fancy Store</h2>
          <p>
            Welcome to <strong>Sanju’s Fancy Store</strong> — where elegance meets charm.
            Our journey began with a dream to bring stylish, handpicked products
            that add a touch of magic to everyday life.
          </p>
          <p>
            Founded in 2023, we started as a small local shop and have grown into a
            trusted name loved by our customers. We believe fashion should be{" "}
            <em>affordable, elegant, and timeless</em>.
          </p>
          <p>
            We carefully select each product to reflect beauty, quality, and uniqueness.
            Our customers are at the heart of everything we do.
          </p>
        </div>
      </div>

      {/* Extra Info Sections */}
      <div className="about-cards">
        <div className="card animate__animated animate__fadeInUp">
          <h3>🎯 Our Vision</h3>
          <p>
            To inspire confidence and style in everyone with elegant, affordable, 
            and unique collections.
          </p>
        </div>

        <div className="card animate__animated animate__fadeInUp animate__delay-1s">
          <h3>🌟 Our Mission</h3>
          <p>
            To deliver premium quality accessories and lifestyle products that
            bring joy to your everyday moments.
          </p>
        </div>

        <div className="card animate__animated animate__fadeInUp animate__delay-2s">
          <h3>💎 Why Choose Us?</h3>
          <ul>
            <li>✔️ Premium Quality Products</li>
            <li>✔️ Affordable Pricing</li>
            <li>✔️ Trendy & Elegant Designs</li>
            <li>✔️ Customer First Service</li>
          </ul>
        </div>
      </div>

      {/* Tagline Box */}
      <div className="about-quote animate__animated animate__fadeIn">
        <p>✨ “Fashion is not just what you wear — it's how you express yourself.” ✨</p>
      </div>
    </div>
  );
};

export default About;
