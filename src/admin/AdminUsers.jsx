import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteuser, getdata, updateuser } from "../redux/userSlice";
import check from "../assets/check.png";
import reset from "../assets/refresh-arrow.png";
import trash from "../assets/trash-bin.png";
const AdminUsers = () => {
    const dispatch = useDispatch();
    const { userlist, status, error } = useSelector((state) => state.user);
    const [showDelete, setShowDelete] = useState(false);
    const [confirmreset, setConfirmReset] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        dispatch(getdata());
    }, [dispatch]);

    const handleDelete = (user) => {
        setShowDelete(true);
        setSelected(user);
    };

    const handlereset = (user) => {
        setSelected(user);
        setConfirmReset(true);
    };

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
            {/* Header */}
            <header className="z-40 py-4 bg-white">
                <div className="flex items-center justify-between h-8 px-6 mx-auto">
                    <h1 className="text-black text-lg font-semibold uppercase">Users</h1>
                </div>
            </header>

            {/* Main */}
            <main className="p-4 md:p-8">
                <div className="bg-gray-100 border-4 border-[#8c52ff] rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Quản lý người dùng
                    </h2>

                    {status === "loading" && (
                        <p className="text-gray-500 text-center italic">
                            Đang tải danh sách người dùng...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-center font-medium">{error}</p>
                    )}

                    {status === "success" && userlist.length > 0 ? (
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y divide-gray-200 text-sm shadow-lg rounded-lg overflow-hidden">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 text-center">Hình ảnh</th>
                                    <th className="px-6 py-3 text-center">Tên người dùng</th>
                                    <th className="px-6 py-3 text-center">Vai trò</th>
                                    <th className="px-6 py-3 text-center">Trạng thái</th>
                                    <th className="px-6 py-3 text-center">Hành động</th>
                                </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                {userlist.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-all text-center"
                                    >
                                        {/* Hình ảnh */}
                                        <td className="px-4 py-3">
                                            <img
                                                src={user.avatar || "https://via.placeholder.com/40"}
                                                alt={user.displayName}
                                                className="w-10 h-10 rounded-full object-cover mx-auto border"
                                            />
                                        </td>

                                        {/* Tên người dùng */}
                                        <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-[150px] sm:max-w-none">
                                            {user.displayName}
                                        </td>

                                        {/* Vai trò */}
                                        <td className="px-4 py-3">
                                            <select
                                                value={user.role}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateuser({ ...user, role: e.target.value })
                                                    )
                                                }
                                                className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer focus:ring-[#8c52ff] focus:border-[#8c52ff]"
                                            >
                                                <option value="">Chọn vai trò</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </td>

                                        {/* Trạng thái */}
                                        <td className="px-4 py-3">
                                            <div className="relative inline-block w-11 h-5">
                                                <input
                                                    type="checkbox"
                                                    checked={user.status === true}
                                                    onChange={() =>
                                                        dispatch(
                                                            updateuser({ ...user, status: !user.status })
                                                        )
                                                    }
                                                    id={`switch-${user.id}`}
                                                    className="peer appearance-none w-11 h-5 bg-gray-300 rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300"
                                                />
                                                <label
                                                    htmlFor={`switch-${user.id}`}
                                                    className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 cursor-pointer"
                                                ></label>
                                            </div>
                                        </td>

                                        {/* Hành động */}
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
                                                <button
                                                    onClick={() => handlereset(user)}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                                >
                                                    <img src={reset} alt={"reset"} className={"size-5"}/> Reset
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                                                >
                                                     Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        status === "success" && (
                            <p className="text-gray-500 text-center mt-5 italic">
                                Không có người dùng nào.
                            </p>
                        )
                    )}
                </div>
            </main>

            {showDelete && selected && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6 animate-fadeIn">
                        <h1 className="text-xl font-semibold mb-3 text-gray-800 text-center">
                            Xác nhận xoá người dùng
                        </h1>
                        <div className="flex justify-center">
                            <img
                                src={selected.avatar || "https://via.placeholder.com/100"}
                                alt={selected.name}
                                className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                            />
                        </div>
                        <p className="text-center mt-4 text-gray-700">
                            Bạn có chắc muốn xoá{" "}
                            <span className="font-semibold text-red-500">
                {selected.displayName}
              </span>{" "}
                            khỏi danh sách không?
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => {
                                    dispatch(deleteuser(selected));
                                    setShowDelete(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
                            >
                                Xoá
                            </button>
                            <button
                                onClick={() => setShowDelete(false)}
                                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg shadow-md transition"
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmreset && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6 animate-fadeIn flex flex-col items-center">
                        <img src={check} alt="" className="w-16 mb-4" />
                        <h1 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                            Xác nhận reset mật khẩu
                        </h1>
                        <p className="text-gray-600 text-center mb-4">
                            Mật khẩu người dùng{" "}
                            <span className="font-semibold text-[#8c52ff]">
                {selected?.displayName}
              </span>{" "}
                            sẽ được đặt lại thành <b>123456</b>.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    dispatch(updateuser({ ...selected, password: "123456" }));
                                    setConfirmReset(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
                            >
                                Xác nhận
                            </button>
                            <button
                                onClick={() => setConfirmReset(false)}
                                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg shadow-md transition"
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
