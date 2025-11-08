import React, { useState } from "react";
import { databtn } from "../data.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetcart } from "../redux/cartSlice.jsx";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { createOrders } from "../redux/ordersSlice.jsx";
import {UpdateProduct} from "../redux/productSlice.jsx";

const Payment = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.auth);

    const [btn, setBtn] = useState(databtn);
    const [showAlert, setShowAlert] = useState(false);

    const items = location.state?.items || [];
    const total = location.state?.total || 0;

    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const handlebtn = (name) => {
        const new_active = btn.map((item) =>
            item.name === name
                ? { ...item, isactive: true }
                : { ...item, isactive: false }
        );
        setBtn(new_active);
    };

    const handlepayment = async () => {
        if (!currentUser) {
            alert("Vui lòng đăng nhập để thanh toán!");
            navigate("/login");
            return;
        }

        if (!fullname || !address || !phone) {
            alert("Vui lòng nhập đầy đủ Họ tên, Địa chỉ và Số điện thoại!");
            return;
        }

        const selectedPayment = btn.find((item) => item.isactive)?.name || "Chưa chọn";

        const newOrder = {
            items,
            total,
            paymentMethod: selectedPayment,
            customerName: fullname,
            customerAddress: address,
            customerPhone: phone,
            note,
        };

        try {

            for (const item of items) {
                await dispatch(
                    UpdateProduct({
                        ...item,
                        stock: Math.max(0, item.stock - item.quantity),
                    })
                );
            }


            await dispatch(createOrders({ orderData: newOrder, userId: currentUser.id }));


            await dispatch(resetcart(currentUser.id));

            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate("/order");
            }, 1500);
        } catch (err) {
            console.error("Lỗi khi thanh toán:", err);
        }
    };


    return (
        <div className="flex flex-col justify-between w-full mt-40 sm:flex-row p-3">
            {/* Thông báo */}
            <div className="fixed bottom-5 right-5 z-50">
                <Collapse in={showAlert}>
                    <Alert severity="success">Thanh toán thành công!</Alert>
                </Collapse>
            </div>

            {/* Thông tin khách hàng */}
            <div className="w-full sm:w-[45%] p-3 mb-3">
                <h1 className="text-xl font-bold text-[#8c52ff]">CHI TIẾT ĐƠN HÀNG</h1>

                <div className="mt-10">
                    <label className="text-lg block">
                        Họ và tên <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Nhập tên người nhận hàng"
                        className="border border-gray-300 p-3 w-full"
                    />
                </div>

                <div className="mt-10">
                    <label className="text-lg block">
                        Địa chỉ <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập địa chỉ nhận hàng"
                        className="border border-gray-300 p-3 w-full"
                    />
                </div>

                <div className="mt-10">
                    <label className="text-lg block">
                        Số điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại nhận hàng"
                        className="border border-gray-300 p-3 w-full"
                    />
                </div>

                <div className="mt-10">
                    <label className="text-lg block">Ghi chú</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ghi chú cho người giao hàng (nếu có)"
                        className="border border-gray-300 p-3 w-full"
                    />
                </div>
            </div>

            {/* Đơn hàng chi tiết */}
            <div className="w-full sm:w-[45%] p-3">
                <h1 className="text-xl font-bold text-[#8c52ff]">ĐƠN HÀNG CỦA BẠN</h1>
                <hr className="w-full h-[2px] bg-gray-400 my-2.5" />

                <div className="p-5 w-full border-b border-gray-300">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between mb-3 border border-gray-300 p-3"
                        >
                            <img src={item.image} className="size-28" alt={item.name} />
                            <div className="text-lg font-bold">
                                <p className="mx-2">{item.name}</p>
                                <p className="mx-2 text-black">
                                    Số lượng:{" "}
                                    <span className="text-[#8c52ff]">{item.quantity}</span>
                                </p>
                                <p className="mx-2 text-black">
                                    Giá:{" "}
                                    <span className="text-[#8c52ff]">
                    {item.price.toLocaleString()} ₫
                  </span>
                                </p>
                            </div>
                            <p className="mx-2 text-black">
                                Tổng:{" "}
                                <span className="text-[#8c52ff]">
                  {(item.price * item.quantity).toLocaleString()} ₫
                </span>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="w-full flex items-center justify-between p-3 text-xl border-b border-gray-300">
                    <p>Tổng đơn hàng:</p>
                    <p className="text-[#8c52ff]">{total.toLocaleString()} ₫</p>
                </div>

                <div className="p-3 w-full text-xl">
                    <h1>
                        Phương thức thanh toán:{" "}
                        <span className="text-lime-500">
              {btn.find((item) => item.isactive)?.name || "Chưa chọn"}
            </span>
                    </h1>

                    <div className="space-x-2 mt-2">
                        {btn.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handlebtn(item.name)}
                                className={`inline-flex justify-center items-center px-2 py-1 shadow-lg border-[2px] w-[100px] h-[50px] ${
                                    item.isactive ? "border-lime-500" : "border-gray-300"
                                }`}
                            >
                                <img
                                    src={item.url || `/${item.name}`}
                                    alt={item.name}
                                    className="object-contain w-full h-full"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full flex items-center justify-center mt-5">
                    <button
                        className="w-1/2 h-10 bg-[#8c52ff] text-white rounded-md hover:bg-[#7b3df2] transition"
                        onClick={handlepayment}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
