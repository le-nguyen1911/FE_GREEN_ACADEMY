import React from "react";
import { Link } from "react-router-dom";

const RelatedProduct = ({ rltprd }) => {
    const imgFirst = Array.isArray(rltprd.image) ? rltprd.image[0] : rltprd.image;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Link
            onClick={scrollToTop}
            to={`/product/${rltprd.id}`}
            className="group bg-white w-full rounded-2xl p-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-3">
                <img
                    src={imgFirst}
                    alt={rltprd.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <p className="text-center font-medium text-gray-800 text-sm sm:text-base line-clamp-2 flex-grow">
                {rltprd.name}
            </p>

            {rltprd.price && (
                <p className="text-center text-[#8c52ff] font-semibold mt-2">
                    {rltprd.price.toLocaleString("vi-VN")}₫
                </p>
            )}
        </Link>
    );
};

export default RelatedProduct;
