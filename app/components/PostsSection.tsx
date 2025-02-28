import React from 'react';
import { Post } from './Post';
import Nature from '../images/Nature.jpg';
import Abstract from '../images/Abstract_1.jpg';
import Bag from '../images/Bag.png'

export const PostsSection = () => {
    const posts = [
        {
            "img": Nature,
            "name": "Black Bag",
            "description": "A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.",
            "location": "KRC",
            "status": "Unfound"
        },
        {
            "img": Abstract,
            "name": "Black Bag",
            "description": "A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.",
            "location": "ICT",
            "status": "Found"
        },
        {
            "img": Bag,
            "name": "Black Bag",
            "description": "A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.",
            "location": "Cotton Bhavan",
            "status": "Unfound"
        }
    ];

    return (
        <div className='flex flex-col gap-4 border-x-2 w-full sm:w-[600px] md:w-[700px] xl:w-[1000px] p-10 md:p-14 md:pt-4 pt-4 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar'>
            {posts.map((post) => (
                <Post post={post} key={post.name} />
            ))}
        </div>
    );
}
