import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useAtom } from 'jotai';
import { searchAtom } from '../Atoms/atoms';
import { RxCrossCircled } from "react-icons/rx";

export const Search = () => {
    const [search, setSearch] = useAtom(searchAtom);

    return (
        <div className='bg-neutral-200 h-10 my-auto w-[300px] md:w-[500px] lg:w-[600px] rounded-3xl flex items-center justify-center p-3 hover:bg-sky-200 focus-within:border-2 focus-within:border-sky-500 border-2 border-transparent transition-[background,border] max-sm:w-max'>
            <form className='w-full'>
                <input placeholder='Search Lost Items' value={search} id="searchInput" className='w-full border-0 outline-0 font-medium text-[17px]' type="text" onChange={(e) => setSearch(e.target.value)} autoComplete='off' />
            </form>
            <div>
                {search.length ? 
                    <RxCrossCircled className='size-6 cursor-pointer text-emerald-600' onClick={() => setSearch('')} />
                    : 
                    <FaSearch className='size-5 text-emerald-600' />
                }
            </div>
        </div>
    );
}
