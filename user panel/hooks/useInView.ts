import { useState, useEffect, useRef, RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useInView = (options: Options = { triggerOnce: true, threshold: 0.1 }): [RefObject<any>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.disconnect();
        }
      } else {
        if (!options.triggerOnce) {
           setIsInView(false);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if(ref.current) {
          observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};