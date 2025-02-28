'use client';

import { StaticImageData } from 'next/image';
import React from 'react';

interface PostProps {
    post: {
        img: StaticImageData,
        name: string,
        description: string,
        location: string,
        status: string
    }
}

export const Post = ({ post }: PostProps) => {

    return (
        <div className='border-2 border-neutral-300 h-max w-full rounded-lg p-2 flex max-xl:flex-col gap-2 hover:bg-gray-100 cursor-pointer' onClick={() => console.log("Wait")}>
            <img
                className='rounded-lg object-cover h-72 shadow-lg'
                src={post.img.src}
                alt="Picture of the author"
            />
            <div className='border-2 border-neutral-300 flex-1 rounded-lg p-4 font-medium flex flex-col h-full text-lg justify-between'>
                <div className='font-bold text-2xl'>
                    Black Bag
                </div>
                <div className='font-normal'>
                    A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.
                </div>
                <div>
                    Location: <a className='bg-blue-200 rounded p-1 px-2 w-max text-blue-600'>{post.location}</a>
                </div>
                <div>
                    Status: <a className={`bg-green-200 ${post.status === "Unfound" && 'bg-red-200 text-red-600'} rounded p-1 px-2 w-max text-green-600`}>{post.status}</a>
                </div>
            </div>
        </div>
    );
}
