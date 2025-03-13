'use client';

import React, { use, useState } from 'react';
import { editPostModalOpenAtom, modalOpenAtom, Post as PostFromAtoms, selectedEditPostAtom, selectedPostAtom, userIdAtom } from '../../Atoms/atoms';
import { useAtom } from 'jotai';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { createClient } from '@/app/utils/supabase/client';
import { useConfirmModal } from '@/app/hooks/useConfirmModal';
import { EditPostModal } from './EditPostModal';

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

export const MyPost = ({ post }: PostProps) => {
    const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);
    const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
    const {confirm, ConfirmModal} = useConfirmModal(
        "Delete", 
        "Cancel", 
        <>Are you sure you want to delete this post?<br />This action cannot be reversed.</>
    );
    const [editPostModalOpen, setEditPostModalOpen] = useAtom(editPostModalOpenAtom);
    const [selectedEditPost, setSelectedEditPost] = useAtom(selectedEditPostAtom);

    const handleClick = () => {
        setSelectedPost(post);
        setModalOpen(true);
    };

    const handelEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedEditPost(post);
        setEditPostModalOpen(true);
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const confirmedDelete = await confirm();

        if (!confirmedDelete) return;

        try {
            const folderPath = `user_uploads/${post.post_id}/`;
            // console.log(folderPath);

            const supabase = createClient();

            const { data: files } = await supabase
                .storage
                .from('photos')
                .list(folderPath);

            if (files && files.length > 0) {

                const filePaths = files.map(file => `${folderPath}${file.name}`);

                const { error } = await supabase
                    .storage
                    .from('photos')
                    .remove(filePaths);
                if (error) throw error;
            }

            // const { error: folderDeleteError } = await supabase
            //     .storage
            //     .from('photos')
            //     .remove([folderPath]);
            // if (folderDeleteError) throw folderDeleteError;
            // At present supabase deletes empty folder automatically so only need to delete its contents.

            const { error: tableDeleteError } = await supabase
                .from('posts')
                .delete()
                .match({post_id: post.post_id});
            if (tableDeleteError) throw tableDeleteError;

            window.location.reload();

        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <div className='border border-neutral-400 dark:border-neutral-600 dark:hover:bg-neutral-800 h-full w-full rounded-lg p-2 flex max-xl:flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-sky-100 cursor-pointer transition-[background] relative xl:max-h-100' onClick={handleClick}>
                <img
                    className='rounded-lg object-cover h-full max-xl:max-h-80 max-h-100 max-w-[400px] max-xl:max-w-full shadow-lg'
                    src={post.img}
                    alt="Picture of the author"
                />
                <div className='border border-neutral-400 flex-1 rounded-lg max-sm:py-2 p-4 font-medium flex flex-col h-full text-lg justify-between gap-2 w-full'>
                    <div className='font-bold text-2xl'>
                        {post.name}
                    </div>
                    <div className='font-normal line-clamp-4'>
                        {post.description}
                    </div>
                    <div>
                        Location: <a className='bg-blue-200 rounded p-1 px-2 w-max text-blue-600'>{post.location}</a>
                    </div>
                    <div>
                        Status: <a className={`bg-green-200 ${post.status === "Lost" && 'bg-red-200 text-red-600'} rounded p-1 px-2 w-max text-green-600`}>{post.status}</a>
                    </div>
                    <div className='absolute w-auto max-w-20 h-max gap-2 right-3 bottom-3 flex items-center justify-around max-sm:relative max-sm:mt-4 sm:m-2 border border-neutral-400 dark:border-neutral-600 p-1 rounded'>
                        <button onClick={handleDelete} className="cursor-pointer hover:text-red-500 active:scale-95">
                            <FaRegTrashCan size={20}/>
                        </button>
                        <button onClick={handelEdit} className="cursor-pointer hover:text-sky-500 active:scale-95">
                            <FaRegEdit size={20}/>
                        </button>
                    </div>
                </div>
            </div>
            <ConfirmModal />
            {editPostModalOpen && selectedEditPost && <EditPostModal post={selectedEditPost} />}
        </>
    );
}
