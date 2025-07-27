
import React, {useRef} from 'react';
import type { NewsItem } from '../types';
import { useInView } from '../hooks/useInView';
import { useShine } from '../hooks/useShine';
import ColorfulArrow from './icons/ColorfulArrow';
import GradientHeaderBg from './icons/GradientHeaderBg';
import ImageWithFallback from './ImageWithFallback';

const newsItems: NewsItem[] = [
  { id: 1, title: 'AI in Wireless Tech Workshop', date: 'Upcoming', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', category: 'Workshop' },
  { id: 2, title: 'Full Stack Development Bootcamp', date: 'Upcoming', imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop', category: 'Bootcamp' },
  { id: 3, title: 'National Entrepreneurship Development Summit', date: 'Upcoming', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', category: 'Conference' },
];

const NewsCard: React.FC<{ item: NewsItem, inView: boolean, delay: string }> = ({ item, inView, delay }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    useShine(cardRef);

    return (
    <div ref={cardRef} className={`card-shine bg-white rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: delay }}>
        <div className="overflow-hidden h-56">
            <ImageWithFallback 
                src={item.imageUrl}
                alt={item.title}
                fallbackCategory="general"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
            />
        </div>
        <div className="p-6">
            <p className="text-sm font-medium text-blue-600">{item.category}</p>
            <h3 className="mt-2 text-lg font-bold text-blue-900 leading-tight group-hover:text-blue-700 transition-colors duration-300 h-16">
                {item.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{item.date}</p>
        </div>
    </div>
    )
};


const NewsAndEvents: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-blue-50/60 py-20 sm:py-28" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="max-w-xl">
                <GradientHeaderBg theme="blue">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
                        News & Events
                    </h2>
                </GradientHeaderBg>
                <p className="mt-4 text-lg text-gray-600">
                    Stay updated with the latest happenings, workshops, and events at Vignan.
                </p>
            </div>
            <a href="#" className="mt-4 md:mt-0 whitespace-nowrap inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 group text-lg">
                View All Events
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    <ColorfulArrow size={20} />
                </span>
            </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
                <NewsCard key={item.id} item={item} inView={inView} delay={`${index*100}ms`} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndEvents;
