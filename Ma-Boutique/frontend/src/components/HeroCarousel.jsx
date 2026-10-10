import { useEffect, useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    title: "Bienvenue sur Sopenabi-Boutique",
    subtitle: "Mode, beauté, senteurs et saveurs — tout en un seul endroit.",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    title: "Collections exclusives",
    subtitle: "Découvrez nos nouveautés mode et accessoires tendance.",
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80",
    title: "Parfums d'exception",
    subtitle: "Encens, huiles et sprays aux senteurs envoûtantes.",
  },
];

export default function HeroCarousel({ children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-carousel">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url('${s.image}')` }}
        >
          <div className="hero-overlay">
            <h1 className="fade-in-up">{s.title}</h1>
            <p className="lead mt-3 fade-in-up">{s.subtitle}</p>
            {children}
          </div>
        </div>
      ))}

      {/* Indicateurs */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

      {/* Flèches */}
      <button
        className="hero-arrow hero-arrow-left"
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        className="hero-arrow hero-arrow-right"
        onClick={() => setIndex((index + 1) % slides.length)}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </section>
  );
}