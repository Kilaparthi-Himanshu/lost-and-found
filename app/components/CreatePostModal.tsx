'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PostProps } from './Post';
import { useAtom } from 'jotai';
import { createPostModalOpenAtom } from '../Atoms/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Image } from 'lucide-react';

export const CreatePostModal = () => {

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [modalOpen, setModalOpen] = useAtom(createPostModalOpenAtom);

    return (
        <motion.div className='bg-[rgba(43,43,43,0.3)] absolute w-full h-full flex items-center justify-center py-9 px-2' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                <motion.form className='bg-white w-[800px] h-max rounded-lg flex flex-col items-center p-4 font-quicksand gap-4 max-h-[95dvh] absolute max-w-[100dvw] max-sm:scale-95' initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
                    <div className='absolute rounded bg-red-400 hover:bg-red-500 right-2 cursor-pointer text-white z-20 active:scale-90 top-2 max-sm:scale-130 max-sm:active:scale-110 transition-[scale]' onClick={() => setModalOpen(false)}>
                        <X />
                    </div>

                    <div className='rounded h-[180px] w-[300px] sm:w-[400px] sm:h-[240px] cursor-pointer border-2 border-stone-400 border-dashed flex items-center justify-center active:border-blue-400 transition-[border]' onClick={() => imageInputRef.current?.click()}>
                        <input type="file" id="photo-upload" className='hidden' ref={imageInputRef} required />
                        <Image size={40} />
                        <p className='font-bold ml-2 text-xl'>Upload An Image</p>
                    </div>

                    <div className='bg-neutral-400 h-[1px] w-[96%] self-center' />

                    <div className='flex-1 w-full rounded-lg grid grid-cols-[160px_1fr] gap-y-4 p-4 font-medium text-xl max-sm:text-lg items-center max-sm:grid-cols-[100px_1fr] text-wrap'>
                            <span>Title:</span>
                            <input placeholder="Item's name" type="text" className='text-lg font-medium p-2 w-full max-sm:max-w-max h-10 border-1 border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                            <span className='max-sm:text-[17px]'>Description:</span>
                            <textarea placeholder='Describe the item' className='text-lg font-medium p-2 w-full max-sm:max-w-max border border-stone-500 rounded resize-none h-33 custom-scrollbar outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' maxLength={220} />

                            <span>Email:</span>
                            <input placeholder='Enter contact email address' type="text" className='text-lg font-medium p-2 w-full max-sm:max-w-max h-10 border border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                            <span>Location:</span>
                            <input placeholder='Where was it lost?' type="text" className='text-lg font-medium p-2 w-70 max-sm:max-w-max h-10 border border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                            <span>Date:</span>
                            <input type="date" className='text-lg font-medium p-2 w-50 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                            <span>Time:</span>
                            <input type="time" className='text-lg font-medium p-2 w-40 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                            <span>Status:</span>
                            <div className='flex justify-between max-sm:w-[85%]'>
                                <select className='text-lg font-medium p-2 w-30 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation'>
                                    <option value="Lost" title="You have lost an item">Lost</option>
                                    <option value="Find" title="You have found someone's item">Find</option>
                                </select>
                                <button className='bg-green-400 active:bg-green-500 p-2 rounded text-white cursor-pointer active:scale-95 transition-[scale,background] duration-50 font-bold'> 
                                    Submit
                                </button>
                            </div>
                    </div>
                </motion.form>
        </motion.div>
    );
}

export const CreatePostModalRenderer = () => {
    const [modalOpen, _setModalOpen] = useAtom(createPostModalOpenAtom);

    return (
        <AnimatePresence>
            {modalOpen && <CreatePostModal />}
        </AnimatePresence>
    );
}
