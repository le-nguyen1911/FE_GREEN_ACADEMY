import React, { useEffect, useState, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch, setKeyword } from "../redux/searchSlice";
import { logoutUser } from "../redux/authSlice";
import { getcart } from "../redux/cartSlice";
import { FaXmark } from "react-icons/fa6";

import Logo from "../assets/TECHZONE.svg";
import Search from "../assets/search_icon.png";
import profile from "../assets/profile_icon.png";
import carticon from "../assets/cart_icon.png";
import toggle_menu from "../assets/menu_icon.png";
import dropdow from "../assets/dropdown_icon.png";

const Navbar = () => {
    const [hideTopbar, setHideTopbar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { showSearch, keyword } = useSelector((state) => state.search);
    const { cartList } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.auth);
    const DashboardLink = currentUser?.role === "admin" ? "/adminpage" : "/error";

    useEffect(() => {
        if (currentUser?.id) dispatch(getcart(currentUser.id));
    }, [currentUser, dispatch]);

    useEffect(() => setSearchText(keyword), [keyword]);

    useEffect(() => {
        const handleScroll = () => setHideTopbar(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            dispatch(setKeyword(searchText));
            setSearchText("");
            if (window.location.pathname !== "/productPage") navigate("/productPage");
        }
    };

    const handleLogout = async () => {
        if (window.confirm("Bạn có chắc muốn đăng xuất không?")) {
            await dispatch(logoutUser());
            alert("Đã đăng xuất!");
            navigate("/");
        }
    };

    const menuItems = useMemo(
        () => [
            { to: "/", label: "TRANG CHỦ" },
            { to: "/productPage", label: "SẢN PHẨM" },
            { to: "/about", label: "GIỚI THIỆU" },
            { to: "/contact", label: "LIÊN HỆ" },

        ],
        []
    );

    return (
        <div>
            <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow z-50 transition-all duration-300">
                {/* --- TOPBAR --- */}
                <div
                    className={`hidden lg:block border-b border-gray-300 transition-all duration-300 ${
                        hideTopbar ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"
                    }`}
                >
                    <div className="flex justify-between items-center py-3 px-[8vw] font-medium text-gray-500 bg-white">
                        <ul className="flex">
                            <NavLink
                                to="/about"
                                className="px-5 border-r border-gray-300 text-lg hover:text-[#8c52ff]"
                            >
                                Về Chúng Tôi
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className="px-5 border-r border-gray-300 text-lg hover:text-[#8c52ff]"
                            >
                                Liên Hệ
                            </NavLink>
                            <NavLink
                                to="/blog"
                                className="px-5 text-lg hover:text-[#8c52ff]"
                            >
                                Blog
                            </NavLink>
                        </ul>
                        <span className="text-lg">Hotline: 0377 467 900</span>
                    </div>
                </div>

                {/* --- NAVBAR CHÍNH --- */}
                <div className="flex justify-between items-center py-4 px-[5vw] md:px-[7vw] lg:px-[9vw]">
                    {/* Logo */}
                    <NavLink to="/">
                        <img src={Logo} className="w-40 cursor-pointer" alt="Logo" />
                    </NavLink>

                    {/* Menu desktop */}
                    <ul className="hidden lg:flex gap-6 text-lg text-gray-700">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-1 transition-all ${
                                        isActive
                                            ? "text-[#8c52ff]"
                                            : "text-gray-700 hover:text-[#8c52ff]"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <p>{item.label}</p>
                                        {isActive && (
                                            <hr className="w-2/4 border-none h-[2px] bg-[#8c52ff] rounded" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </ul>

                    <NavLink
                        to={DashboardLink}
                        className="hidden md:flex items-center justify-center w-[140px] h-[45px] border border-[#8c52ff] rounded-full text-gray-700 hover:bg-[#8c52ff] hover:text-white transition-all duration-300 uppercase text-sm font-semibold"
                    >
                        Dashboard
                    </NavLink>

                    <div className="flex items-center gap-5">
                        <img
                            src={Search}
                            alt="Search"
                            className="w-6 cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => dispatch(toggleSearch())}
                        />

                        {/* Avatar user */}
                        <div className="group relative">
                            <img
                                src={currentUser?.avatar || profile}
                                alt="User"
                                className="w-8 h-8 rounded-full object-cover cursor-pointer border border-gray-300 hover:scale-105 transition-transform"
                            />
                            <div className="group-hover:block hidden absolute right-0 pt-4">
                                <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-white text-gray-700 rounded shadow-md">
                                    {currentUser ? (
                                        <>
                                            <p className="font-semibold text-center text-[#8c52ff]">
                                                {currentUser.displayName || currentUser.nameAccount}
                                            </p>
                                            <hr />
                                            <p
                                                className="cursor-pointer hover:text-black"
                                                onClick={() => navigate("/profile")}
                                            >
                                                Trang cá nhân
                                            </p>
                                            <p
                                                className="cursor-pointer hover:text-black"
                                                onClick={() => navigate("/order")}
                                            >
                                                Đơn mua
                                            </p>
                                            <p
                                                className="cursor-pointer hover:text-black"
                                                onClick={handleLogout}
                                            >
                                                Đăng xuất
                                            </p>
                                        </>
                                    ) : (
                                        <p
                                            className="cursor-pointer hover:text-black text-center"
                                            onClick={() => navigate("/login")}
                                        >
                                            Đăng nhập
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link to="/cart" className="relative">
                            <img
                                src={carticon}
                                alt="Cart"
                                className="w-6 cursor-pointer hover:scale-110 transition-transform"
                            />
                            {cartList.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#8c52ff] text-white rounded-full text-[11px] w-4 h-4 flex items-center justify-center">
                  {cartList.length}
                </span>
                            )}
                        </Link>

                        {/* Nút menu mobile */}
                        <img
                            src={toggle_menu}
                            alt="Menu"
                            className="w-5 cursor-pointer lg:hidden"
                            onClick={() => setVisible(true)}
                        />
                    </div>
                </div>

                {/* Thanh tìm kiếm */}
                {showSearch && (
                    <div className="flex justify-center px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gray-100 py-3 transition-all duration-300">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Nhập từ khóa tìm kiếm..."
                            className="w-[95%] sm:w-[70%] md:w-[60%] p-2 border border-gray-300 rounded text-black focus:outline-none"
                        />
                        <FaXmark
                            onClick={() => dispatch(toggleSearch())}
                            className="text-3xl ml-3 flex m-auto cursor-pointer hover:text-[#8c52ff] transition-colors"
                        />
                    </div>
                )}
            </div>

            {visible && (
                <div
                    onClick={() => setVisible(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/5 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    visible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col text-gray-600">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-3 p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                    >
                        <img src={dropdow} alt="" className="h-4 rotate-180" />
                        <p>Quay Lại</p>
                    </div>

                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setVisible(false)}
                            className="py-3 pl-6 border-b border-gray-300 hover:bg-gray-100"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to={DashboardLink}
                        onClick={() => setVisible(false)}
                        className="py-3 pl-6 border-b border-gray-300 hover:bg-gray-100"
                    >
                        DASHBOARD
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
