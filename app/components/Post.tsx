'use client';

import React from 'react';
import { modalOpenAtom, Post as PostFromAtoms, selectedPostAtom } from '../Atoms/atoms';
import { useAtom } from 'jotai';
import { StaticImageData } from 'next/image';

export interface PostProps {
    post: {
        img: string
        name: string;
        description: string;
        date_lost: string;
        time: string;
        location: string;
        status: string;
        email: string;
        post_id: string;
    }
}

export const Post = ({ post }: PostProps) => {
    const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);
    const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

    const handleClick = () => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    return (
        <div className='border border-neutral-400 dark:border-neutral-600 xl:min-h-[308px] h-max w-full rounded-lg p-2 flex max-xl:flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-sky-100 cursor-pointer transition-[background]' onClick={handleClick}>
            <img
                className='rounded-lg object-cover h-full max-h-80 max-w-[400px] max-xl:max-w-full shadow-lg'
                src={post.img}
                alt="Picture of the author"
            />
            <div className='border border-neutral-400 dark:border-neutral-600 flex-1 rounded-lg max-sm:py-2 p-4 font-medium flex flex-col h-full text-lg justify-between gap-2'>
                <div className='font-bold text-2xl'>
                    {post.name}
                </div>
                <div className='font-normal'>
                    {post.description}
                </div>
                <div>
                    Location: <a className='bg-blue-200 rounded p-1 px-2 w-max text-blue-600'>{post.location}</a>
                </div>
                <div>
                    Status: <a className={`bg-green-200 ${post.status === "Lost" && 'bg-red-200 text-red-600'} rounded p-1 px-2 w-max text-green-600`}>{post.status}</a>
                </div>
            </div>
        </div>
    );
}
