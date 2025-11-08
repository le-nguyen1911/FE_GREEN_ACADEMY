import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Product from "./pages/Product";
import Payment from "./pages/Payment";
import Order from "./pages/Order";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./admin/AdminPage.jsx";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";

const App = () => {
    const [hideTopbar, setHideTopbar] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            setHideTopbar(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-28">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/productPage" element={<ProductPage />} />
                    <Route path="/product/:productID" element={<Product />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                    <Route path="/error" element={<Page404 />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            <ProtectedRoute>
                                <Order />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                
            </main>

            <Footer />

            {hideTopbar && (
                <button
                    onClick={scrollToTop}
                    className="fixed right-5 bottom-5 bg-[#8c52ff] p-3 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform text-white"
                >
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            )}
        </div>
    );
};

export default App;
