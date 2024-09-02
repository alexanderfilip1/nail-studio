import React, { useEffect, useState } from "react";
import "../assets/css/GallerySection.css";
export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([]);

  const getGalleryImages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/gallery");
      const body = await response.json();
      setGalleryImages(body);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  return (
    <section className="gallery__section container">
      <h1 className="gallery__section--title">Portfolio Gallery</h1>
      <ul className="gallery-grid fadeIn">
        {galleryImages.map((image) => (
          <li key={image.id} className="gallery-item">
            <img
              src={`http://localhost:3000${image.link}`}
              loading="lazy"
              alt={image.image_description}
              className="gallery-image"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
