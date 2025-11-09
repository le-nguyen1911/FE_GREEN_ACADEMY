import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import AdminProduct from "./AdminProduct.jsx";
import AdminUsers from "./AdminUsers.jsx";
import AdminComments from "./AdminComments.jsx";
import { useDispatch, useSelector } from "react-redux";
import AdminOrder from "./AdminOrder.jsx";
import toggle from "../assets/menu_icon.png";
import { useNavigate } from "react-router-dom";
import { getdata } from "../redux/userSlice.jsx";
import { getdataOrder } from "../redux/ordersSlice.jsx";

const AdminPage = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const { orderlist } = useSelector((state) => state.orders);
    const { userlist } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(
        () => localStorage.getItem("adminDisplay") || "dashboard"
    );

    // ==== Tính toán dữ liệu dashboard ====
    const totalquantity = orderlist.reduce((acc, order) => {
        const itemQuantity = order.items?.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
        );
        return acc + itemQuantity;
    }, 0);
    const orderquantity = orderlist.length;
    const revenue = orderlist.reduce((acc, item) => acc + (item.total || 0), 0);
    const newcustm = userlist.length;

    // ==== Fetch dữ liệu ====
    useEffect(() => {
        dispatch(getdataOrder());
        dispatch(getdata());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("adminDisplay", display);
    }, [display]);

    // ==== Vẽ biểu đồ Dashboard ====
    useEffect(() => {
        if (display !== "dashboard") return;

        const chartLineEl = document.querySelector("#chartline");
        const chartPieEl = document.querySelector("#chartpie");

        const chart1 = new ApexCharts(chartLineEl, {
            series: [
                { name: "TEAM A", type: "area", data: [44, 55, 31, 47, 31, 43, 26] },
                { name: "TEAM B", type: "line", data: [55, 69, 45, 61, 43, 54, 37] },
            ],
            chart: { height: 350, type: "line", zoom: { enabled: false } },
            stroke: { curve: "smooth" },
            fill: { type: "solid", opacity: [0.35, 1] },
            labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
            markers: { size: 0 },
            tooltip: {
                shared: true,
                intersect: false,
                y: { formatter: (y) => (y ? y.toFixed(0) + " điểm" : y) },
            },
        });

        const chart2 = new ApexCharts(chartPieEl, {
            series: [44, 55, 67, 83],
            chart: { height: 350, type: "radialBar" },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: { fontSize: "20px" },
                        value: { fontSize: "14px" },
                        total: {
                            show: true,
                            label: "Tổng",
                            formatter: () => 249,
                        },
                    },
                },
            },
            labels: ["Tai nghe", "Chuột", "Bàn phím", "Khác"],
        });

        chart1.render();
        chart2.render();
        return () => {
            chart1.destroy();
            chart2.destroy();
        };
    }, [display]);

    // ==== Giao diện chính ====
    return (
        <div className="fixed inset-0 z-50 w-full bg-white flex flex-col overflow-y-auto">
            {/* ===== Header Mobile ===== */}
            <div className="flex md:hidden p-3 justify-between items-center bg-white shadow sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <img
                        src={currentUser.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full border-2 border-[#8c52ff] object-cover"
                    />
                    <h1 className="font-semibold text-lg text-black truncate max-w-[120px]">
                        {currentUser.displayName || "Admin"}
                    </h1>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded transition"
                >
                    <img src={toggle} alt="toggle" className="w-7 h-7" />
                </button>
            </div>

            {/* ===== Mobile Menu ===== */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="fixed top-[70px] left-0 w-full bg-gray-800 text-white flex flex-col items-center justify-center gap-3 py-5 shadow-lg z-50 md:hidden animate-fadeIn">
                        {[
                            { key: "dashboard", label: "Dashboard" },
                            { key: "products", label: "Products" },
                            { key: "users", label: "Users" },
                            { key: "order", label: "Orders" },
                            { key: "comments", label: "Comments" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                onClick={() => {
                                    setDisplay(item.key);
                                    setIsOpen(false);
                                }}
                                className={`w-11/12 py-2 rounded-lg font-medium text-center transition ${
                                    display === item.key
                                        ? "bg-[#8c52ff] text-white"
                                        : "bg-gray-700 text-gray-200 hover:bg-[#8c52ff] hover:text-white"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => navigate("/")}
                            className="bg-gray-700 text-gray-200 hover:bg-[#8c52ff] hover:text-white w-[91.6667%] py-2 rounded-lg"
                        >
                            Quay về trang chủ
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-3 text-gray-400 text-sm hover:text-red-400"
                        >
                            Đóng menu ✕
                        </button>
                    </div>
                </>
            )}

            {/* ===== Layout chính ===== */}
            <div className="flex flex-1 bg-white w-full">
                {/* Sidebar Desktop */}
                <aside className="hidden md:block w-60 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="text-black text-center py-6 border-b border-gray-200">
                        <p className="text-2xl text-[#8c52ff] font-semibold">SA</p>
                        <p className="text-sm italic text-gray-500">DASHBOARD</p>
                        <img
                            className="h-20 w-20 mx-auto mt-4 rounded-full object-cover border-4 border-[#8c52ff]"
                            src={currentUser.avatar}
                            alt=""
                        />
                        <p className="font-bold text-base text-gray-500 mt-2">
                            {currentUser.displayName}
                        </p>
                    </div>

                    <ul className="mt-6 space-y-2 px-3">
                        {[
                            { key: "dashboard", label: "DASHBOARD" },
                            { key: "products", label: "PRODUCTS" },
                            { key: "users", label: "USERS" },
                            { key: "order", label: "ORDERS" },
                            { key: "comments", label: "COMMENTS" },
                        ].map((item) => (
                            <li key={item.key}>
                                <button
                                    onClick={() => setDisplay(item.key)}
                                    className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                                        display === item.key
                                            ? "bg-[#8c52ff] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => navigate("/")}
                                className="w-full text-gray-700 hover:text-[#8c52ff] font-semibold mt-3"
                            >
                                HOME
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {display === "dashboard" && (
                        <main className="p-6">
                            <h1 className="text-xl font-bold text-[#8c52ff] mb-6">
                                Dashboard
                            </h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {[
                                    { value: orderquantity, label: "Tổng số đơn hàng" },
                                    { value: totalquantity, label: "Sản phẩm đã bán" },
                                    { value: newcustm - 1, label: "Khách hàng mới" },
                                    {
                                        value: revenue.toLocaleString() + " VNĐ",
                                        label: "Doanh thu tháng này",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 hover:shadow-xl transition"
                                    >
                                        <p className="text-2xl font-bold text-gray-800">
                                            {item.value}
                                        </p>
                                        <p className="text-gray-500 text-sm">{item.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div
                                    className="bg-white shadow-lg rounded-lg p-4"
                                    id="chartline"
                                ></div>
                                <div
                                    className="bg-white shadow-lg rounded-lg p-4"
                                    id="chartpie"
                                ></div>
                            </div>
                        </main>
                    )}

                    {display === "products" && <AdminProduct />}
                    {display === "users" && <AdminUsers />}
                    {display === "comments" && <AdminComments />}
                    {display === "order" && <AdminOrder />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
