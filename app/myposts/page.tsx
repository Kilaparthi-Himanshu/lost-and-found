import React from 'react';
import { Navbar } from '../components/Navbar';
import { CreatePostSpinnerRenderer } from '../components/CreatePostSpinner';
import { MyPostsSection } from './components/MyPostsSection';
import { CreatePostModalRenderer } from '../components/CreatePostModal';
import { PostModalRenderer } from '../components/PostModal';
import { ReactQueryProvider } from '../components/ReactQueryProvider';

export default function page () {
    return (
        <ReactQueryProvider>
            <main className="bg-white dark:bg-black min-h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden">
                <Navbar />
                <section className="flex justify-center flex-1">
                    <MyPostsSection />
                </section>
                <PostModalRenderer />
                <CreatePostModalRenderer />
                <CreatePostSpinnerRenderer />
            </main>
        </ReactQueryProvider>
    );
}
