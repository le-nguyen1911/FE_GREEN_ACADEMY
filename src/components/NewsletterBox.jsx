import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandeler = (event) => {
        event.preventDefault()
    }
    return (
        <div className='text-center  mt-32'>
            <p className='text-2xl font-medium text-gray-800'>Đăng ký ngay đẻ nhận ưu đãi hấp dẫn</p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <form onSubmit={onSubmitHandeler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 pl-3 rounded-3xl overflow-hidden'>
                <input type="email" className='w-full sm:flex-1 outline-none'placeholder='Nhập email tại đây' />
                <button type='submit' className='bg-[#8c52ff] text-white text-base px-10 py-4'>Đăng ký</button>
            </form>
        </div>
    )
}

export default NewsletterBox
