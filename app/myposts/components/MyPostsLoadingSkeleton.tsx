import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

export const MyPostsLoadingSkeleton = () => {
    return (
        <>
            <div className='border border-neutral-400 h-full w-full rounded-lg p-2 flex max-xl:flex-col gap-2 bg-neutral-100 hover:bg-sky-100 cursor-pointer transition-[background]'> 
                <div
                    className='rounded-lg object-cover h-full max-xl:w-full max-w-[400px] max-xl:max-w-full shadow-lg w-90'
                    // src={post.img}
                >
                    <Skeleton className="h-full w-full" />
                </div>
                <div className='border border-neutral-400 flex-1 rounded-lg max-sm:py-2 p-4 font-medium flex flex-col h-full text-lg justify-between gap-2'>
                    <div className='w-[40%] h-10 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='w-[90%] h-40 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-40" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-15" />
                    </div>
                </div>
            </div>

            <div className='border border-neutral-400 h-full w-full rounded-lg p-2 flex max-xl:flex-col gap-2 bg-neutral-100 hover:bg-sky-100 cursor-pointer transition-[background]'> 
                <div
                    className='rounded-lg object-cover h-full max-xl:h-80 max-xl:w-full max-w-[400px] max-xl:max-w-full shadow-lg w-60'
                >
                    <Skeleton className="h-full w-full" />
                </div>
                <div className='border border-neutral-400 flex-1 rounded-lg max-sm:py-2 p-4 font-medium flex flex-col h-full text-lg justify-between gap-2'>
                    <div className='w-[30%] h-10 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='w-[90%] h-45 text-2xl'> 
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-60" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-15" />
                    </div>
                </div>
            </div>

            <div className='border border-neutral-400 h-full w-full rounded-lg p-2 flex max-xl:flex-col gap-2 bg-neutral-100 hover:bg-sky-100 cursor-pointer transition-[background]'> 
                <div
                    className='rounded-lg object-cover h-full max-xl:h-80 max-xl:w-full max-w-[400px] max-xl:max-w-full shadow-lg w-120'
                >
                    <Skeleton className="h-full w-full" />
                </div>
                <div className='border border-neutral-400 flex-1 rounded-lg max-sm:py-2 p-4 font-medium flex flex-col h-full text-lg justify-between gap-2'>
                    <div className='w-[60%] h-10 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='w-[90%] h-20 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-18" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-15" />
                    </div>
                </div>
            </div>

            <div className='border border-neutral-400 h-full w-full rounded-lg p-2 flex max-xl:flex-col gap-2 bg-neutral-100 hover:bg-sky-100 cursor-pointer transition-[background]'> 
                <div
                    className='rounded-lg object-cover h-full max-xl:w-full max-w-[400px] max-xl:max-w-full shadow-lg w-90'
                    // src={post.img}
                >
                    <Skeleton className="h-full w-full" />
                </div>
                <div className='border border-neutral-400 flex-1 rounded-lg max-sm:py-2 p-4 font-medium flex flex-col h-full text-lg justify-between gap-2'>
                    <div className='w-[40%] h-10 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='w-[90%] h-40 text-2xl'>
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-40" />
                    </div>
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-15" />
                    </div>
                </div>
            </div>
        </>
    );
}
