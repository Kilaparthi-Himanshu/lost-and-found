'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PostProps } from './Post';
import { useAtom } from 'jotai';
import { modalOpenAtom, selectedPostAtom } from '../Atoms/atoms';
import { handleClickOutside } from '../functions/functions';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export const PostModal = ({post}: PostProps) => {
    const postModalRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);
    const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = post.img.src;
        img.onload = () => setTimeout(() => {
            setImageLoaded(true);
        }, 100);
    }, [post.img.src]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (postModalRef.current && !postModalRef.current.contains(e.target as Node)) {
                setModalOpen(false);
                setSelectedPost(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <motion.div className='bg-[rgba(43,43,43,0.3)] absolute w-full h-full flex items-center justify-center' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <motion.div className='bg-white bg-clip-padding backdrop-filter backdrop-blur-lg rounded-lg w-220 min-h-190 h-max mx-4 p-2 flex flex-col items-center justify-between font-medium gap-2 border border-neutral-400' initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }} ref={postModalRef} style={{backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
                <div className='absolute rounded bg-red-400 hover:bg-red-500 right-2 cursor-pointer text-white z-20 active:scale-90' onClick={() => {setModalOpen(false); setSelectedPost(null);}}>
                    <X />
                </div>
                <div className={`relative h-80 ${imageOpen && 'w-full h-full'} rounded-lg overflow-hidden cursor-pointer`} onClick={() => setImageOpen(prev => !prev)} title='Click to Zoom In/Out'>
                    {imageLoaded &&
                        (<img 
                            src={post.img.src} 
                            alt={post.name} 
                            className='rounded-lg object-cover w-full h-full'
                            onLoad={() => setImageLoaded(true)}
                            loading="eager" 
                        />)
                    }
                </div>
                {!imageOpen && 
                (
                    <>
                        <div className='font-bold text-2xl p-1 rounded-xl px-2 bg-white underline'>
                            {post.name}
                        </div>
                        <div className='font-medium text-lg text-center rounded-xl p-1' style={{backgroundColor: 'rgba(255, 255, 255, 0.65)'}}>
                            {post.description}
                            {post.description}
                            {post.description}
                            {post.description}
                            {post.description}
                        </div>
                        <div className='text-lg'>
                            Location: <a className='bg-blue-200 rounded p-1 px-2 w-max text-blue-600'>{post.location}</a>
                        </div>
                        <div className='text-lg'>
                            Status: <a className={`bg-green-200 ${post.status === "Lost" && 'bg-red-200 text-red-600'} rounded p-1 px-2 w-max text-green-600`}>{post.status}</a>
                        </div>
                        <div className='text-lg'>
                            Email: <a className='bg-amber-200 px-2 p-1 rounded'>{post.email}</a>
                        </div>
                    </>
                )
                }
            </motion.div>
        </motion.div>
    );
}
