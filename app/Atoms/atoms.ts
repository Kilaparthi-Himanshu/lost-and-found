import { atom } from 'jotai';

export interface Post {
    img: string;
    name: string;
    date_lost: string;
    time: string;
    description: string;
    location: string;
    status: string;
    email: string;
    post_id: string;
}

export const searchAtom = atom<string>('');

export const userIdAtom = atom<string>('');

export const postsAtom = atom<Post[]>([]);

export const modalOpenAtom = atom<boolean>(false);

export const createPostModalOpenAtom = atom<boolean>(false);

export const editPostModalOpenAtom = atom<boolean>(false);

export const selectedPostAtom = atom<Post | null>(null);

export const selectedEditPostAtom = atom<Post | null>(null);

export const postsLoadingAtom = atom<boolean>(false);

export const createPostSpinnerAtom = atom<boolean>(false);