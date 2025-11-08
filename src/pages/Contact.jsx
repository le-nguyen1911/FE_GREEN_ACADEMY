import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <div className="px-6 md:px-12 lg:px-20">
            {/* Breadcrumb */}
            <div className="mt-6 text-sm text-gray-500">
                <Link to="/" className="hover:underline text-gray-600">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-400">Liên hệ</span>
            </div>

            {/* Tiêu đề */}
            <div className="text-center text-2xl pt-6 border-t border-gray-300">
                <h1 className="mt-4 font-bold text-[#8c52ff] tracking-wide">
                    LIÊN HỆ VỚI TECHZONE
                </h1>
                <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl mx-auto">
                    Kết nối cùng chúng tôi để được tư vấn, hỗ trợ và hợp tác nhanh chóng nhất.
                </p>
            </div>

            {/* Nội dung chính */}
            <div className="my-12 flex flex-col lg:flex-row items-center justify-center gap-12 mb-20">
                {/* Google Map */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2120516526323!2d106.69358367457612!3d10.795818389347269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b8e16d3a6b%3A0x26cf6b278a59b9e2!2zUXXhuq1uIDEyLCBUUC5IQ00!5e0!3m2!1svi!2s!4v1731100000000!5m2!1svi!2s"
                        width="100%"
                        height="350"
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg shadow-md border w-full h-[300px] sm:h-[350px] md:h-[400px]"
                    ></iframe>
                </div>

                {/* Thông tin liên hệ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-5 text-center lg:text-left">
                    <p className="font-semibold text-xl text-[#8c52ff]">Cửa hàng của chúng tôi</p>
                    <p className="text-gray-500 leading-relaxed">
                        TechZone – Trung tâm công nghệ hiện đại<br />
                        300A Nguyễn Tất Thành, Quận 4, TP. Hồ Chí Minh, Việt Nam
                    </p>

                    <p className="text-gray-500 leading-relaxed">
                        Điện thoại: <span className="font-medium">(028) 1234 5678</span><br />
                        Email: <span className="font-medium">support@techzone.vn</span>
                    </p>

                    <p className="font-semibold text-xl text-[#8c52ff]">Cơ hội nghề nghiệp tại TechZone</p>
                    <p className="text-gray-500">
                        Gia nhập đội ngũ năng động của TechZone – nơi bạn được làm việc cùng công nghệ tiên tiến nhất và phát triển sự nghiệp trong môi trường sáng tạo.
                    </p>

                    <button className="border border-black px-8 py-3 text-sm font-medium hover:bg-[#8c52ff] hover:text-white transition-all duration-500 mt-2">
                        Xem vị trí tuyển dụng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Contact
