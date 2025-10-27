// src/pages/Gallery.js
import React from "react";
import "./Gallery.css";

import gal1 from "../img/gal1.jpg";
import ear from "../img/ear.png";
import clip from "../img/clip.png";
import bangle from "../img/bangle1.png";
import clutcher from "../img/clutcher.png";
import shoes from "../img/shoes.jpg";
import bindi from "../img/bindi.png";
import makeup from "../img/makeup kit.png";
import gal9 from "../img/gal9.jpg";
import keychain from "../img/keychain.png";
import regularchain from "../img/regularchain.webp";
import gal12 from "../img/gal12.webp";

const images = [
  gal1,
  ear,
  clip,
  bangle,
  clutcher,
  shoes,
  bindi,
  makeup,
  gal9,
  keychain,
  regularchain,
  gal12,
];

const Gallery = () => {
  return (
    <div className="gallery">
      <h2>Our Gallery</h2>

      <div className="carousel-container">
        <div className="carousel-track">
          {images.concat(images).map((img, index) => (
            <div className="carousel-slide" key={index}>
              <img src={img} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
