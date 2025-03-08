import React from 'react';
import { Navbar } from '../components/Navbar';
import { CreatePostModalRenderer } from '../components/CreatePostModal';
import { CreatePostSpinnerRenderer } from '../components/CreatePostSpinner';
import { MyPostsSection } from './components/MyPostsSection';

export default function page () {
    return (
        <main className="bg-white min-h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden">
            <Navbar />
            <section className="flex justify-center flex-1">
                <MyPostsSection />
            </section>
            <CreatePostModalRenderer />
            <CreatePostSpinnerRenderer />
        </main>
    );
}
