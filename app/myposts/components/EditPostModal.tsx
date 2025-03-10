'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { PostProps } from '@/app/components/Post';
import { useAtom } from 'jotai';
import { editPostModalOpenAtom, userIdAtom, createPostSpinnerAtom } from '../../Atoms/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Image } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { redirect, useRouter } from "next/navigation";

export const EditPostModal = ({post}: PostProps) => {

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [modalOpen, setModalOpen] = useAtom(editPostModalOpenAtom);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [userId, setUserId] = useAtom(userIdAtom);
    const [createPostSpinner, setCreatePostSpinner] = useAtom(createPostSpinnerAtom);

    useEffect(() => {
        setImageUrl(post.img);
    }, []);

    const editPost = async (formData: FormData) => {
        try {
            const supabase = createClient();

            if (image) {
                const file = image;
                if (!file) return;
                const fileName = `${file.name}`;
                const filePath = `user_uploads/${post.post_id}/${fileName}`;
                const folderPath = `user_uploads/${post.post_id}/`;

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

                const { error: photoUpdateError } = await supabase.storage
                    .from('photos')
                    .upload(filePath, file);

                if (photoUpdateError) {
                    throw photoUpdateError;
                }
            }

            const data = {
                name: formData.get('name') as string,
                date_lost: formData.get('date_lost') as string,
                time: formData.get('time') as string,
                description: formData.get('description') as string,
                location: formData.get('location') as string,
                status: formData.get('status') as string,
                email: formData.get('email') as string,
                post_id: post.post_id,
                user_id: userId
            }

            const { error: updateError } = await supabase
                .from('posts')
                .update([data])
                .eq("post_id", post.post_id);

            if (updateError) {
                console.error("Supabase Update Error:", updateError);
                redirect('/error')
            }

            setModalOpen(false);
            setCreatePostSpinner(false);
            window.location.reload();
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // console.log(file);
            setImage(file);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        if (!image && !imageUrl) {
            alert("Please upload an image before submitting.");
            return;
        }

        setCreatePostSpinner(true);

        const formData = new FormData(event.currentTarget);

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        // const imageFile = formData.get('image') as File;
        // if (imageFile && imageFile.name) {
        //     console.log('Image selected:', imageFile.name);
        // }
        editPost(formData);
    }

    return (
        <motion.div className='bg-[rgba(43,43,43,0.3)] dark:bg-[rgba(10,10,10,0.2)] absolute w-full h-full flex items-center justify-center py-9 px-2 left-0 top-0 z-200' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                <motion.form className='bg-white w-[800px] h-max rounded-lg flex flex-col items-center p-4 font-quicksand gap-4 max-h-[99dvh] absolute max-w-[99dvw] max-sm:scale-95 max-sm:scale-y-100 border border-neutral-400 dark:border-neutral-500 overflow-y-auto overflow-x-hidden custom-scrollbar dark:[background-color:_rgb(30,_30,_30)]' initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }} onSubmit={handleSubmit}>
                    <div className='absolute rounded bg-red-500 hover:bg-red-700 right-2 cursor-pointer text-white z-20 active:scale-90 top-2 max-sm:scale-130 max-sm:active:scale-110 transition-[scale]' onClick={() => setModalOpen(false)}>
                        <X />
                    </div>

                    <div className='rounded h-[180px] w-[300px] sm:w-[400px] sm:h-[240px] cursor-pointer border-2 border-stone-400 border-dashed flex items-center justify-center active:border-blue-400 transition-[border] min-h-[90px] landscape:min-h-50'
                        onClick={() => imageInputRef.current?.click()}
                        style={{ 
                            backgroundImage: image ? `url(${URL.createObjectURL(image)})` : imageUrl ? `url(${imageUrl})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        title={image || imageUrl ? 'Click to Change Image' : 'Upload Image'}
                    >
                        <input type="file" name="image" className='hidden' ref={imageInputRef} onChange={handleImageChange}/>
                        <Image className={`${(image || imageUrl) && 'hidden'}`} size={40} />
                        <p className={`font-bold ml-2 text-xl ${(image || imageUrl) && 'hidden'}`}>
                            Upload An Image
                        </p>
                    </div>

                    <div className='bg-neutral-400 h-[1px] w-[96%] self-center sm:mt-4' />

                    <div className='flex-1 w-full rounded-lg grid grid-cols-[160px_1fr] gap-y-4 p-4 max-sm:p-1 font-medium text-xl max-sm:text-lg items-center max-sm:grid-cols-[100px_1fr] text-wrap'>
                        <span>Title:</span>
                        <input required name="name" placeholder="Item's name" type="text" className='text-lg font-medium p-2 w-full max-sm:max-w-max h-10 border-1 border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' defaultValue={post.name} />

                        <span className='max-sm:text-[17px]'>Description:</span>
                        <textarea required name="description" placeholder='Describe the item' className='text-lg font-medium p-2 w-full max-sm:max-w-max border border-stone-500 rounded resize-none h-33 custom-scrollbar outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' maxLength={220} defaultValue={post.description} />

                        <span>Email:</span>
                        <input required name="email" placeholder='Enter contact email address' type="text" className='text-lg font-medium p-2 w-full max-sm:max-w-max h-10 border border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' defaultValue={post.email} />

                        <span>Location:</span>
                        <input required name="location" placeholder='Where was it lost?' type="text" className='text-lg font-medium p-2 w-70 max-sm:max-w-max h-10 border border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' defaultValue={post.location} />

                        <span>Date:</span>
                        <input required name="date_lost" type="date" className='text-lg font-medium p-2 w-50 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' defaultValue={post.date_lost} />

                        <span>Time:</span>
                        <input required name="time" type="time" className='text-lg font-medium p-2 w-40 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' defaultValue={post.time} />

                        <span>Status:</span>
                        <div className='flex justify-between max-sm:justify-start'>
                            <select required name="status" className='text-lg font-medium p-2 w-30 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' defaultValue={post.status}>
                                <option value="Lost" title="You have lost an item">Lost</option>
                                <option value="Find" title="You have found someone's item">Find</option>
                            </select>
                            <button className='bg-green-400 active:bg-green-500 p-2 rounded text-white cursor-pointer active:scale-95 transition-[scale,background] duration-50 font-bold max-sm:ml-6 h-10 flex items-center' type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </motion.form>
        </motion.div>
    );
}
