import { useEffect, RefObject } from "react";

type RefTypes = {
    ref: RefObject<HTMLDivElement | null>;
    setOpen: (open: boolean) => void;
}

export function handleClickOutside({ref, setOpen}: RefTypes) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
}