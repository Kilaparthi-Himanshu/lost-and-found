'use client';

import React from 'react';
import { Post } from './Post';
import Nature from '../images/Nature.jpg';
import Abstract from '../images/Abstract_1.jpg';
import Bag from '../images/Bag.png';
import { useAtom } from 'jotai';
import { postsAtom, searchAtom } from '../Atoms/atoms';

export const PostsSection = () => {
    const [posts, setPosts] = useAtom(postsAtom);
    const [search, setSearch] = useAtom(searchAtom);

    return (
        <div className='flex flex-col gap-4 border-x-2 w-full sm:w-[600px] md:w-[700px] xl:w-[1000px] p-10 md:p-14 md:pt-6 pt-4 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar'>
            {posts
                .filter(post => post.name.toLowerCase().includes(search.toLowerCase()))
                .map(post => (
                    <Post post={post} key={post.name} />
                ))
            }
        </div>
    );
}
