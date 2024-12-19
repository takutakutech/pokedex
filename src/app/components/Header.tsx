import React from 'react'

const Header = () => {
  return (
    <nav className='flex justify-between bg-gray-200 p-4 mx-auto container items-center '>
        <div className='text-5xl text-red-400'>
            ポケモン図鑑
        </div>
        <div className='flex space-x-5 font-bold'>
            <a href="/" className='text-2xl hover:text-red-300 transition-all duration-300'>
                ホーム
            </a>
            <a href="" className='text-2xl hover:text-red-300 transition-all duration-300'>
                その他
            </a>
        </div>
    </nav>
  )
};

export default Header;