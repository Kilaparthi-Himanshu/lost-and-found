import { atom } from 'jotai';
import Nature from '../images/Nature.jpg';
import Abstract from '../images/Abstract_1.jpg';
import Bag from '../images/Bag.png'
import { PostProps } from '../components/Post';
import { StaticImageData } from 'next/image';

interface Post {
    img: StaticImageData;
    name: string;
    description: string;
    location: string;
    status: string;
    email: string;
}

export const searchAtom = atom<string>('');

export const postsAtom = atom([
    {
        "img": Nature,
        "name": "Nature",
        "description": "A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.",
        "location": "KRC",
        "status": "Lost",
        "email": "hkilapar2@gitam.in"
    },
    {
        "img": Bag,
        "name": "Black Bag",
        "description": "A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.",
        "location": "Cotton Bhavan",
        "status": "Lost",
        "email": "hkilapar2@gitam.in"
    },
    {
        "img": Abstract,
        "name": "Abstract",
        "description": "A Black Bag with a steel water bottle is lost during the lunch hours on Monday of the 2nd week of March 2025.",
        "location": "ICT",
        "status": "Found",
        "email": "hkilapar2@gitam.in"
    }
]);

export const modalOpenAtom = atom<boolean>(false);

export const selectedPostAtom = atom<Post | null>(null);