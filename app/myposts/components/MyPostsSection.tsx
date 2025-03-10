'use client';

import React, { useEffect } from 'react';
import { Post as AtomPostInterface } from '../../Atoms/atoms';
import { useAtom } from 'jotai';
import { postsAtom, postsLoadingAtom, searchAtom, userIdAtom } from '../../Atoms/atoms';
import { createClient } from '@/app/utils/supabase/client';
import { MyPost } from './MyPost';
import { MyPostsLoadingSkeleton } from './MyPostsLoadingSkeleton';

export const MyPostsSection = () => {
    const [posts, setPosts] = useAtom<AtomPostInterface[]>(postsAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [userId, setUserId] = useAtom(userIdAtom);
    const [postsLoading, setPostsLoading] = useAtom(postsLoadingAtom);

    useEffect(() => {
        async function createSignedUrl(name: string, post_id: string) {
            const supabase = createClient();
            const { data, error } = await supabase.storage
                .from('photos')
                .createSignedUrl(`user_uploads/${post_id}/${name}`, 60 * 60);

            if (error) {
                console.error('Error generating signed url', error);
                return null;
            }
            return data.signedUrl;
        }

        const fetchUserIdAndSetPosts = async () => {
            setPostsLoading(true);
            const supabase = createClient();
            const {data: {user}} = await supabase.auth.getUser();

            setUserId(user!.id);

            if (!user) return;

            const {data: postsData, error} = await supabase
                .from('posts')
                .select('*')
                .eq('user_id', user.id);

            if (error || !postsData) return;

            const updatedPosts: AtomPostInterface[] = await Promise.all(
                postsData.map(async post => {
                    const folderPath = `user_uploads/${post.post_id}/`;
                    const { data: fileList, error } = await supabase.storage
                        .from('photos')
                        .list(folderPath);

                    if (error || !fileList || fileList.length === 0) return post;

                    const imageUrl = await createSignedUrl(fileList[0].name, post.post_id);
                    return { ...post, img: imageUrl };
                })
            );

            // console.log(updatedPosts);
            setPosts(updatedPosts);
            setPostsLoading(false);
        }

        fetchUserIdAndSetPosts();
    }, []);

    return (
        <div className={`grid grid-cols-2 gap-4 w-full p-10 md:p-14 md:pt-6 pt-4 max-h-[calc(100vh-64px)] ${postsLoading ? 'overflow-hidden' : 'overflow-y-auto'} custom-scrollbar`}>
            {
                !postsLoading ? (
                    posts
                    .filter(post => post.name.toLowerCase().includes(search.toLowerCase()))
                    .reverse()
                    .map(post => (
                        <MyPost post={post} key={post.name} />
                    ))
                ) : (
                    <MyPostsLoadingSkeleton />
                )
            }
        </div>
    );
}
