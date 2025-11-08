import React from 'react'
import Logo from "../assets/TECHZONE.svg";

const Footer = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gray-100 pt-[10px] mt-32">
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-xl'>

        {/* Logo + mô tả */}
        <div>
          <img src={Logo} className='mb-5 w-52' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            ullam consectetur temporibus vero quasi inventore consequuntur rerum
            nobis obcaecati tempora.
          </p>
        </div>

        {/* Company links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Giao hàng</li>
            <li>Chính sách riêng tư</li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <p className='text-xl font-medium mb-5'>LIÊN HỆ</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Email: support@example.com</li>
            <li>Hotline: 0123 456 789</li>
            <li>Địa chỉ: Hà Nội, Việt Nam</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-300 text-center mt-10 pt-5 text-gray-500 text-xl'>
        © {new Date().getFullYear()} TECH ZONE. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
