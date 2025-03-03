'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PostProps } from './Post';
import { useAtom } from 'jotai';
import { modalOpenAtom, selectedPostAtom } from '../Atoms/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Nature from '../images/Nature.jpg'

export const PostModal = ({post}: PostProps) => {
    const postModalRef = useRef<HTMLDivElement>(null);
    const [_modalOpen, setModalOpen] = useAtom(modalOpenAtom);
    const [_selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = post.img?.src || '../images/Nature.jpg';
        img.onload = () => setTimeout(() => {
            setImageLoaded(true);
        }, 100);
    }, [post.img?.src]);

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

    function formatDate(dateString: string): string {
            // Parse the input date string (format: YYYY-MM-DD)
            const date = new Date(dateString);

            // Define options for formatting with proper TypeScript types
            const options: Intl.DateTimeFormatOptions = { 
                weekday: 'long',    // Must be 'long', 'short', or 'narrow'
                month: 'long',      // Must be 'numeric', '2-digit', 'long', 'short', or 'narrow'
                day: 'numeric',     // Must be 'numeric' or '2-digit'
                year: 'numeric'     // Must be 'numeric' or '2-digit'
            };

            return date.toLocaleDateString('en-US', options);
        }

        function formatTime(timeString: string): string {
            // Parse the time string (format: HH:MM)
            const [hours, minutes] = timeString.split(':').map(Number);

            // Create a date object (using today's date)
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);

            // Format the time
            const options: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true // This ensures 12-hour format with AM/PM
            };

            return date.toLocaleTimeString('en-US', options);
        }

    return (
        <motion.div className='bg-[rgba(43,43,43,0.3)] absolute w-full h-full flex items-center justify-center py-9' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <motion.div className={`bg-white bg-clip-padding backdrop-filter backdrop-blur-lg rounded-lg w-180 h-220 mx-4 font-medium gap-2 border border-neutral-400 overflow-hidden ${imageOpen && 'w-max h-max max-w-[80%] max-h-[95%] border-2 border-white'} flex flex-col max-h-[100dvh]`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }} ref={postModalRef} style={{backgroundColor: 'rgba(255, 255, 255, 0.85)'}}>
                <div className='absolute rounded bg-red-400 hover:bg-red-500 right-2 cursor-pointer text-white z-20 active:scale-90 top-2 max-sm:scale-130 max-sm:active:scale-110 transition-[scale]' onClick={() => {setModalOpen(false); setSelectedPost(null);}}>
                    <X />
                </div>

                <div className={`relative h-80 ${imageOpen && 'w-full h-full'} overflow-hidden cursor-pointer`} onClick={() => setImageOpen(prev => !prev)} title='Click to Zoom In/Out'>

                    {imageLoaded &&
                        (<img 
                            src={typeof post.img === 'string' ? post.img : '/images/Nature.jpg'} 
                            alt={post.name}
                            className='object-cover w-full h-full'
                            onLoad={() => setImageLoaded(true)}
                            loading="lazy" 
                        />)
                    }
                </div>

                {!imageOpen && (
                    <div className='flex-1 flex flex-col font-quicksand max-sm:text-sm'>
                        <div className='font-bold text-2xl max-sm:text-md p-1 rounded-xl px-2 text-center my-4'>
                            {post.name}
                        </div>

                        <div className='bg-neutral-400 h-[1px] w-[92%] self-center' />

                        <div className='font-medium text-lg max-sm:text-[16px] text-center rounded-xl p-1 mt-4'>
                            {post.description}
                        </div>

                        <div className='grid grid-cols-[160px_1fr] gap-y-4 w-full p-4 flex-1 text-lg max-sm:text-[16px]'>
                            <div className='font-bold text-gray-800 self-center'>Date Lost:</div>
                            <div className='self-center'>
                                <span className='py-1 rounded-full inline-block'>{formatDate(post.date_lost)}</span>
                            </div>

                            <div className='font-bold text-gray-800 self-center'>Time:</div>
                            <div className='self-center'>
                                <span className='py-1 rounded-full inline-block'>{formatTime(post.time)}</span>
                            </div>

                            <div className='font-bold text-gray-800 self-center'>Location:</div>
                            <div className='self-center'>
                                <span className='bg-blue-500 text-white px-3 py-1 rounded-full inline-block'>{post.location}</span>
                            </div>

                            <div className='font-bold text-gray-800 self-center'>Status:</div>
                            <div className='self-center'>
                                <span className={`${post.status === "Lost" ? 'bg-red-500' : 'bg-green-500'} text-white px-3 py-1 rounded inline-block`}>{post.status}</span>
                            </div>

                            <div className='font-bold text-gray-800 self-center'>Email:</div>
                            <div className='self-center'>
                                <span className='py-1 rounded text-black'>{post.email}</span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export const PostModalRenderer = () => {
    const [modalOpen] = useAtom(modalOpenAtom);
    const [selectedPost] = useAtom(selectedPostAtom);

    return (
        <AnimatePresence>
            {modalOpen && selectedPost && <PostModal post={selectedPost} />}
        </AnimatePresence>
    );
}