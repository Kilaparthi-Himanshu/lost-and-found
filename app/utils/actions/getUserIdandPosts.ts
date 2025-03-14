"use server";

import { createClient } from "../supabase/server";
import { Post as PostTypes } from '../../Atoms/atoms';

async function createSignedUrl(name: string, post_id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
        .from('photos')
        .createSignedUrl(`user_uploads/${post_id}/${name}`, 60 * 60);

    if (error) {
        console.error('Error generating signed url', error);
        return null;
    }
    return data.signedUrl;
}

export const getUserIdAndPosts = async () => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) return;

    const {data: postsData, error} = await supabase
        .from('posts')
        .select('*');

    if (error || !postsData) return;

    const updatedPosts: PostTypes[] = await Promise.all(
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

    return {user, posts: updatedPosts};
}