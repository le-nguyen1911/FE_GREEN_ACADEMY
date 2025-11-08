import React, {useEffect, useState} from "react";
import ApexCharts from "apexcharts";
import box from "../assets/box.png";
import AdminProduct from "./AdminProduct.jsx";
import AdminUsers from "./AdminUsers.jsx";
import AdminComments from "./AdminComments.jsx";
import {useDispatch, useSelector} from "react-redux";
import AdminOrder from "./AdminOrder.jsx";
import toggle from "../assets/menu_icon.png"
import {useNavigate} from "react-router-dom";
import {getdata} from "../redux/userSlice.jsx";
import {getdataOrder} from "../redux/ordersSlice.jsx";

const AdminPage = () => {

    const {currentUser} = useSelector((state) => state.auth);
    const { orderlist } = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userlist } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(() => {
        return localStorage.getItem("adminDisplay") || "dashboard";
    });

    const totalquantity = orderlist.reduce((acc, item) => acc + item.items.quantity, 0);
    const orderquantity = orderlist.length
    const revenue = orderlist.reduce((acc, item) => acc + item.total, 0);
    const  newcustm = userlist.length

    useEffect(() => {
        localStorage.setItem("adminDisplay", display);

    }, [display]);
    useEffect(() => {
        dispatch(getdataOrder());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getdata());
    }, [dispatch]);
    useEffect(() => {
        if (display !== "dashboard") return;
        if (display !== "dashboard") return;
        if (display !== "dashboard") return;
        if (display !== "dashboard") return;

        const chartLineEl = document.querySelector("#chartline");
        const lineOptions = {
            series: [
                {name: "TEAM A", type: "area", data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]},
                {name: "TEAM B", type: "line", data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]},
            ],
            chart: {height: 350, type: "line", zoom: {enabled: false}},
            stroke: {curve: "smooth"},
            fill: {type: "solid", opacity: [0.35, 1]},
            labels: ["Dec 01", "Dec 02", "Dec 03", "Dec 04", "Dec 05", "Dec 06", "Dec 07", "Dec 08", "Dec 09", "Dec 10", "Dec 11"],
            markers: {size: 0},
            yaxis: [{title: {text: "Series A"}}, {opposite: true, title: {text: "Series B"}}],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: (y) => (typeof y !== "undefined" ? y.toFixed(0) + " points" : y),
                },
            },
        };
        const chart1 = new ApexCharts(chartLineEl, lineOptions);
        chart1.render();

        const chartPieEl = document.querySelector("#chartpie");
        const pieOptions = {
            series: [44, 55, 67, 83],
            chart: {height: 350, type: "radialBar"},
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {fontSize: "22px"},
                        value: {fontSize: "16px"},
                        total: {
                            show: true,
                            label: "Total",
                            formatter: () => 249,
                        },
                    },
                },
            },
            labels: ["Apples", "Oranges", "Bananas", "Berries"],
        };
        const chart2 = new ApexCharts(chartPieEl, pieOptions);
        chart2.render();

        return () => {
            chart1.destroy();
            chart2.destroy();
        };
    }, [display]);
    console.log(orderlist);
    return (

        <div className="fixed inset-0 flex flex-col justify-center items-center z-50 w-full">
            <div className="flex w-full md:hidden p-3  justify-between items-center text-white relative bg-white mt-20">
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
                    className="p-2 rounded  transition"
                >
                    <img src={toggle} alt="toggle" className="w-7 h-7" />
                </button>

                {isOpen && (
                    <>
                        {/* Overlay mờ nền */}
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsOpen(false)}
                        ></div>

                        {/* Menu chính */}
                        <div className="fixed top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center justify-center gap-3 py-4 shadow-lg z-50 md:hidden animate-fadeIn">
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
                                className=" bg-gray-700 text-gray-200 hover:bg-[#8c52ff] hover:text-white w-[91.6667%] py-2 rounded-lg">
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
            </div>


            <div className="flex h-screen bg-white w-full">
                {/* Sidebar */}
                <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-white md:block">
                    <div className="text-black">
                        <div className="flex p-2 bg-white">
                            <div className="flex py-3 px-2 items-center">
                                <p className="text-2xl text-[#8c52ff] font-semibold">SA</p>
                                <p className="ml-2 font-semibold italic">DASHBOARD</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div>
                                <img
                                    className="hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-[#8c52ff]"
                                    src={currentUser.avatar}
                                    alt=""
                                />
                                <p className="font-bold text-base text-gray-400 pt-2 text-center w-24">Lê Nguyên</p>
                            </div>
                        </div>

                        {/* Menu */}
                        <ul className="mt-6 leading-10">
                            <li className="relative px-2 py-1">
                                <button onClick={() => navigate("/")}
                                        className="inline-flex items-center w-full text-sm font-semibold text-black hover:text-[#8c52ff]">
                                    <span className="ml-4">HOME</span>
                                </button>
                            </li>
                            <li className="relative px-2 py-1">
                                <button onClick={() => setDisplay("dashboard")}
                                        className="inline-flex items-center w-full text-sm font-semibold text-black hover:text-[#8c52ff]">
                                    <span className="ml-4">DASHBOARD</span>
                                </button>
                            </li>
                            <li className="relative px-2 py-1">
                                <button onClick={() => setDisplay("products")}
                                        className="inline-flex items-center w-full text-sm font-semibold text-black hover:text-[#8c52ff]">
                                    <span className="ml-4">PRODUCTS</span>
                                </button>
                            </li>
                            <li className="relative px-2 py-1">
                                <button onClick={() => setDisplay("users")}
                                        className="inline-flex items-center w-full text-sm font-semibold text-black hover:text-[#8c52ff]">
                                    <span className="ml-4">USERS</span>
                                </button>
                            </li>
                            <li className="relative px-2 py-1">
                                <button onClick={() => setDisplay("order")}
                                        className="inline-flex items-center w-full text-sm font-semibold text-black hover:text-[#8c52ff]">
                                    <span className="ml-4">ORDERS</span>
                                </button>
                            </li>
                            <li className="relative px-2 py-1 ">
                                <button onClick={() => setDisplay("comments")}
                                        className="inline-flex items-center w-full text-sm font-semibold text-black hover:text-[#8c52ff]">
                                    <span className="ml-4">COMMENTS</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                {display === "dashboard" && (
                    <div className="flex flex-col flex-1 w-full overflow-y-auto">
                        <div className="flex flex-col flex-1 w-full overflow-y-auto">
                            <header className="z-40 py-4 bg-white">
                                <div className="flex items-center justify-between h-8 px-6 mx-auto">
                                    <h1 className="text-black text-lg font-semibold">Dashboard</h1>
                                </div>
                            </header>

                            {/* Content */}
                            <main>
                                <div
                                    className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-[#8c52ff]">
                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="grid grid-cols-12 col-span-12 gap-6">
                                            <div className="col-span-12 mt-8">
                                                <div className="flex items-center h-10">
                                                    <h2 className="mr-5 text-lg font-medium truncate">
                                                        Quản Trị
                                                    </h2>
                                                </div>

                                                {/* Cards */}
                                                <div className="grid grid-cols-12 gap-6 mt-5">
                                                    {[
                                                        {color: "blue-400", value: orderquantity, label: "Tổng số đơn hàng"},
                                                        {color: "yellow-400", value: totalquantity, label: "Sản phẩm đã bán"},
                                                        {color: "pink-600", value: (newcustm -1), label: "Khách hàng mới"},
                                                        {color: "green-400", value: revenue.toLocaleString(), label: "Doanh thu tháng này"},
                                                    ].map((item, index) => (
                                                        <a
                                                            key={index}
                                                            href="#"
                                                            className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 bg-white"
                                                        >
                                                            <div className="p-5">
                                                                <div className="flex justify-between">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className={`h-7 w-7 text-${item.color}`}
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                                        />
                                                                    </svg>
                                                                    <div
                                                                        className="bg-[#8c52ff] rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                                            <span
                                                                                className="flex items-center">30%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-2 w-full flex-1">
                                                                    <div>
                                                                        <div
                                                                            className="mt-3 text-3xl font-bold leading-8">
                                                                            {item.value}
                                                                        </div>
                                                                        <div
                                                                            className="mt-1 text-base text-gray-600">
                                                                            {item.label}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Charts */}
                                            <div className="col-span-12 mt-5">
                                                <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
                                                    <div className="bg-white shadow-lg p-4" id="chartline"></div>
                                                    <div className="bg-white shadow-lg" id="chartpie"></div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                )}
                {display === "products" && <AdminProduct/>}
                {display === "users" && <AdminUsers/>}
                {display === "comments" && <AdminComments/>}
                {display === "order" && <AdminOrder/>}
            </div>
        </div>

    );
};

export default AdminPage;

