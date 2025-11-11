import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import techzone from "../assets/TECHZONE.png";
import axios from "axios";
import { loginUser } from "../redux/authSlice.jsx";
import { postuser } from "../redux/userSlice.jsx";

const URL_USER = "https://68d7ccd92144ea3f6da673fb.mockapi.io/users";

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [nameAccount, setNameAccount] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [signupAccount, setSignupAccount] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error, currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentUser) navigate("/");
        else localStorage.removeItem("currentUser");
    }, [currentUser, navigate]);

    //Đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser({ nameAccount, password }));
            if (result.meta.requestStatus === "fulfilled") {
                alert("Đăng nhập thành công!");
                navigate("/");
            } else {
                alert(result.payload || "Đăng nhập thất bại!");
            }
        } catch (err) {
            console.error("Lỗi khi đăng nhập:", err);
            alert("Lỗi kết nối server!");
        }
    };

    //Đăng ký
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!displayName || !signupAccount || !signupPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            // Kiểm tra tài khoản đã tồn tại chưa
            let accountExists = false;
            try {
                const res = await axios.get(`${URL_USER}?nameAccount=${signupAccount}`);
                if (res.status === 200 && res.data.length > 0) {
                    accountExists = true;
                }
            } catch (err) {
                if (!err.response || err.response.status !== 404) {
                    console.error("Lỗi kiểm tra tài khoản:", err);
                    alert("Không thể kết nối tới MockAPI!");
                    return;
                }
            }

            if (accountExists) {
                alert("Tài khoản đã tồn tại!");
                return;
            }

            // Dữ liệu người dùng mới
            const newUser = {
                nameAccount: signupAccount,
                displayName,
                password: signupPassword,
                role: "user",
                status: true,
                avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                createdAt: new Date().toISOString(),
            };

            // Gọi redux thunk postuser
            const result = await dispatch(postuser(newUser));

            if (result.meta.requestStatus === "fulfilled") {
                alert("Đăng ký thành công! Vui lòng đăng nhập lại.");
                setIsSignup(false);
                setDisplayName("");
                setSignupAccount("");
                setSignupPassword("");
            } else {
                alert(result.payload || "Đăng ký thất bại!");
            }
        } catch (err) {
            console.error("Chi tiết lỗi đăng ký:", err);
            alert("Không thể kết nối tới MockAPI!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-box">
                    {isSignup ? (
                        <>
                            <h1 className="auth-title">Tạo tài khoản</h1>
                            <p className="auth-sub">Tham gia cộng đồng TechZone ngay hôm nay!</p>

                            <form onSubmit={handleSignup}>
                                <label className="auth-label">Tên hiển thị</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Nhập tên hiển thị"
                                    className="auth-input"
                                    required
                                />

                                <label className="auth-label">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    value={signupAccount}
                                    onChange={(e) => setSignupAccount(e.target.value)}
                                    placeholder="Nhập tên đăng nhập"
                                    className="auth-input"
                                    required
                                />

                                <label className="auth-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    className="auth-input"
                                    required
                                />

                                <button type="submit" className="auth-btn">
                                    Đăng ký
                                </button>
                            </form>

                            <p className="auth-text">
                                Đã có tài khoản?{" "}
                                <span className="auth-link" onClick={() => setIsSignup(false)}>
                  Đăng nhập
                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="auth-title">Đăng nhập</h1>
                            <p className="auth-sub">Chào mừng bạn quay lại TechZone!</p>

                            <form onSubmit={handleLogin}>
                                <label className="auth-label">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    value={nameAccount}
                                    onChange={(e) => setNameAccount(e.target.value)}
                                    placeholder="Nhập tên đăng nhập"
                                    className="auth-input"
                                    required
                                />

                                <label className="auth-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    className="auth-input"
                                    required
                                />

                                <button type="submit" className="auth-btn">
                                    {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
                                </button>
                            </form>

                            <p className="auth-text">
                                Chưa có tài khoản?{" "}
                                <span className="auth-link" onClick={() => setIsSignup(true)}>
                  Đăng ký ngay
                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-welcome">
                    <h2>
                        Chào mừng đến với <br /> cộng đồng TechZone
                    </h2>
                    <p>
                        Cập nhật mỗi ngày, giao diện hiện đại, dễ sử dụng.
                        <br />
                        Đăng nhập ngay để trải nghiệm toàn bộ tính năng tuyệt vời!
                    </p>
                    <img src={techzone} alt="illustration" className="auth-image" />
                    <h3>Biến ý tưởng thành hiện thực</h3>
                    <p className="auth-small">Trải nghiệm mượt mà trên mọi thiết bị</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
