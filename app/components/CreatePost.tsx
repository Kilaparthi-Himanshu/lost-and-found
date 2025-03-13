'use client';

import React from 'react';
import { CirclePlus } from 'lucide-react';
import { createPostModalOpenAtom } from '../Atoms/atoms';
import { useAtom } from 'jotai';

export const CreatePost = () => {
    const [modalOpen, setModalOpen] = useAtom(createPostModalOpenAtom);

    return (
        <button className='flex ml-4 max-sm:ml-2 mr-2 h-full items-center' title='Create Post' onClick={() => setModalOpen(prev => !prev)}>
            <CirclePlus className='size-10 text-neutral-700 dark:text-white cursor-pointer active:scale-90 transition-[scale]' />
        </button>
    );
}
