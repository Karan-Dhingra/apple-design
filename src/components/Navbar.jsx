import React from 'react'
import {appleImg, bagImg, searchImg} from '../utils'
import { navLists } from './../constants/index';

const Navbar = () => {
    return <header className='w-full py-5 sm:px-10 flex items-center justify-between'>
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} alt="" width={14} height={18} className='cursor-pointer' />

            <div className='flex flex-1 justify-center max-sm:hidden'>
                {navLists.map((item, key) => (
                    <div key={key} className='px-5 text-sm cursor-pointer text-gray hover:text-white transiton-all'>
                        {item}
                    </div>
                ))}
            </div>

            <div className='flex items-baseline max-sm:justify-end max-sm:flex-1 gap-7'>
                <img src={searchImg} alt="search" width={18} height={18} className='cursor-pointer' />
                <img src={bagImg} alt="bag" width={18} height={18} className='cursor-pointer' />
            </div>
        </nav>
    </header>
}

export default Navbar
