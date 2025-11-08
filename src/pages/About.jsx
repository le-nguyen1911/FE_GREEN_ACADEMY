import React from 'react'
import { Link } from 'react-router-dom'
import aboutimg from "../assets/ABOUTIMG.png"

const About = () => {
    return (
        <div className="px-6 md:px-12 lg:px-20">
            <div className="px-6 md:px-12 lg:px-20 mt-6 text-sm text-gray-500">
                <Link to="/" className="hover:underline text-gray-400">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-600">Giới thiệu</span>
            </div>

            {/* Tiêu đề */}
            <div className="text-2xl text-center pt-8 border-t border-gray-300">
                <h1 className="mt-4 font-bold text-[#8c52ff] tracking-wide">VỀ CHÚNG TÔI</h1>

                <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto">
                    Khám phá thế giới công nghệ hiện đại cùng <span className="font-semibold">TechZone</span> – nơi mang đến những sản phẩm chất lượng, xu hướng và đột phá nhất.
                </p>
            </div>

            {/* Nội dung */}
            <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
                <img
                    src={aboutimg}
                    alt="TechZone Store"
                    className="w-full md:max-w-[450px] rounded-lg shadow-md"
                />

                <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/3 leading-relaxed">
                    <p>
                        <span className="font-semibold text-[#8c52ff]">TechZone</span> – chuỗi cửa hàng công nghệ hàng đầu Việt Nam, chuyên cung cấp các sản phẩm điện tử chính hãng như laptop, smartphone, tablet và phụ kiện hiện đại.
                    </p>
                    <p>
                        Chúng tôi cam kết mang đến cho khách hàng những sản phẩm công nghệ tiên tiến nhất từ các thương hiệu hàng đầu thế giới, cùng với dịch vụ chăm sóc tận tâm và trải nghiệm mua sắm tiện lợi.
                    </p>
                    <p>
                        Tại TechZone, mỗi sản phẩm không chỉ là thiết bị điện tử – mà còn là công cụ giúp bạn kết nối, sáng tạo và phát triển trong thời đại số.
                    </p>
                    <p>
                        Với sứ mệnh “Công nghệ cho mọi người”, chúng tôi không ngừng cải tiến, mở rộng danh mục sản phẩm và ứng dụng công nghệ mới để mang đến trải nghiệm mua sắm nhanh chóng, hiện đại và đáng tin cậy.
                    </p>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="text-xl py-4 text-center">
                <h1  className={"text-[#8c52ff]"}>TẠI SAO CHỌN TECHZONE</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm mb-20 mt-10">
                <div className="border border-gray-300 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="font-bold text-lg mb-3 text-[#8c52ff]">Sản phẩm chính hãng</p>
                    <p className="text-gray-500">
                        Tất cả sản phẩm tại TechZone đều là hàng chính hãng 100%, có nguồn gốc rõ ràng, được nhập khẩu và bảo hành theo tiêu chuẩn của nhà sản xuất.
                    </p>
                </div>

                <div className="border border-gray-300 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="font-bold text-lg mb-3 text-[#8c52ff]">Trải nghiệm mua sắm hiện đại</p>
                    <p className="text-gray-500">
                        Giao diện thân thiện, đặt hàng nhanh chóng và thanh toán linh hoạt giúp khách hàng dễ dàng sở hữu sản phẩm yêu thích chỉ với vài thao tác.
                    </p>
                </div>

                <div className="border border-gray-300 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="font-bold text-lg mb-3 text-[#8c52ff]">Hỗ trợ tận tâm – uy tín</p>
                    <p className="text-gray-500">
                        Đội ngũ tư vấn chuyên nghiệp, am hiểu công nghệ luôn sẵn sàng hỗ trợ khách hàng trước, trong và sau khi mua hàng – đảm bảo sự hài lòng tuyệt đối.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
