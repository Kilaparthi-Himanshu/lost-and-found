'use client';

import { Eye, EyeOff } from 'lucide-react'
import { login, signup } from './actions'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userAction, setUserAction] = useState<string>('Login');

    function changeUserAction(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setUserAction(userAction => userAction === 'Signup' ? 'Login' : 'Signup')
    }

    return (
        // <form>
        //   <label htmlFor="email">Email:</label>
        //   <input id="email" name="email" type="email" required />
        //   <label htmlFor="password">Password:</label>
        //   <input id="password" name="password" type="password" required />
        //   <button formAction={login}>Log in</button>
        //   <button formAction={signup}>Sign up</button>
        // </form>

        <div className="w-screen h-screen floating-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
        <div className="bubble bubble-9"></div>
        <div className="bubble bubble-10"></div>
        <div className="bubble bubble-11"></div>
        <div className="bubble bubble-12"></div>
        <div className='w-screen h-screen backdrop-blur-sm flex items-center justify-center'>
            <form className="border-2 w-100 h-120 rounded-lg flex flex-col  items-center p-7 pt-5 bg-white bg-clip-padding backdrop-filter backdrop-blur-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                <motion.label htmlFor="signup" className='flex-[0.3] text-2xl font-bold text-stone-100 underline'
                    key={userAction}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {userAction}
                </motion.label>
                <div className='w-full flex flex-col gap-2 flex-1'>
                    <label htmlFor="email" className='text-lg font-bold text-stone-100'>
                        Email
                    </label>
                    <input type="email" className='w-full h-10 bg-neutral-100 mb-4 border border-neutral-300 rounded outline-none text-stone-600 text-lg p-2 font-medium shadow-sm' id="email" name="email" required />
                    <label htmlFor="password" className='text-lg font-bold text-stone-100'>
                        Password
                    </label>
                    <div className='relative'>
                        <input type={`${showPassword ? 'text' : 'password'}`} className='w-full h-10 bg-neutral-100 mb-6 border border-neutral-300 rounded outline-none text-stone-600 text-lg p-2 pr-8 font-medium shadow-sm' id="password" name="password" required />
                        <div className='absolute right-2 top-[9px] cursor-pointer text-stone-500' onClick={() => setShowPassword(prev => !prev)}>
                            <motion.div
                                key={showPassword ? 'eye' : 'eyeOff'}
                                initial={{ opacity: 0}}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0}}
                                transition={{ duration: 0.3 }}
                            >
                                {showPassword ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
                            </motion.div>
                        </div>
                    </div>
                <button className='w-40 h-10 bg-neutral-100 font-bold border-stone-600 self-center rounded mt-2 text-xl text-stone-700 cursor-pointer shadow-sm active:scale-95 transition-[scale]' formAction={userAction === 'Signup' ? signup : login}>
                    {userAction}
                </button>
                </div>
                <div className='flex items-center justify-center gap-3 text-stone-100'>
                    {userAction === 'Signup' ? 'Already have an account?' : `Don't have an account?`}
                    <button onClick={changeUserAction} className='cursor-pointer hover:underline text-blue-600 font-medium'>
                        {userAction === 'Signup' ? 'Login' : `Signup`}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}