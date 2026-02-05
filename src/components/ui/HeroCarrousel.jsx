import { useEffect, useState } from "react";
import '/src/styles/home.css'


const slides = [
    { image: "carousel-1.jpg" },
    { image: "carousel2.png", },
    { image: "carousel3.jpg", },
];

const HeroCarrousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000)
        return () => clearInterval(timer);
    }, [])

    return (
        <div className="hero-carousel">
            {slides.map((slide, index) => (
                <div key={index} className={`carousel-slide ${index === currentIndex ? "active" : "inactive"}`}>
                    <img src={slide.image} alt={slide.image} className="carousel-image"  draggable={false} />
                </div>
            ))}

            <div>
                {slides.map((_, index) => {
                    <button
                        key={index}
                        onClick={() => setCurretIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 touch-target flex items-center justify-center ${index === currentIndex
                                ? "w-5 bg-primary-foreground"
                                : "w-1.5 bg-primary-foreground/50"
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                })}
            </div>
        </div>
    )
};

export default HeroCarrousel; 