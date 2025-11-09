import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedata, UpdateProduct, getdata } from "../redux/productSlice.jsx";
import AddProductForm from "./AddProductForm.jsx";
import EditProductForm from "./EditProductForm.jsx";

const AdminProduct = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    const [confirm, setConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const allProducts = useMemo(() => {
        if (Array.isArray(products) && products.length > 0) return products;
        try {
            const cached = JSON.parse(localStorage.getItem("products") || "[]");
            return Array.isArray(cached) ? cached : [];
        } catch {
            return [];
        }
    }, [products]);

    useEffect(() => {
        dispatch(getdata());
    }, [dispatch]);

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setConfirm(true);
    };

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
            <header className="z-40 py-4 bg-white">
                <div className="flex items-center justify-between h-8 px-6 mx-auto">
                    <h1 className="text-black text-lg font-semibold">Products</h1>
                </div>
            </header>

            <main className="p-4 md:p-8">
                <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-[#8c52ff]">
                    <div className="flex items-center h-10 mb-4">
                        <h2 className="mr-5 text-lg font-medium">Quản lý sản phẩm</h2>
                    </div>

                    <div className="bg-white p-5 shadow-lg rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="font-bold text-lg text-gray-700">Danh sách sản phẩm</h1>
                            <button
                                onClick={() => setShowAdd(true)}
                                className="bg-[#8c52ff] text-white px-4 py-2 rounded-md hover:bg-[#7a3ce3] transition"
                            >
                                + Thêm sản phẩm
                            </button>
                        </div>

                        {status === "loading" && <p className="text-gray-500">Đang tải dữ liệu...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-center whitespace-nowrap">Hình ảnh</th>
                                    <th className="px-6 py-3 text-center whitespace-nowrap">Tên sản phẩm</th>
                                    <th className="px-6 py-3 text-center whitespace-nowrap">Tồn kho</th>
                                    <th className="px-6 py-3 text-center whitespace-nowrap">Trạng thái</th>
                                    <th className="px-6 py-3 text-center whitespace-nowrap">Hành động</th>
                                </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                {allProducts.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center text-gray-500 py-4 italic"
                                        >
                                            Chưa có sản phẩm nào.
                                        </td>
                                    </tr>
                                ) : (
                                    allProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-gray-50 transition-all text-center"
                                        >
                                            {/* Hình ảnh */}
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <img
                                                    src={
                                                        Array.isArray(product.image)
                                                            ? product.image[0]
                                                            : product.image || "/default-product.png"
                                                    }
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover mx-auto rounded-lg border"
                                                />
                                            </td>

                                            {/* Tên sản phẩm */}
                                            <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-[150px] sm:max-w-none whitespace-nowrap">
                                                {product.name}
                                                <div className="text-xs text-gray-500">
                                                    Loại: {product.category}
                                                </div>
                                            </td>

                                            {/* Tồn kho */}
                                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-semibold">
                                                {product.stock}
                                            </td>

                                            {/* Trạng thái */}
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="relative inline-block w-11 h-5">
                                                    <input
                                                        type="checkbox"
                                                        checked={product.status === true}
                                                        onChange={() =>
                                                            dispatch(
                                                                UpdateProduct({ ...product, status: !product.status })
                                                            )
                                                        }
                                                        id={`switch-${product.id}`}
                                                        className="peer appearance-none w-11 h-5 bg-gray-300 rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300"
                                                    />
                                                    <label
                                                        htmlFor={`switch-${product.id}`}
                                                        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 cursor-pointer"
                                                    ></label>
                                                </div>
                                            </td>

                                            {/* Hành động */}
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
                                                    {/* Nút sửa */}
                                                    <button
                                                        onClick={() => {
                                                            setEditProduct(product);
                                                            setShowEdit(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                                    >
                                                        ✏️ Sửa
                                                    </button>

                                                    {/* Nút xóa */}
                                                    <button
                                                        onClick={() => handleDelete(product)}
                                                        className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                                                    >
                                                        🗑 Xóa
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
                </div>
            </main>

            {confirm && selectedProduct && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm">
                    <div className="bg-white w-[90%] md:w-[40%] rounded-xl p-6 shadow-lg animate-fadeIn">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                            Xác nhận xoá sản phẩm
                        </h1>
                        <div className="flex justify-center">
                            <img
                                src={
                                    Array.isArray(selectedProduct.image)
                                        ? selectedProduct.image[0]
                                        : selectedProduct.image || "/default-product.png"
                                }
                                alt={selectedProduct.name}
                                className="w-40 h-40 object-contain rounded-lg border"
                            />
                        </div>
                        <p className="text-center mt-4 text-gray-700">
                            Bạn có chắc muốn xoá{" "}
                            <span className="font-semibold text-red-500">
                {selectedProduct.name}
              </span>{" "}
                            khỏi danh sách không?
                        </p>
                        <div className="flex justify-center gap-6 mt-6">
                            <button
                                onClick={() => {
                                    dispatch(deletedata(selectedProduct.id));
                                    setConfirm(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                            >
                                Xoá
                            </button>
                            <button
                                onClick={() => setConfirm(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md transition"
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEdit && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm">
                    <div className="bg-white w-[90%] md:w-[50%] max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-lg animate-fadeIn">
                        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                            Chỉnh sửa sản phẩm
                        </h2>
                        <EditProductForm product={editProduct} onClose={() => setShowEdit(false)} />
                    </div>
                </div>
            )}

            {showAdd && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm">
                    <div className="bg-white w-[90%] md:w-[50%] max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-lg animate-fadeIn">
                        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                            Thêm sản phẩm mới
                        </h2>
                        <AddProductForm onClose={() => setShowAdd(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProduct;
