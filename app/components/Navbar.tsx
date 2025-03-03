'use client';

import React from 'react';
import { Search } from './Search';
import { Account } from './Account';
import { CreatePost } from './CreatePost';

export const Navbar = () => {
    return (
        <div className='flex w-full h-16 bg-neutral-100 border-b border-neutral-300'>
            <div className='h-full flex-[0.6]'>
                <CreatePost />
            </div>
            <div className='h-full flex-2 flex items-center justify-center'>
                <Search />
            </div>
            <div className='h-full flex-[0.6] flex items-center justify-end'>
                <Account />
            </div>
        </div>
    );
}
