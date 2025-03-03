import { Navbar } from "./components/Navbar";
import { PostsSection } from "./components/PostsSection";
import { PostModalRenderer } from "./components/PostModal";
import { CreatePostModalRenderer } from "./components/CreatePostModal";


export default function Home() {
    return (
        <main className="bg-white min-h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden">
            <Navbar />
            <section className="flex justify-center flex-1">
                <PostsSection />
            </section>
            <PostModalRenderer />
            <CreatePostModalRenderer />
        </main>
    );
}
