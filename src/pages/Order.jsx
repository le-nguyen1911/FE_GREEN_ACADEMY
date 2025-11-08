import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getdataOrder} from "../redux/ordersSlice";

const Order = () => {
    const dispatch = useDispatch();
    const {orderlist, status} = useSelector((state) => state.orders);
    const {currentUser} = useSelector((state) => state.auth);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getdataOrder(currentUser.id));
        }
    }, [dispatch, currentUser?.id]);


    const handleShowDetail = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setTimeout(() => setSelectedOrder(null), 300);
    };

    if (status === "loading") {
        return (
            <div className="w-full flex justify-center mt-20 text-lg text-gray-500">
                Đang tải danh sách đơn hàng...
            </div>
        );
    }

    if (!orderlist || orderlist.length === 0) {
        return (
            <div className="w-full flex justify-center mt-20 text-lg text-gray-500">
                Bạn chưa có đơn hàng nào.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-20 p-4 relative">
            <h1 className="text-2xl font-bold text-[#8c52ff] mb-6 text-center">
                DANH SÁCH ĐƠN HÀNG
            </h1>

            <div className="space-y-6">
                {orderlist.map((order, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-2xl p-4 shadow-sm bg-white hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-700">
                                    Mã đơn: <span className="text-[#8c52ff]">{order.id}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Phương thức:{" "}
                                    <span className="text-green-600">
                    {order.paymentMethod || "Chưa chọn"}
                  </span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Trạng thái:{" "}
                                    <span
                                        className={`font-semibold ${
                                            order.status === "pending"
                                                ? "text-orange-500"
                                                : "text-lime-600"
                                        }`}
                                    >
                    {order.status === "pending"
                        ? "Đang xử lý"
                        : order.status === "shipping"
                        ? "Đang giao hàng"
                        : order.status === "completed"
                        ? "Đơn hàng đã hoàn thành"
                        : order.status === "cancelled"
                        ? "Đơn hàng đã hủy"
                        : "Không xác định"}
                  </span>
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-bold text-[#8c52ff]">
                                    Tổng: {order.total?.toLocaleString("vi-VN")} ₫
                                </p>
                                <button
                                    onClick={() => handleShowDetail(order)}
                                    className="mt-2 px-3 py-1 border border-[#8c52ff] text-[#8c52ff] rounded-lg hover:bg-[#8c52ff] hover:text-white transition"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOrder && (
                <div
                    className={`fixed inset-0 bg-black/40 flex justify-center items-start z-50 transition-all duration-300 ${
                        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div
                        className={`bg-white w-[90%] sm:w-[600px] mt-20 rounded-2xl shadow-2xl transform transition-all duration-300 ${
                            showModal
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-10 opacity-0"
                        }`}
                    >
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-xl font-bold text-[#8c52ff]">
                                Chi tiết đơn hàng #{selectedOrder.id}
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-4 max-h-[65vh] overflow-y-auto space-y-2">
                            <p className="text-gray-700">
                                Ngày đặt:{" "}
                                {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
                            </p>
                            <p className="text-gray-700">
                                <strong>Phương thức thanh toán:</strong>{" "}
                                {selectedOrder.paymentMethod}
                            </p>
                            <p className="text-gray-700">
                                Trạng thái:
                                <span
                                    className={
                                        selectedOrder.status === "pending"
                                            ? "text-orange-500 font-semibold"
                                            : selectedOrder.status === "shipping"
                                                ? "text-blue-500 font-semibold"
                                                : selectedOrder.status === "completed"
                                                    ? "text-green-600 font-semibold"
                                                    : selectedOrder.status === "cancelled"
                                                        ? "text-red-500 font-semibold"
                                                        : "text-gray-500 font-semibold"
                                    }
                                >
  {selectedOrder.status === "pending"
      ? "Đang xử lý"
      : selectedOrder.status === "shipping"
          ? "Đang giao hàng"
          : selectedOrder.status === "completed"
              ? "Đơn hàng đã hoàn thành"
              : selectedOrder.status === "cancelled"
                  ? "Đơn hàng đã hủy"
                  : "Không xác định"}
</span>

                            </p>

                            <hr className="my-2"/>

                            <p className="text-gray-700">
                                <strong>Người nhận:</strong> {selectedOrder.customerName}
                            </p>
                            <p className="text-gray-700">
                                <strong>Địa chỉ:</strong> {selectedOrder.customerAddress}
                            </p>
                            <p className="text-gray-700">
                                <strong>Số điện thoại:</strong> {selectedOrder.customerPhone}
                            </p>
                            {selectedOrder.note && (
                                <p className="text-gray-700">
                                    <strong>Ghi chú:</strong> {selectedOrder.note}
                                </p>
                            )}

                            <hr className="my-2"/>

                            {selectedOrder.items?.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between border p-2 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                Số lượng: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[#8c52ff] font-semibold">
                                        {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t p-4 flex justify-between items-center">
                            <p className="text-lg font-semibold">Tổng đơn hàng:</p>
                            <p className="text-[#8c52ff] text-lg font-bold">
                                {selectedOrder.total?.toLocaleString("vi-VN")} ₫
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
