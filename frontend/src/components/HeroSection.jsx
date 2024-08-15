import React from "react";
import "../assets/css/HeroSection.css";

export default function HeroSection() {
  return (
    <>
      <section className="hero__section container bgBeige">
        <article className="hero__section--article">
          <div className="article__left--image fadeInDown">
            <picture>
              <source
                srcSet="https://cdn-imgs.dora.run/design/IWn81g8xKUNK87Z6fevZwh.webp/w/1024/h/1024/format/webp? 1024w,
                        https://cdn-imgs.dora.run/design/IWn81g8xKUNK87Z6fevZwh.webp/w/2048/h/2048/format/webp? 2048w,
                        https://cdn-imgs.dora.run/design/IWn81g8xKUNK87Z6fevZwh.webp/w/4096/h/4096/format/webp? 4096w"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn-imgs.dora.run/design/IWn81g8xKUNK87Z6fevZwh.jpg"
                alt=""
                className="img"
              />
            </picture>
            <picture>
              <source
                srcSet="https://cdn-imgs.dora.run/design/GFE2WgyPBY0Hy1joWNLjiZ.webp/w/1024/h/1024/format/webp? 1024w,
                        https://cdn-imgs.dora.run/design/GFE2WgyPBY0Hy1joWNLjiZ.webp/w/2048/h/2048/format/webp? 2048w,
                        https://cdn-imgs.dora.run/design/GFE2WgyPBY0Hy1joWNLjiZ.webp/w/4096/h/4096/format/webp? 4096w"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                type="image/webp"
              />
              <img
                src="https://cdn-imgs.dora.run/design/GFE2WgyPBY0Hy1joWNLjiZ.jpg"
                alt=""
                className="img"
              />
            </picture>
          </div>
          <div className="article__main--content">
            <h1 className="article__main--title">Welcome to Our Nail</h1>
            <p>
              Discover the Artistry of Our Talented Nail Designers. Explore
              their stunning creations and book your appointment today!
            </p>
          </div>
          <div className="article__right--image">
            <picture>
              <source
                srcSet="https://cdn-imgs.dora.run/design/EbbT7TfzwlEJ15iioHkXzQ.webp/w/1024/h/1024/format/webp? 1024w,
                        https://cdn-imgs.dora.run/design/EbbT7TfzwlEJ15iioHkXzQ.webp/w/2048/h/2048/format/webp? 2048w,
                        https://cdn-imgs.dora.run/design/EbbT7TfzwlEJ15iioHkXzQ.webp/w/4096/h/4096/format/webp? 4096w"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn-imgs.dora.run/design/EbbT7TfzwlEJ15iioHkXzQ.jpg"
                alt=""
                className="img fadeInDown"
              />
            </picture>
          </div>
        </article>
      </section>
    </>
  );
}
