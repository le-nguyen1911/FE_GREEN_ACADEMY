import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import trash from "../assets/trash-bin.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  deleteOrder,
  getdataOrder,
  updateOrderStatus,
} from "../redux/ordersSlice";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const { orderlist, status, error } = useSelector((state) => state.orders);

  const [showDel, setShowDel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 🔍 Lọc đơn hàng theo khoảng ngày
  const filteredOrders = orderlist.filter((order) => {
    if (!order.createdAt) return false;
    const orderDate = new Date(order.createdAt);
    if (startDate && orderDate < startDate) return false;
    if (endDate && orderDate > endDate) return false;
    return true;
  });

  useEffect(() => {
    dispatch(getdataOrder());
  }, [dispatch]);

  const handleChangeStatus = (order, newStatus) => {
    dispatch(updateOrderStatus({ id: order.id, status: newStatus }));
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDel(true);
  };

  const handleDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const closeModal = () => {
    setShowDetail(false);
    setShowDel(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto">
      {/* Header */}
      <header className="z-40 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between h-8 px-6 mx-auto">
          <h1 className="text-black text-lg font-semibold">ORDERS</h1>
        </div>
      </header>

      {/* Main */}
      <main className="p-4 md:p-8">
        <div className="bg-gray-100 border-4 border-[#8c52ff] rounded-3xl p-6">
          
          {/* Bộ lọc ngày */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Quản lý đơn hàng
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Từ ngày:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày bắt đầu"
                  className="border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8c52ff] focus:outline-none cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Đến ngày:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày kết thúc"
                  className="border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8c52ff] focus:outline-none cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-lg transition font-medium"
              >
                Xóa lọc
              </button>
            </div>
          </div>

          {/* Hiển thị trạng thái tải */}
          {status === "loading" && (
            <p className="text-gray-500 italic">Đang tải dữ liệu...</p>
          )}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* Bảng danh sách đơn hàng */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Mã đơn</th>
                  <th className="px-6 py-3">Khách hàng</th>
                  <th className="px-6 py-3">Tổng tiền</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Ngày tạo</th>
                  <th className="px-6 py-3 text-center">Hành động</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-gray-500 py-4 italic"
                    >
                      Không có đơn hàng trong khoảng thời gian này
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-all text-center"
                    >
                      <td className="px-6 py-3 font-medium text-gray-700">
                        #{order.id}
                      </td>
                      <td className="px-6 py-3">{order.customerName}</td>
                      <td className="px-6 py-3 text-[#8c52ff] font-semibold">
                        {order.total?.toLocaleString("vi-VN")} ₫
                      </td>

                      <td className="px-6 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleChangeStatus(order, e.target.value)
                          }
                          className={`px-2 py-1 rounded border text-sm font-medium cursor-pointer
                            ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-400"
                                : order.status === "shipping"
                                ? "bg-blue-100 text-blue-800 border-blue-400"
                                : order.status === "completed"
                                ? "bg-green-100 text-green-800 border-green-400"
                                : "bg-gray-100 text-gray-700 border-gray-300"
                            }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipping">Shipping</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-6 py-3 text-gray-600">
                        {new Date(order.createdAt).toLocaleString("vi-VN")}
                      </td>

                      <td>
                        <div className="flex space-x-4 justify-center">
                          <button
                            onClick={() => handleDetail(order)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                          >
                            👁 Xem
                          </button>
                          <button
                            onClick={() => handleDelete(order)}
                            className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                          >
                            <img src={trash} alt="xóa" className="size-5" /> Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal chi tiết đơn hàng */}
      {showDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white w-[90%] md:w-[60%] lg:w-[50%] rounded-2xl shadow-2xl p-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-[#8c52ff]">
                Chi tiết đơn hàng #{selectedOrder.id}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <b>Người đặt:</b> {selectedOrder.customerName}
              </p>
              <p>
                <b>Địa chỉ:</b> {selectedOrder.customerAddress || "Không có"}
              </p>
              <p>
                <b>Số điện thoại:</b>{" "}
                {selectedOrder.customerPhone || "Không có"}
              </p>
              <p>
                <b>Trạng thái:</b>{" "}
                <span className="font-semibold capitalize text-blue-600">
                  {selectedOrder.status}
                </span>
              </p>
              <p>
                <b>Ngày tạo:</b>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
              </p>
              {selectedOrder.note && (
                <p>
                  <b>Ghi chú:</b> {selectedOrder.note}
                </p>
              )}
            </div>

            <hr className="my-3" />

            <h3 className="text-lg font-semibold mb-2">Danh sách sản phẩm:</h3>
            {selectedOrder.items && selectedOrder.items.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border p-2 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          SL: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#8c52ff] font-semibold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Không có sản phẩm trong đơn hàng này.
              </p>
            )}

            <div className="border-t mt-4 pt-3 flex justify-between font-semibold text-lg">
              <span>Tổng tiền:</span>
              <span className="text-[#8c52ff]">
                {selectedOrder.total?.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {showDel && selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm">
          <div className="bg-white w-[90%] md:w-[40%] rounded-2xl shadow-xl p-6 animate-fadeIn flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Xóa đơn hàng
            </h1>
            <p className="text-gray-600 text-center mb-5">
              Bạn có chắc chắn muốn xóa đơn hàng{" "}
              <span className="font-semibold text-red-500">
                #{selectedOrder.id}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-6 mt-4 w-full">
              <button
                onClick={() => {
                  dispatch(deleteOrder(selectedOrder));
                  closeModal();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition"
              >
                Xác nhận
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-lg shadow-md transition"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
