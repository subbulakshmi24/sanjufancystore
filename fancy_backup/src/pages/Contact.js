import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7001/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("⭐ Review submitted successfully!");
        setFormData({ name: "", email: "", rating: "", review: "" });
      } else {
        toast.error("❌ Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠ Server error. Please check your backend.");
    }
  };

  return (
    <div className="review">
      <ToastContainer />
      <h2>Share Your Experience 💬</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select Rating ⭐</option>
          <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
          <option value="4">⭐⭐⭐⭐ - Good</option>
          <option value="3">⭐⭐⭐ - Average</option>
          <option value="2">⭐⭐ - Poor</option>
          <option value="1">⭐ - Very Bad</option>
        </select>

        <textarea
          name="review"
          placeholder="Write your review..."
          rows="5"
          value={formData.review}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Contact;
