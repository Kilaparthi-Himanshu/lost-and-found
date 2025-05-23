'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { PostProps } from './Post';
import { useAtom } from 'jotai';
import { createPostModalOpenAtom, userIdAtom, createPostSpinnerAtom } from '../Atoms/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Image } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { redirect } from "next/navigation";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const CreatePostModal = () => {

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [modalOpen, setModalOpen] = useAtom(createPostModalOpenAtom);
    const [image, setImage] = useState<File | null>(null);
    const [userId, setUserId] = useAtom(userIdAtom);
    const [createPostSpinner, setCreatePostSpinner] = useAtom(createPostSpinnerAtom);

    const queryClient = useQueryClient();
    const { mutateAsync: addPost } = useMutation({
        mutationFn: (formData: FormData) => createPost(formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    const createPost = async (formData: FormData) => {
        try {
            const supabase = createClient();
            const file = image;
            if (!file) return;
            const post_id = Math.random();
            const fileName = `${file.name}`;
            const filePath = `user_uploads/${post_id}/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('photos')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const data = {
                name: formData.get('name') as string,
                date_lost: formData.get('date_lost') as string,
                time: formData.get('time') as string,
                description: formData.get('description') as string,
                location: formData.get('location') as string,
                status: formData.get('status') as string,
                email: formData.get('email') as string,
                post_id: post_id,
                user_id: userId
            }

            const { error: insertError } = await supabase
                .from('posts')
                .insert([data]);

            if (insertError) {
                console.error("Supabase Insert Error:", insertError);
                redirect('/error')
            }

            setModalOpen(false);
            setCreatePostSpinner(false);
            // window.location.reload();
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setImage(file);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        if (!image) {
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
        addPost(formData);
    }

    useEffect(() => {
        if (!userId) {
            async function fetchId() {
                const supabase = createClient();
                const {data: {user}} = await supabase.auth.getUser();
                setUserId(user!.id);
                // console.log(user!.id);
            }
            fetchId();
        }
    }, []);

    return (
        <motion.div className='bg-[rgba(43,43,43,0.3)] dark:bg-[rgba(10,10,10,0.6)] absolute w-full h-full flex items-center justify-center py-9 px-2' initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                <motion.form className='bg-white w-[800px] h-max rounded-lg flex flex-col items-center p-4 font-quicksand gap-4 max-h-[99dvh] absolute max-w-[99dvw] max-sm:scale-95 max-sm:scale-y-100 border border-neutral-400 dark:border-neutral-500 overflow-y-auto overflow-x-hidden custom-scrollbar dark:[background-color:_rgb(30,_30,_30)]' initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.1 }} onSubmit={handleSubmit}>
                    <div className='absolute rounded bg-red-500 hover:bg-red-700 right-2 cursor-pointer text-white z-20 active:scale-90 top-2 max-sm:scale-130 max-sm:active:scale-110 transition-[scale]' onClick={() => setModalOpen(false)}>
                        <X />
                    </div>

                    <div className='rounded h-[180px] w-[300px] sm:w-[400px] sm:h-[240px] cursor-pointer border-2 border-stone-400 border-dashed flex items-center justify-center active:border-blue-400 transition-[border] min-h-[90px] landscape:min-h-50'
                        onClick={() => imageInputRef.current?.click()}
                        style={{ 
                            backgroundImage: image ? `url(${URL.createObjectURL(image)})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        title={image ? 'Click to Change Image' : 'Upload Image'}
                    >
                        <input type="file" name="image" className='hidden' ref={imageInputRef} onChange={handleImageChange} />
                        <Image className={`${image && 'hidden'}`} size={40} />
                        <p className={`font-bold ml-2 text-xl ${image && 'hidden'}`}>Upload An Image</p>
                    </div>

                    <div className='bg-neutral-400 h-[1px] w-[96%] self-center sm:mt-4' />

                    <div className='flex-1 w-full rounded-lg grid grid-cols-[160px_1fr] gap-y-4 p-4 max-sm:p-1 font-medium text-xl max-sm:text-lg items-center max-sm:grid-cols-[100px_1fr] text-wrap'>
                        <span>Title:</span>
                        <input required name="name" placeholder="Item's name" type="text" className='text-lg font-medium p-2 w-full max-sm:max-w-max h-10 border-1 border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                        <span className='max-sm:text-[17px]'>Description:</span>
                        <textarea required name="description" placeholder='Describe the item' className='text-lg font-medium p-2 w-full max-sm:max-w-max border border-stone-500 rounded resize-none h-33 custom-scrollbar outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' maxLength={220} />

                        <span>Email:</span>
                        <input required name="email" placeholder='Enter contact email address' type="text" className='text-lg font-medium p-2 w-full max-sm:max-w-max h-10 border border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                        <span>Location:</span>
                        <input required name="location" placeholder='Where was it lost?' type="text" className='text-lg font-medium p-2 w-70 max-sm:max-w-max h-10 border border-stone-500 rounded outline-none focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation' />

                        <span>Date:</span>
                        <input required name="date_lost" type="date" className='text-lg font-medium p-2 w-50 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation white-picker' />

                        <span>Time:</span>
                        <input required name="time" type="time" className='text-lg font-medium p-2 w-40 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation white-picker' />

                        <span>Status:</span>
                        <div className='flex justify-between max-sm:justify-start'>
                            <select required name="status" className='text-lg font-medium p-2 w-30 h-10 border border-stone-500 rounded outline-none cursor-pointer focus:border-blue-600 focus:border-1 focus:ring-0 focus:ring-blue-500 ring-offset-3 focus:ring-offset-blue-300 input-border-animation dark:[background-color:_rgb(40,_40,_40)]'>
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

export const CreatePostModalRenderer = () => {
    const [modalOpen, _setModalOpen] = useAtom(createPostModalOpenAtom);

    return (
        <AnimatePresence>
            {modalOpen && <CreatePostModal />}
        </AnimatePresence>
    );
}

