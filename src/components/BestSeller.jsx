import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdata } from "../redux/productSlice";
import Productitem from "./Productitem";

const BestSeller = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (status === "idle") {
      dispatch(getdata());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Lỗi: {error}</p>
    );
  }

  return (
    <div className="mt-32 ">
      {/* Title */}
      <div className="mt-16 flex justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">BESTSELLERS</h1>
          <hr className="w-1/2 h-1 bg-[#8c52ff] border-0" />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4 md:px-10">
        {products
          .filter((item) => item.bestseller).slice(0,8)
          .map((item) => (
            <Productitem key={item.id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
