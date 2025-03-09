'use client';

import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';

type ResolveFunction = (value: boolean) => void;

export const useConfirmModal = (
    actionMessage: string,
    antiActionMessage: string,
    message: React.ReactNode
) => {
    const [isOpen, setIsOpen] = useState(false);
    const [resolveRef, setResolveRef] = useState<ResolveFunction | null>(null);

    const confirm = () => {
        setIsOpen(true);

        return new Promise<boolean>(resolve => {
            setResolveRef(() => resolve);
            // With the above we can take reolve of the promise anywhere and use it wherever we want.
            // Actually resolve(true) returns a true value and resolve(false) returns a false value.
        });
    }

    const handleConfirm = () => {
        if (resolveRef) resolveRef(true);
        setIsOpen(false);
    }

    const handleCancel = () => {
        if (resolveRef) resolveRef(false);
        setIsOpen(false);
    }

    const ConfirmModal = () => {
        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div className='absolute top-0 left-0 bg-[rgba(43,43,43,0.3)] h-full w-full z-200 flex items-center justify-center' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                        <motion.div className='bg-white w-140 h-80 rounded-lg mx-2 flex justify-center items-center flex-col px-4 font-quicksand border border-neutral-400 shadow-lg' initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
                            <FaRegTrashCan size={60} />
                            <p className='text-2xl text-wrap text-center mt-10 font-sans'>{message}</p>
                            <div className='flex gap-10 font-medium mt-10'>
                                <button className='transition-[background] hover:bg-red-200 border border-red-500 px-6 py-2 rounded cursor-pointer active:bg-red-400 text-xl' onClick={handleCancel}>
                                    {antiActionMessage}
                                </button>
                                <button className='transition-[background] hover:bg-green-200 border border-green-600 px-6 py-2 rounded cursor-pointer active:bg-green-400 text-xl' onClick={handleConfirm}>
                                    {actionMessage}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return {confirm, ConfirmModal}
}
