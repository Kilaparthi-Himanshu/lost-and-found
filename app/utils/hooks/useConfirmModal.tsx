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
                    <motion.div className='absolute top-0 left-0 bg-[rgba(43,43,43,0.3)] dark:bg-[rgba(10,10,10,0.6)] h-full w-full z-200 flex items-center justify-center' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                        <motion.div className='bg-white dark:bg-neutral-800 w-140 h-max py-8 rounded-lg mx-2 flex justify-center flex-col px-8 font-quicksand border border-neutral-400 shadow-lg max-sm:scale-97' initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
                            <div className="flex items-center w-full justify-between">
                                <p className="text-3xl font-bold text-red-500 font-sans">Warning:</p>
                                <FaRegTrashCan size={30} />
                            </div>
                            <p className='text-[22px] text-wrap h-max mt-4 font-sans'>{message}</p>
                            <div className='flex gap-4 justify-end font-medium mt-8 w-full'>
                                <button className='transition-[background] hover:bg-red-200 dark:hover:bg-red-700 border border-red-500 max-sm:px-8 px-10 py-2 rounded cursor-pointer active:bg-red-400 dark:active:bg-red-900 text-xl' onClick={handleCancel}>
                                    {antiActionMessage}
                                </button>
                                <button className='transition-[background] hover:bg-green-200 dark:hover:bg-green-700 border border-green-600 max-sm:px-8 px-10 py-2 rounded cursor-pointer active:bg-green-400 dark:active:bg-green-900 text-xl' onClick={handleConfirm}>
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
