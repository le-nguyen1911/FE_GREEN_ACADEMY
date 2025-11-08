import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProduct } from "../redux/productSlice";
import { uploadMultipleImages } from "../until/uploadImage";

const AddProductForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        const previews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(previews);
    };

    // Gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || files.length === 0) {
            setMessage("Vui lòng nhập đủ thông tin và chọn ít nhất 1 ảnh!");
            return;
        }

        try {
            setLoading(true);
            setMessage("Đang tải ảnh lên...");

            const imageUrls = await uploadMultipleImages(files);

            const newProduct = {
                name,
                category,
                subCategory,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                bestseller,
                description,
                image: imageUrls,
                status: true,
            };

            await dispatch(AddProduct(newProduct));
            setMessage("Thêm sản phẩm thành công!");
            setTimeout(() => onClose(), 1500);
        } catch (err) {
            console.error(err);
            setMessage("Upload thất bại, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
        >

            <hr className="border-gray-300 mb-2" />

            {/* Form nhập liệu */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tên sản phẩm..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 outline-none border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Danh mục
                    </label>
                    <input
                        type="text"
                        placeholder="VD: Tai nghe, Chuột..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 outline-none border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Hãng sản xuất
                    </label>
                    <input
                        type="text"
                        placeholder="VD: Sony, Logitech..."
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 outline-none border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Giá sản phẩm (₫)
                    </label>
                    <input
                        type="number"
                        placeholder="Nhập giá..."
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 outline-none border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Số lượng tồn kho
                    </label>
                    <input
                        type="number"
                        placeholder="Nhập số lượng..."
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 outline-none border"
                    />
                </div>

                <div className="flex items-center gap-2 mt-6">
                    <input
                        type="checkbox"
                        checked={bestseller}
                        onChange={(e) => setBestseller(e.target.checked)}
                        className="w-4 h-4 accent-[#8c52ff]"
                    />
                    <span className="text-sm text-gray-700">Là sản phẩm nổi bật</span>
                </div>
            </div>

            {/* Mô tả */}
            <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">
                    Mô tả sản phẩm
                </label>
                <textarea
                    placeholder="Nhập mô tả chi tiết..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 outline-none border min-h-[80px]"
                ></textarea>
            </div>

            <div className="mt-3">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Ảnh sản phẩm
                </label>

                <label
                    htmlFor="product-images"
                    className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#8c52ff]/60 rounded-xl cursor-pointer hover:border-[#8c52ff] hover:bg-[#8c52ff]/5 transition-all py-6"
                >
          <span className="text-sm text-gray-600">
            Kéo & thả ảnh vào đây hoặc{" "}
              <span className="text-[#8c52ff] font-semibold underline">
              chọn tệp <p className={"text-gray-400 inline-block"}>(có thẻ chọn nhiều ảnh một lần)</p>
            </span>
          </span>
                    <input
                        id="product-images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </label>

                {/* Ảnh preview */}
                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                        {previewUrls.map((url, idx) => (
                            <div
                                key={idx}
                                className="relative group border rounded-lg overflow-hidden shadow-sm"
                            >
                                <img
                                    src={url}
                                    alt={`preview-${idx}`}
                                    className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPreviewUrls(previewUrls.filter((_, i) => i !== idx))
                                    }
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2 text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {message && (
                <div
                    className={`text-center font-semibold ${
                        message.includes("thành công")
                            ? "text-green-600"
                            : "text-red-500"
                    }`}
                >
                    {message}
                </div>
            )}

            <div className="flex justify-center gap-4 mt-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#8c52ff] text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-[#7a3ce3] transition duration-200"
                >
                    {loading ? "Đang lưu..." : "Thêm sản phẩm"}
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-200"
                >
                    Huỷ
                </button>
            </div>
        </form>
    );
};

export default AddProductForm;
