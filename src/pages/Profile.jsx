import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../redux/authSlice.jsx";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, status, error } = useSelector((state) => state.auth);

    const [preview, setPreview] = useState(
        currentUser?.avatar || "/image/default-avatar.png"
    );
    const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
    const [message, setMessage] = useState("");

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    // Cập nhật thông tin người dùng
    const handleSave = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const updatedData = {
            displayName,
            avatar: preview,
        };

        try {
            await dispatch(updateProfile({ userId: currentUser.id, updatedData })).unwrap();
            setMessage(" Cập nhật hồ sơ thành công!");
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            setMessage(" Cập nhật thất bại!");
        }
    };

    return (
        <div className="mt-36 flex flex-col items-center mb-6 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase">THÔNG TIN CÁ NHÂN</h1>

            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={preview}
                        alt="avatar"
                        className="size-28 rounded-full object-cover border-4 border-[#8c52ff] shadow"
                    />
                    <label className="mt-4 cursor-pointer bg-[#8c52ff] text-white px-4 py-2 rounded-md text-sm hover:bg-[#7b3de3] transition">
                        Chọn ảnh
                        <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                    </label>
                </div>

                <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Tên tài khoản</label>
                        <input
                            type="text"
                            value={currentUser?.nameAccount || ""}
                            readOnly
                            className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Tên hiển thị</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c52ff]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className={`mt-4 bg-[#8c52ff] text-white py-2 rounded-md hover:bg-[#7b3de3] transition ${
                            status === "loading" && "opacity-70 cursor-not-allowed"
                        }`}
                    >
                        {status === "loading" ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>

                    {/* Thông báo */}
                    {message && (
                        <p
                            className={`mt-3 text-center font-semibold ${
                                message.includes("✅") ? "text-green-600" : "text-red-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
            </div>

            {/* Nút quay lại */}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 w-full max-w-md text-gray-600 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
            >
                ← Quay lại
            </button>
        </div>
    );
};

export default Profile;
