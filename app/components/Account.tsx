import React, { use, useEffect, useRef, useState } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { handleClickOutside } from '../functions/functions';
import { createClient } from '../utils/supabase/client';
import { User as UserType }from '@supabase/supabase-js';
import { LogOut, Mail, User, Calendar } from 'lucide-react';
import { logout } from '../login/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFillFilePostFill } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { usePathname, useRouter, redirect } from 'next/navigation';
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { LuPaintRoller } from "react-icons/lu";

export const Account = () => {
    const [accountModalOpen, setAccountModalOpen] = useState(false);
    const settingsModalRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState<number>();

    const pathname = usePathname();
    const router = useRouter();

    const handleRedirect = () => {
        const newPath = pathname === "/" ? "/myposts" : "/";
        window.location.href = newPath;
    };

    const updateTheme = (newTheme: string) => {
        const root = window.document.documentElement;

        // Add class to prevent transitions
        root.classList.add('[&_*]:!transition-none');

        // Remove theme
        root.classList.remove('light', 'dark');

        // Add new theme
        if (newTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(newTheme);
        }
        localStorage.setItem('theme', newTheme);

        // Remove the transition-blocking class after a short delay
        setTimeout(() => {
            root.classList.remove('[&_*]:!transition-none');
        }, 0);
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            updateTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        async function fetchUserData() {
            try {
                setLoading(true);
                const supabase = createClient();
                const { data: { user }, error } = await supabase.auth.getUser();
                // console.log(user);

                if (error) {
                    console.error('Error fetching user:', error);
                } else {
                    setUser(user);
                    const timestamp = String(user?.created_at);
                    const date = new Date(timestamp);

                    setMonth(date.toLocaleString("en-US", { month: "long" }));

                    setYear(date.getFullYear());

                    // console.log(`${month} ${year}`);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    handleClickOutside({ref: settingsModalRef, setOpen: setAccountModalOpen});

    return (
        <div className='flex mr-4 max-sm:mr-2 ml-2' ref={settingsModalRef}>
            <button>
                <MdAccountCircle className='size-10 text-neutral-700 dark:text-white cursor-pointer' onClick={() => setAccountModalOpen(prev => !prev)} title='Account' />
            </button>
            <AnimatePresence>
            {accountModalOpen && (
                <motion.div className='absolute w-80 rounded-lg right-8 top-14 bg-clip-padding backdrop-filter backdrop-blur-lg border border-neutral-300 dark:border-neutral-500 text-black font-quicksand flex flex-col items-center gap-2 font-medium overflow-hidden  drop-shadow-2xl dark:[box-shadow:_0px_0px_10px_rgba(200,_200,_200,_0.2)] z-200 [background-color:_rgba(255,_255,_255,_0.5)] dark:[background-color:_rgba(60,_60,_60,_0.7)]'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                >
                    <div className='bg-gradient-to-r from-blue-600 to-teal-400 dark:from-purple-700 dark:to-pink-500 p-4 flex justify-center w-full h-max'>
                        <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center text-gray-500 text-3xl border-4 border-white">
                            <User size={35} />
                        </div>
                    </div>
                    <div className='space-y-4 p-2 pt-4 h-full dark:text-white'>
                        <div className='flex flex-row space-x-3 items-center'>
                            <Mail className='text-blue-500 dark:text-blue-400' size={18} />
                            <span className="text-md">Email: <span className="text-blue-500 dark:text-blue-400">{user?.email}</span></span>
                        </div>

                        <div className='flex flex-row space-x-3 items-center'>
                            <Calendar className='text-blue-500 dark:text-blue-400' size={18} />
                            <span className="text-md">Member since: <span>{month} {year}</span></span>
                        </div>

                        <div className='flex flex-row space-x-3 items-center'>
                            {pathname === "/" ? (
                                <BsFillFilePostFill className='text-blue-500 dark:text-blue-400' size={18} />
                            ) : (
                                <FiHome className='text-blue-500 dark:text-blue-400' size={18} />
                            )}
                            <span onClick={handleRedirect} className="text-md cursor-pointer hover:underline hover:text-blue-500 dark:hover:text-blue-400">{pathname === "/" ? "My Posts" : "Home"}</span>
                        </div>

                        <div className='flex flex-row space-x-3 items-center'>
                            <LuPaintRoller className='text-blue-500 dark:text-blue-400' size={18} />
                            <p className='mr-4'>
                                Theme: 
                            </p>
                            <div className='flex gap-4 items-center'>
                                <MdSunny className='size-5 cursor-pointer rounded-full outline-2 outline-blue-400 outline-offset-2 dark:outline-0' onClick={() => updateTheme('light')} />
                                <IoMdMoon className='size-5 cursor-pointer rounded-full dark:outline-2 outline-blue-400 outline-offset-2' onClick={() => updateTheme('dark')} />
                            </div>
                        </div>

                        <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center space-x-2 transition duration-200 w-full cursor-pointer mb-2" onClick={logout} title='Logout'>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}
