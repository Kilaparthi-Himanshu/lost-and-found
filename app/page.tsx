import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { PostsSection } from "./components/PostsSection";

export default function Home() {
    return (
        <main className="bg-white min-h-screen flex flex-col overflow-hidden">
            <Navbar />
            <section className="flex justify-center flex-1">
                <PostsSection />
            </section>
        </main>
    );
}
