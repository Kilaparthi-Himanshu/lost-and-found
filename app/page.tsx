'use client';

import { Navbar } from "./components/Navbar";
import { PostsSection } from "./components/PostsSection";
import { useAtom } from "jotai";
import { modalOpenAtom, selectedPostAtom } from "./Atoms/atoms";
import { PostModal } from "./components/PostModal";
import { AnimatePresence } from "framer-motion";

export default function Home() {
    const [modalOpen] = useAtom(modalOpenAtom);
    const [selectedPost] = useAtom(selectedPostAtom);

    return (
        <main className="bg-white min-h-screen flex flex-col overflow-hidden">
            <Navbar />
            <section className="flex justify-center flex-1">
                <PostsSection />
            </section>
            <AnimatePresence>
                {modalOpen && selectedPost && <PostModal post={selectedPost} />}
            </AnimatePresence>
        </main>
    );
}
