import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import trash from "../assets/trash-bin.png";

import {
    getComments,
    updateComment,
    deleteComment,
} from "../redux/commentSlice";

const AdminComments = () => {
    const dispatch = useDispatch();
    const { commentList, status, error } = useSelector((state) => state.comment);

    const [selected, setSelected] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    const handleUpdateStatus = (comment, newStatus) => {
        dispatch(updateComment({ ...comment, status: newStatus }));
    };

    const handleDeleteConfirm = () => {
        if (selected) {
            dispatch(deleteComment(selected.id));
            setShowDelete(false);
            setSelected(null);
        }
    };

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
            {/* Header */}
            <header className="z-40 py-4 bg-white">
                <div className="flex items-center justify-between h-8 px-6 mx-auto">
                    <h1 className="text-black text-lg font-semibold uppercase">
                        Comments
                    </h1>
                </div>
            </header>

            {/* Main */}
            <main className="p-4 md:p-8">
                <div className="bg-gray-100 border-4 border-[#8c52ff] rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Quản lý bình luận
                    </h2>

                    {/* Trạng thái */}
                    {status === "loading" && (
                        <p className="text-gray-500 text-center italic">
                            Đang tải danh sách bình luận...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-center font-medium">{error}</p>
                    )}

                    {status === "success" && commentList.length > 0 ? (
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y divide-gray-200 text-sm shadow-lg rounded-lg overflow-hidden">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Người dùng</th>
                                    <th className="px-6 py-3">Sản phẩm</th>
                                    <th className="px-6 py-3">Nội dung</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3 text-center">Hành động</th>
                                </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                {commentList.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="hover:bg-gray-50 transition-all text-center"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-700">
                                            {c.userName}
                                        </td>
                                        <td className="px-4 py-3">{c.productName}</td>
                                        <td className="px-4 py-3 text-gray-700 max-w-[300px] truncate">
                                            {c.content}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={c.status}
                                                onChange={(e) =>
                                                    handleUpdateStatus(c, e.target.value)
                                                }
                                                className={`px-2 py-1 rounded border text-sm font-medium cursor-pointer
                            ${
                                                    c.status === "approved"
                                                        ? "bg-green-100 text-green-800 border-green-400"
                                                        : "bg-gray-100 text-gray-700 border-gray-300"
                                                }`}
                                            >
                                                <option value="approved">Đã duyệt</option>
                                                <option value="hidden">Ẩn</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelected(c);
                                                    setShowDelete(true);
                                                }}
                                                className="text-red-500 hover:text-red-600 flex items-center justify-center gap-1 transition-colors mx-auto"
                                            >
                                                <img src={trash} alt={"xóa"} className={"size-5"}/> <span>Xóa</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        status === "success" && (
                            <p className="text-gray-500 text-center mt-5 italic">
                                Không có bình luận nào.
                            </p>
                        )
                    )}
                </div>
            </main>

            {showDelete && selected && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm">
                    <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6 animate-fadeIn">
                        <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
                            Xác nhận xóa bình luận
                        </h2>
                        <p className="text-gray-600 text-center mb-5">
                            Bình luận của{" "}
                            <span className="font-semibold text-[#8c52ff]">
                {selected.userName}
              </span>{" "}
                            về sản phẩm{" "}
                            <span className="font-semibold text-[#8c52ff]">
                {selected.productName}
              </span>{" "}
                            sẽ bị xóa vĩnh viễn.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteConfirm}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => setShowDelete(false)}
                                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg shadow transition"
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

export default AdminComments;
