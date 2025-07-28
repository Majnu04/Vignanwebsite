// src/components/AboutVIIT.tsx

import React from 'react';

// Static data for the announcements list.
const announcements = [
  { date: '2025-08-10', title: 'B.Tech First Year Orientation Schedule', path: '#' },
  { date: '2025-07-25', title: 'Final Phase EAPCET-2025 Counselling Dates', path: '#' },
  { date: '2025-07-15', title: 'M.Tech & MBA Spot Admissions Open', path: '#' },
  { date: '2025-06-30', title: 'Results of Innovision 2025 Tech Fest', path: '#' },
  { date: '2025-06-15', title: 'Hostel Allotment List for Senior Students', path: '#' },
  { date: '2025-05-20', title: 'VIIT Online Applications for Lateral Entry', path: '#' },
];

const About: React.FC = () => {
  return (
    <section className="bg-gray-50 pt-16 sm:pt-24 pb-0 sm:pb-0 mb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-0 pb-0">
        {/* Main Flexbox container for the two columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT Column: About VIIT (Takes up 40% of the space) */}
          <div className="lg:w-[40%] flex-shrink-0">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              About VIIT
            </h2>
            
            {/* Container for video and text, with a max-width to keep it compact */}
            <div className="max-w-xl"> {/* max-w-xl will constrain the width */}
              {/* Video Player */}
              <div className="mb-8">
                <div className="aspect-video w-full rounded-md overflow-hidden shadow-xl border border-gray-200">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/DqCDVElxaL8?si=JLtRG1XN-S7uFbKG&autoplay=1&mute=1"
                    title="Vignan (VIIT) College Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Paragraph Text - Justified and no drop cap */}
              <p className="text-base text-gray-700 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
                Vignan's Institute of Information Technology (VIIT) has been a forerunner in delivering quality education. Consistently ranked among the top educational institutes in the country, the Vignan group of institutions have had a proud tradition of pursuing knowledge and excellence. In keeping with this tradition, the leadership at VIIT resonates a dynamic blend of academic initiative and industry partnership with a vision of creating one of the finest academic destinations in the world.
              </p>
            </div>
          </div>

          {/* RIGHT Column: Announcements (Takes up 60% of the space) */}
          <div className="lg:w-[60%]">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              ANNOUNCEMENTS
            </h2>
            <div className="space-y-6">
              {announcements.map((item, index) => (
                <div key={index}>
                  <a href={item.path} className="group block">
                    <p className="text-xs font-medium text-gray-500 mb-1">{item.date}</p>
                    <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 leading-snug">
                      {item.title}
                    </p>
                  </a>
                  {index < announcements.length - 1 && <hr className="mt-6 border-gray-300" />}
                </div>
              ))}
            </div>
            <a href="#" className="inline-flex items-center mt-8 font-bold text-red-700 hover:text-red-800 transition-colors text-sm">
              View More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;