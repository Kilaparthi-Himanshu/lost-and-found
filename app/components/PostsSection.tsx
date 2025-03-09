'use client';

import React, { useEffect } from 'react';
import { Post, PostProps } from './Post';
import { Post as AtomPostInterface } from '../Atoms/atoms';
import { useAtom } from 'jotai';
import { postsAtom, postsLoadingAtom, searchAtom, userIdAtom } from '../Atoms/atoms';
import { createClient } from '../utils/supabase/client';
import { PostsLoadingSkeleton } from './PostsLoadingSkeleton';

export const PostsSection = () => {
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
                .select('*');

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

            console.log(updatedPosts);
            setPosts(updatedPosts);
            setPostsLoading(false);
        }

        fetchUserIdAndSetPosts();
    }, []);

    return (

        <div className={`flex flex-col gap-4 max-sm:border-0 border-x-2 border-neutral-300 w-full sm:w-[600px] md:w-[700px] xl:w-[1000px] p-10 md:p-14 md:pt-6 pt-4 h-[calc(100vh-64px)] ${postsLoading ? 'overflow-hidden' : 'overflow-y-auto'} custom-scrollbar`}>
            {
                !postsLoading ? (
                    posts
                    .filter(post => post.name.toLowerCase().includes(search.toLowerCase()))
                    .reverse()
                    .map(post => (
                        <Post post={post} key={post.name} />
                    ))
                ) : (
                    <PostsLoadingSkeleton />
                )
            }
        </div>
    );
}
