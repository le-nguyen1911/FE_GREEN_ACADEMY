import React from "react";
import dm1 from "../assets/dm1.png";
import dm2 from "../assets/dm2.png";
import { useNavigate } from "react-router-dom";

const Featuredcategories = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-wrap gap-5 justify-center mt-5">
        {/* Card 1 */}
        <div
          className="relative w-full sm:w-3/4 md:w-[500px] h-[250px] flex flex-col items-end justify-center
                        bg-gray-100 rounded-lg shadow overflow-hidden"
        >
          <img
            src={dm1}
            alt="HOT TREND 2025"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-5"></div>

          <div className="relative z-6 flex flex-col items-end p-5 font-mono ">
            <h1 className="text-2xl md:text-3xl font-bold text-[#b08bfa]">
              HOT TREND 2025
            </h1>
            <p className="text-white text-base md:text-lg mt-2">
              Chìm đắm trong thế giới công nghệ
            </p>
            <button
              onClick={() => navigate("/product")}
              className="mt-4 px-6 py-3 bg-[#8c52ff] text-white rounded-3xl font-semibold
                         transition hover:bg-[#6b39cd]"
            >
              Trải Nghiệm Ngay
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="relative w-full sm:w-3/4 md:w-[500px] h-[250px] flex flex-col items-end justify-center
                        bg-gray-100 rounded-lg shadow overflow-hidden"
        >
          <img
            src={dm2}
            alt="SẢN PHẨM BÁN CHẠY"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-5"></div>

          <div className="relative z-6 flex flex-col items-end p-5">
            <h1 className="text-2xl md:text-3xl font-bold text-[#b08bfa]">
              SẢN PHẨM BÁN CHẠY
            </h1>
            <p className="text-white text-base md:text-lg mt-2">
              Thiết kế gaming chuẩn Esport, hiệu năng vượt trội
            </p>
            <button
              onClick={() => navigate("/product")}
              className="mt-4 px-6 py-3 bg-[#8c52ff] text-white rounded-3xl font-semibold
                         transition hover:bg-[#6b39cd]"
            >
              Sở Hữu Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featuredcategories;
