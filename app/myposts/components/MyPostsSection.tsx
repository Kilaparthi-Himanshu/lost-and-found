'use client';

import React, { useEffect } from 'react';
import { Post as AtomPostInterface } from '../../Atoms/atoms';
import { useAtom } from 'jotai';
import { postsAtom, postsLoadingAtom, searchAtom } from '../../Atoms/atoms';
import { MyPost } from './MyPost';
import { MyPostsLoadingSkeleton } from './MyPostsLoadingSkeleton';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/app/utils/actions/getMyPosts';

export const MyPostsSection = () => {
    const [posts, setPosts] = useAtom<AtomPostInterface[]>(postsAtom);
    const [search, setSearch] = useAtom(searchAtom);

    const { data, isLoading } = useQuery({
        queryFn: () => getMyPosts(),
        queryKey: ["posts"],
        onSuccess: (data) => {
            if (data?.posts) {
                setPosts(data.posts);
            }
        },
        onError: (error) => {
            console.log("Failed to fetch My Posts: ", error);
        }
    }); // Example of using query directly

    return (

        <div className={`grid grid-cols-2 gap-4 w-full p-10 max-sm:p-2 md:p-14 md:pt-6 pt-4 max-h-[calc(100vh-64px)] ${isLoading ? 'overflow-hidden' : 'overflow-y-auto'} custom-scrollbar`}>
            {
                !isLoading ? (
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
