
import { useState, useEffect } from 'react';

export const useScrollProgress = (): number => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', updateScrollProgress);

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return scrollProgress;
};
