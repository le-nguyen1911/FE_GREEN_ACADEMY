import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiShowAlt } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import starticon from "../assets/star_icon.png";
import cart from "../assets/cart_icon.png";
import { addcart, getcart } from "../redux/cartSlice";

const Productitem = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.auth);

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
    };

    // 🛒 Thêm sản phẩm vào giỏ hàng
    const add_to_cart = async (product, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            navigate("/login");
            return;
        }

        try {
            await dispatch(
                addcart({
                    userId: currentUser.id,
                    itemcart: {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: Array.isArray(product.image)
                            ? product.image[0]
                            : product.image,
                        quantity: 1,
                    },
                })
            ).unwrap();

            dispatch(getcart(currentUser.id));

            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        } catch (err) {
            console.error("Lỗi thêm sản phẩm:", err);
        }
    };

    const productImage = Array.isArray(product.image)
        ? product.image[0]
        : product.image;

    return (
        <>
            {/* ✅ Thông báo thêm vào giỏ */}
            <div className="fixed bottom-5 right-5 z-50">
                <Collapse in={showAlert}>
                    <Alert severity="success" variant="filled">
                        Đã thêm vào giỏ hàng thành công!
                    </Alert>
                </Collapse>
            </div>

            {/* ✅ Thẻ sản phẩm */}
            <Link
                to={`/product/${product.id}`}
                className="group bg-white flex flex-col justify-between p-4 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-[300px] sm:max-w-none mx-auto"
            >
                {/* Ảnh sản phẩm */}
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
                    <img
                        src={productImage}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Icon hiển thị và yêu thích */}
                    <div className="absolute left-1/2 bottom-[-20px] flex gap-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300">
                        {/* Xem nhanh */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/product/${product.id}`);
                            }}
                            className="bg-white hover:bg-[#8c52ff] hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
                        >
                            <BiShowAlt className="h-5 w-5" />
                        </button>

                        {/* Yêu thích */}
                        <button
                            onClick={handleLike}
                            className={`rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-colors duration-300 ${
                                liked
                                    ? "bg-white text-red-500"
                                    : "bg-white text-gray-500 hover:bg-[#8c52ff] hover:text-white"
                            }`}
                        >
                            <FaHeart className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Tên sản phẩm */}
                <h3 className="mt-3 text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 text-center">
                    {product.name}
                </h3>

                {/* Đánh giá & tồn kho */}
                <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <img key={i} src={starticon} alt="star" className="h-4" />
                        ))}
                    </div>
                    <span className="text-gray-600 text-xs">
                        Tồn kho: {product.stock ?? 0}
                    </span>
                </div>

                {/* Giá + nút thêm giỏ */}
                <div className="flex justify-between items-center mt-2">
                    <p className="text-[#8c52ff] font-bold text-sm sm:text-base">
                        {product.price?.toLocaleString("vi-VN")}₫
                    </p>
                    <button
                        onClick={(e) => add_to_cart(product, e)}
                        className="p-1 hover:scale-110 transition-transform"
                    >
                        <img src={cart} alt="cart" className="h-6" />
                    </button>
                </div>
            </Link>
        </>
    );
};

export default Productitem;
