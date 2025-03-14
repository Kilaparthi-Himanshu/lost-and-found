'use client';

import React from 'react';
import { Post } from './Post';
import { Post as AtomPostInterface } from '../Atoms/atoms';
import { useAtom } from 'jotai';
import { postsAtom, searchAtom, userIdAtom } from '../Atoms/atoms';
import { PostsLoadingSkeleton } from './PostsLoadingSkeleton';
import { useGetUserIdAndPosts } from '../utils/hooks/useGetUserIdandPosts';

export const PostsSection = () => {
    const [posts, setPosts] = useAtom<AtomPostInterface[]>(postsAtom);
    const [search, setSearch] = useAtom(searchAtom);
    const [userId, setUserId] = useAtom(userIdAtom);

    const { isLoading } = useGetUserIdAndPosts({
        onSuccess: (data) => {
            if (data?.posts && data?.user) {
                setPosts(data.posts);
                setUserId(data.user.id);
            }
        },
        onError: (error) => {
            console.error('Failed to fetch Posts/User', error);
        }
    }); // Example of using hook which calls query

    return (

        <div className={`flex flex-col gap-4 max-sm:border-0 border-x-2 border-neutral-300 w-full sm:w-[600px] md:w-[700px] xl:w-[1000px] p-10 md:p-14 md:pt-6 pt-4 h-[calc(100vh-64px)] ${isLoading ? 'overflow-hidden' : 'overflow-y-auto'} custom-scrollbar dark:border-neutral-600`}>
            {
                !isLoading ? (
                    posts!
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
