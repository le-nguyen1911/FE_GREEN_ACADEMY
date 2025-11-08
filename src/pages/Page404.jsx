import React from "react";
import { Link } from "react-router-dom";
import "../css/Page404.css"; 

const Page404 = () => {
  return (
    <div className="page-404 fixed inset-0 flex flex-col items-center justify-center z-50">
      <h1 className="error-title">404 - Trang không tồn tại</h1>
      <p className="error-subtitle">
        Bạn không có quyền vào trang này
      </p>

      <section className="error-number">
        <span className="digit-four"><span className="sr-only">4</span></span>
        <span className="digit-zero"><span className="sr-only">0</span></span>
        <span className="digit-four"><span className="sr-only">4</span></span>
      </section>

      <div className="error-link">
        <Link to="/" className="error-home-link">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Page404;
