'use client';

import React from 'react';
import { Search } from './Search';

export const Navbar = () => {
    return (
        <div className='flex w-full h-16 bg-neutral-100 border-b border-neutral-300'>
            <div className='h-full flex-[0.6]'>
                
            </div>
            <div className='h-full flex-2 flex items-center justify-center'>
                <Search />
            </div>
            <div className='h-full flex-[0.6]'>
                
            </div>
        </div>
    );
}
