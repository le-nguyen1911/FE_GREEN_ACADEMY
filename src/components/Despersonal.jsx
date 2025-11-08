import React from 'react'
import despsn from '../assets/psn.png'
import psnimg from '../assets/psnimg.jpg'
const Despersonal = () => {
  return (
    <div className='flex flex-col items-center  justify-center m-0 p-0 relative w-full h-[500px] mt-32 gap-6'>
      <img className='absolute top-0 left-0 object-cover w-full h-full -z-1' src={despsn} alt="" />
      <h1 className='text-white text-2xl'>Giám đốc</h1>
      <p className='text-white text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ea deserunt sequi recusandae ipsam tenetur!</p>
      <div className='size-[100px] bg-transparent rounded-full overflow-hidden'>
        <img className='object-cover w-full h-full' src={psnimg} alt="" />
      </div>
      <p className='text-white text-lg'> IT ME</p>
    </div>
  )
}

export default Despersonal
