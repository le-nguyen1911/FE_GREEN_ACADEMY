import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateProduct, getdata } from "../redux/productSlice";
import { uploadMultipleImages } from "../until/uploadImage";

const EditProductForm = ({ onClose, product }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: product?.name || "",
        category: product?.category || "",
        subCategory: product?.subCategory || "",
        price: product?.price || "",
        stock: product?.stock || "",
        bestseller: product?.bestseller || false,
        description: product?.description || "",
        image: Array.isArray(product?.image) ? product.image : [product?.image || ""],
    });

    const [newFiles, setNewFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // xử lý input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    // xử lý ảnh mới
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewFiles(files);
        const previews = files.map((f) => URL.createObjectURL(f));
        setPreviewUrls(previews);
    };

    // xóa ảnh cũ
    const removeOldImage = (index) => {
        const updated = formData.image.filter((_, i) => i !== index);
        setFormData({ ...formData, image: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            let uploadedUrls = [];
            if (newFiles.length > 0) {
                uploadedUrls = await uploadMultipleImages(newFiles);
            }

            const updatedProduct = {
                ...product,
                ...formData,
                image: [...formData.image, ...uploadedUrls],
            };

            await dispatch(UpdateProduct(updatedProduct));
            await dispatch(getdata());
            setMessage("Cập nhật sản phẩm thành công!");
            setTimeout(() => onClose(), 1000);
        } catch (err) {
            console.error(err);
            setMessage(" Lỗi khi cập nhật sản phẩm!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
        >


            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Tên sản phẩm
                    </label>
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Danh mục
                    </label>
                    <input
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Hãng sản xuất
                    </label>
                    <input
                        name="subCategory"
                        type="text"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Giá sản phẩm (₫)
                    </label>
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 border"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                        Số lượng tồn kho
                    </label>
                    <input
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 border"
                    />
                </div>

                <div className="flex items-center gap-2 mt-6">
                    <input
                        type="checkbox"
                        name="bestseller"
                        checked={formData.bestseller}
                        onChange={handleChange}
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c52ff] p-2 border min-h-[80px]"
                />
            </div>

            {/* Ảnh hiện tại */}
            <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">
                    Ảnh hiện tại
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {formData.image.map((url, idx) => (
                        <div
                            key={idx}
                            className="relative border rounded-lg overflow-hidden group"
                        >
                            <img
                                src={url}
                                alt={`old-${idx}`}
                                className="w-full h-24 object-cover group-hover:opacity-80 transition"
                            />
                            <button
                                type="button"
                                onClick={() => removeOldImage(idx)}
                                className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2 text-xs opacity-0 group-hover:opacity-100 transition"
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload ảnh mới */}
            <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Thêm ảnh mới (nếu có)
                </label>
                <label
                    htmlFor="new-images"
                    className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#8c52ff]/60 rounded-xl cursor-pointer hover:border-[#8c52ff] hover:bg-[#8c52ff]/5 transition-all py-6"
                >
          <span className="text-sm text-gray-600">
            Kéo & thả ảnh hoặc{" "}
              <span className="text-[#8c52ff] font-semibold underline">
              chọn tệp
            </span>
          </span>
                    <input
                        id="new-images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </label>

                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                        {previewUrls.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`new-${idx}`}
                                className="w-full h-24 object-cover rounded-lg border"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Message */}
            {message && (
                <p
                    className={`text-center font-semibold ${
                        message.includes("thành công") ? "text-green-600" : "text-red-500"
                    }`}
                >
                    {message}
                </p>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#8c52ff] text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-[#7a3ce3] transition duration-200"
                >
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
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

export default EditProductForm;
