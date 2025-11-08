import React from "react";
import banner from "../assets/banner.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      navigate("/productPage");
    }, 500);
  };

  return (
    <div className="relative w-full h-auto min-h-[80vh] mt-36 bg-[#000123] flex items-center justify-center">
      <div
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] 
                      flex flex-col md:flex-row items-center justify-between h-full gap-10 p-3"
      >
        {/* Text bên trái */}
        <div className="text-white max-w-lg text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Chào mừng đến với
          </h1>
          <h1 className="text-[#8c52ff] py-3 text-3xl md:text-5xl font-bold mb-4">
            TECH ZONE
          </h1>
          <p className="text-gray-300 mb-6 text-sm md:text-base">
            Nơi công nghệ hội tụ, mang đến cho bạn những sản phẩm mới nhất.
          </p>
          <button
            onClick={scrollToTop}
            className="px-6 py-3 bg-[#8c52ff] hover:bg-[#6b39cd] rounded-3xl font-semibold transition"
          >
            Mua Ngay
          </button>
        </div>

        {/* Banner bên phải */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={banner}
            alt="Tech Zone Banner"
            className="max-h-[50vh] md:max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
