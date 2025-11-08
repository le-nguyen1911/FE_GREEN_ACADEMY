import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icon mũi tên
import slider1 from "../assets/Slider1.png";
import slider2 from "../assets/Slider2.png";
import slider3 from "../assets/Slider3.png";

const slides = [
  { id: 1, image: slider1, title: "Tai Nghe" },
  { id: 2, image: slider2, title: "Bàn Phím" },
  { id: 3, image: slider3, title: "Màn Hình" },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(
    window.innerWidth >= 992 ? 3 : 1
  );

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth >= 992 ? 3 : 1);
      setCurrent(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(slides.length - slidesPerView, 0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => setCurrent((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full overflow-hidden ">
      {/* Tiêu đề */}
      <div className="mt-16 flex justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            DANH MỤC NỔI BẬT
          </h1>
          <hr className="w-1/2 h-1 bg-[#8c52ff] border-0" />
        </div>
      </div>

      {/* Slider wrapper */}
      <div className="relative mt-10">
        <div
          className="flex transition-transform duration-500 gap-2"
          style={{
            transform: `translateX(-${current * (100 / slidesPerView)}%)`,
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className=" relative flex-shrink-0 w-full lg:w-1/3 ">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[700px] object-contain rounded-lg"
              />
   
            </div>
          ))}
        </div>

        {/* Prev button */}
        <button
          onClick={prevSlide}
          disabled={current === 0}
          className="absolute top-1/2 left-3 -translate-y-1/2 
                     w-10 h-10 md:w-12 md:h-12 flex items-center justify-center 
                     rounded-full bg-black/40 text-white 
                     hover:bg-black/60 transition disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          disabled={current === maxIndex}
          className="absolute top-1/2 right-3 -translate-y-1/2 
                     w-10 h-10 md:w-12 md:h-12 flex items-center justify-center 
                     rounded-full bg-black/40 text-white 
                     hover:bg-black/60 transition disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-5 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-[#8c52ff]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
