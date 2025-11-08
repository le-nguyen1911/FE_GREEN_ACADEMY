import React from "react";
import delivery from "../assets/delivery.png";
import money from '../assets/money-bag.png'
import offer from '../assets/offer.png'
import returnmn from '../assets/return-on-investment.png'
const Policy = () => {
  return (
    <div className="py-5">
      <ul className="grid grid-cols-2 lg:grid-cols-4 py-9 gap-6">
        <li className="flex items-center sm:text-sm border-r border-gray-300 px-5">
          <img src={delivery} alt="" className="w-14" />
          <h1 className="text-base font-bold mx-3">
            Giao hàng miễn phí
            <br />
            <span className=" text-gray-400 font-medium text- text-[16px]">
              Miễn phí vận chuyển cho tất cả các đơn hàng
            </span>
          </h1>
        </li>
        <li className="flex items-center sm:text-sm border-r-0 lg:border-r border-gray-300 px-5">
          <img src={money} alt="" className="w-14" />
          <h1 className="text-base font-bold mx-3">
            Hoàn tiền
           
            <br />
            <span className=" text-gray-400 font-medium text- text-[16px]">
              Đảm bảo hoàn tiền trong 7 ngày
            </span>
          </h1>
        </li>

        <li className="flex items-center sm:text-sm border-r border-gray-300 px-5">
          <img src={offer} alt="" className="w-14" />
          <h1 className="text-base font-bold mx-3">
            Giảm giá cho thành viên
            <br />
            <span className=" text-gray-400 font-medium text- text-[16px]">
              Đơn hàng trên 150.000 VND
            </span>
          </h1>
        </li>
        <li className="flex items-center sm:text-sm px-5">
          <img src={returnmn} alt="" className="w-14" />
          <h1 className="text-base font-bold mx-3">
            Chính sách hoàn trả
            <br />
            <span className=" text-gray-400 font-medium  text-[16px]">
              Hỗ trợ 24/7
            </span>
          </h1>
        </li>
      </ul>
    </div>
  );
};

export default Policy;
