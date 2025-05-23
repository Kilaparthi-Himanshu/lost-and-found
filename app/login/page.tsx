'use client';

import { login, signup } from './actions'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userAction, setUserAction] = useState<string>('Login');
    const [signedup, setSignedup] = useState(false);

    function changeUserAction(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setUserAction(userAction => userAction === 'Signup' ? 'Login' : 'Signup')
    }

    return (
        <div className="w-screen h-[100dvh] floating-bubbles">
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
        <div className='w-screen h-[100dvh] backdrop-blur-sm flex items-center justify-center'>
            <form className="border-2 border-neutral-200 w-100 h-120 rounded-lg flex flex-col  items-center p-7 pt-5 bg-white bg-clip-padding backdrop-filter backdrop-blur-lg px-8 mx-2" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
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
                <button className='w-40 h-10 font-bold border border-stone-600 self-center rounded mt-2 text-xl text-stone-600 cursor-pointer shadow-sm active:scale-95 transition-[scale,background] bg-[rgba(255,_255,_255,_0.4)] hover:bg-[rgba(255,_255,_255,_0.6)]' formAction={
                    async (formData: FormData) => {
                        if (userAction === 'Signup') {
                            await signup(formData);
                            setSignedup(true);
                        } else {
                            await login(formData);
                        }
                    }
                }>
                    {userAction}
                </button>
                </div>

                {signedup &&
                    <span className='text-lg underline underline-offset-2 decoration-amber-300 font-semibold'>
                        Verification Email Has been Sent!
                    </span>
                }

                <div className='flex items-center justify-center gap-3 text-stone-100'>
                    {userAction === 'Signup' ? 'Already have an account?' : `Don't have an account?`}
                    <button onClick={changeUserAction} className='cursor-pointer hover:underline text-blue-600 font-medium'>
                        {userAction === 'Signup' ? 'Login' : 'Signup'}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}