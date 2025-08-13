// import React from 'react';
// import { useContext } from 'react';
// import { StoreContext } from '../storeContext/StoreContext';

// // Static data for the announcements list.
// // The list is duplicated here to create the seamless looping effect for the animation.
// // const announcements = [
// //   { date: '2025-08-10', title: 'B.Tech First Year Orientation Schedule', path: '#' },
// //   { date: '2025-07-25', title: 'Final Phase EAPCET-2025 Counselling Dates', path: '#' },
// //   { date: '2025-07-15', title: 'M.Tech & MBA Spot Admissions Open', path: '#' },
// //   { date: '2025-06-30', title: 'Results of Innovision 2025 Tech Fest', path: '#' },
// //   { date: '2025-06-15', title: 'Hostel Allotment List for Senior Students', path: '#' },
// //   { date: '2025-05-20', title: 'VIIT Online Applications for Lateral Entry', path: '#' },
// // ];

// const About: React.FC = () => {
//   // We duplicate the announcements to ensure the animation is smooth and has no gaps.
//   const {announcementList } = useContext(StoreContext);
//   const announcements = announcementList;
//   const extendedAnnouncements = [...announcements, ...announcements];

//   return (
//     <>
//       {/* 
//         This <style> block defines the CSS animation.
//         - 'scroll-vertical' is the animation name.
//         - It animates the 'transform' property from translateY(0) to translateY(-50%).
//         - translateY(-50%) moves the content up by half its total height. Since we
//           doubled the content, this creates a perfect, seamless loop.
//       */}
//       <style>
//         {`
//           @keyframes scroll-vertical {
//             0% {
//               transform: translateY(0);
//             }
//             100% {
//               transform: translateY(-50%);
//             }
//           }
//           .animate-scroll-vertical {
//             // animation: scroll-vertical 20s linear infinite;
//               display: inline-block;
//               animation: scroll-vertical 20s linear infinite;
//           }
//           .group-hover\\:pause-animation:hover .animate-scroll-vertical {
//             animation-play-state: paused;
//           }
//         `}
//       </style>

//       <section className="bg-gray-50 pt-6 sm:pt-8 pb-0 sm:pb-0 mb-0">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-0 pb-0">
//           <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
//             {/* LEFT Column: About VIIT (Unchanged) */}
//             <div className="lg:w-[40%] flex-shrink-0">
//               <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
//                 About VIIT
//               </h2>
//               <div className="max-w-xl">
//                 <div className="mb-8">
//                   <div className="aspect-video w-full rounded-md overflow-hidden shadow-xl border border-gray-200">
//                     <iframe
//                       width="100%"
//                       height="100%"
//                       src="https://www.youtube.com/embed/DqCDVElxaL8?si=JLtRG1XN-S7uFbKG&autoplay=1&mute=1"
//                       title="Vignan (VIIT) College Video"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                       referrerPolicy="strict-origin-when-cross-origin"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//                 <p className="text-base text-gray-700 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
//                   Vignan's Institute of Information Technology (VIIT) has been a forerunner in delivering quality education. Consistently ranked among the top educational institutes in the country, the Vignan group of institutions have had a proud tradition of pursuing knowledge and excellence. In keeping with this tradition, the leadership at VIIT resonates a dynamic blend of academic initiative and industry partnership with a vision of creating one of the finest academic destinations in the world.
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT Column: Announcements (Dynamically Scrolling) */}
// <div className="lg:w-[60%] flex flex-col">
//   <h2
//     className="text-2xl font-bold text-gray-900 tracking-tight mb-3 flex-shrink-0"
//     style={{ fontFamily: 'Georgia, serif' }}
//   >
//     ANNOUNCEMENTS
//   </h2>

//   {/* Scrollable container with fixed height */}
//   <div className="relative overflow-hidden h-[75vh]"> {/* adjust height as needed */}
//     <div className="animate-scroll-vertical space-y-3">
//       {extendedAnnouncements.map((item, index) => (
//         <div
//           key={index}
//           className="border-b border-gray-300 pb-2"
//         >
//           <a href={item.path} className="group block">
//             <p className="text-xs font-medium text-gray-500 mb-1">
//               {item.date}
//             </p>
//             <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 leading-snug">
//               {item.title}
//             </p>
//           </a>
//         </div>
//       ))}
//     </div>
//   </div>

//   <a
//     href="#"
//     className="inline-flex items-center mt-2 font-bold text-red-700 hover:text-red-800 transition-colors text-sm flex-shrink-0"
//   >
//     View More
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-4 w-4 ml-1"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 5l7 7-7 7"
//       />
//     </svg>
//   </a>
// </div>


//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default About;




// import React from 'react';
// import { useContext } from 'react';
// import { StoreContext } from '../storeContext/StoreContext';

// const About: React.FC = () => {
//   const { announcementList } = useContext(StoreContext);
//   const announcements = announcementList || [];
  
//   // Only duplicate if we have many announcements for scrolling effect
//   const shouldScroll = announcements.length > 5;
//   const extendedAnnouncements = shouldScroll ? [...announcements, ...announcements] : announcements;

//   return (
//     <>
//       <style>
//         {`
//           @keyframes scroll-vertical {
//             0% {
//               transform: translateY(0);
//             }
//             100% {
//               transform: translateY(-50%);
//             }
//           }
//           .animate-scroll-vertical {
//             display: inline-block;
//             animation: scroll-vertical 20s linear infinite;
//           }
//           .animate-scroll-vertical.paused {
//             animation-play-state: paused;
//           }
//           .no-scroll {
//             transform: none;
//             animation: none;
//           }
//         `}
//       </style>

//       <section className="bg-gray-50 pt-6 sm:pt-8 pb-6 sm:pb-8">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
//             {/* LEFT Column: About VIIT */}
//             <div className="lg:w-[40%] flex-shrink-0">
//               <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
//                 About VIIT
//               </h2>
//               <div className="max-w-xl">
//                 <div className="mb-8">
//                   <div className="aspect-video w-full rounded-md overflow-hidden shadow-xl border border-gray-200">
//                     <iframe
//                       width="100%"
//                       height="100%"
//                       src="https://www.youtube.com/embed/DqCDVElxaL8?si=JLtRG1XN-S7uFbKG&autoplay=1&mute=1"
//                       title="Vignan (VIIT) College Video"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                       referrerPolicy="strict-origin-when-cross-origin"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//                 <p className="text-base text-gray-700 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
//                   Vignan's Institute of Information Technology (VIIT) has been a forerunner in delivering quality education. Consistently ranked among the top educational institutes in the country, the Vignan group of institutions have had a proud tradition of pursuing knowledge and excellence. In keeping with this tradition, the leadership at VIIT resonates a dynamic blend of academic initiative and industry partnership with a vision of creating one of the finest academic destinations in the world.
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT Column: Announcements */}
//             <div className="lg:w-[60%] flex flex-col min-h-0">
//               <h2
//                 className="text-2xl font-bold text-gray-900 tracking-tight mb-6 flex-shrink-0"
//                 style={{ fontFamily: 'Georgia, serif' }}
//               >
//                 ANNOUNCEMENTS
//               </h2>

//               {/* Flexible announcements container */}
//               <div className="flex flex-col flex-1">
//                 {announcements.length === 0 ? (
//                   <div className="text-gray-500 text-center py-8">
//                     No announcements available
//                   </div>
//                 ) : (
//                   <>
//                     {/* Announcements list - flexible height based on content */}
//                     <div className={`${shouldScroll ? 'overflow-hidden flex-1' : 'flex-1'} relative`}>
//                       <div className={`space-y-4 ${shouldScroll ? 'animate-scroll-vertical' : 'no-scroll'}`}>
//                         {extendedAnnouncements.map((item, index) => (
//                           <div
//                             key={index}
//                             className="border-b border-gray-300 pb-3"
//                           >
//                             <a href={item.path} className="group block">
//                               <p className="text-xs font-medium text-gray-500 mb-1">
//                                 {item.date}
//                               </p>
//                               <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 leading-snug">
//                                 {item.title}
//                               </p>
//                             </a>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* View More button - always appears right after announcements */}
//                     <div className="flex-shrink-0 pt-0">
//                       <a
//                         href="#"
//                         className="inline-flex items-center font-bold text-red-700 hover:text-red-800 transition-colors text-sm"
//                       >
//                         View More
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 ml-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </a>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default About;




// import React from 'react';
// import { useContext } from 'react';
// import { StoreContext } from '../storeContext/StoreContext';

// const About: React.FC = () => {
//   const { announcementList } = useContext(StoreContext);
//   const announcements = announcementList || [];
  
//   // Only duplicate if we have many announcements for scrolling effect
//   const shouldScroll = announcements.length > 5;
//   const extendedAnnouncements = shouldScroll ? [...announcements, ...announcements] : announcements;

//   return (
//     <>
//       <style>
//         {`
//           @keyframes scroll-vertical {
//             0% {
//               transform: translateY(0);
//             }
//             100% {
//               transform: translateY(-50%);
//             }
//           }
//           .animate-scroll-vertical {
//             display: inline-block;
//             animation: scroll-vertical 20s linear infinite;
//           }
//           .animate-scroll-vertical.paused {
//             animation-play-state: paused;
//           }
//           .no-scroll {
//             transform: none;
//             animation: none;
//           }
//         `}
//       </style>

//       <section className="bg-gray-50 pt-6 sm:pt-8 pb-6 sm:pb-8">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
//             {/* LEFT Column: About VIIT */}
//             <div className="lg:w-[40%] flex-shrink-0">
//               <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
//                 About VIIT
//               </h2>
//               <div className="max-w-xl">
//                 <div className="mb-8">
//                   <div className="aspect-video w-full rounded-md overflow-hidden shadow-xl border border-gray-200">
//                     <iframe
//                       width="100%"
//                       height="100%"
//                       src="https://www.youtube.com/embed/DqCDVElxaL8?si=JLtRG1XN-S7uFbKG&autoplay=1&mute=1"
//                       title="Vignan (VIIT) College Video"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                       referrerPolicy="strict-origin-when-cross-origin"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//                 <p className="text-base text-gray-700 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
//                   Vignan's Institute of Information Technology (VIIT) has been a forerunner in delivering quality education. Consistently ranked among the top educational institutes in the country, the Vignan group of institutions have had a proud tradition of pursuing knowledge and excellence. In keeping with this tradition, the leadership at VIIT resonates a dynamic blend of academic initiative and industry partnership with a vision of creating one of the finest academic destinations in the world.
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT Column: Announcements - Fixed Height Container */}
//             <div className="lg:w-[60%] flex flex-col">
//               <h2
//                 className="text-2xl font-bold text-gray-900 tracking-tight mb-6 flex-shrink-0"
//                 style={{ fontFamily: 'Georgia, serif' }}
//               >
//                 ANNOUNCEMENTS
//               </h2>

//               {/* Fixed height container to match About section */}
//               <div className="flex flex-col justify-between h-[500px] lg:h-[600px]"> {/* Adjust height as needed */}
//                 {announcements.length === 0 ? (
//                   <div className="text-gray-500 text-center py-8 flex-1 flex items-center justify-center">
//                     No announcements available
//                   </div>
//                 ) : (
//                   <>
//                     {/* Announcements list - takes available space but limited */}
//                     <div className={`${shouldScroll ? 'overflow-hidden' : ''} flex-1`}>
//                       <div className={`space-y-4 ${shouldScroll ? 'animate-scroll-vertical' : 'no-scroll'}`}>
//                         {(shouldScroll ? extendedAnnouncements : announcements).map((item, index) => (
//                           <div
//                             key={index}
//                             className="border-b border-gray-300 pb-3"
//                           >
//                             <a href={item.path} className="group block">
//                               <p className="text-xs font-medium text-gray-500 mb-1">
//                                 {item.date}
//                               </p>
//                               <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 leading-snug">
//                                 {item.title}
//                               </p>
//                             </a>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* View More button - always at bottom of container */}
//                     <div className="flex-shrink-0 pt-4 mt-auto">
//                       <a
//                         href="#"
//                         className="inline-flex items-center font-bold text-red-700 hover:text-red-800 transition-colors text-sm"
//                       >
//                         View More
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 ml-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </a>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default About;


import React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../storeContext/StoreContext';

const About: React.FC = () => {
  const { announcementList } = useContext(StoreContext);
  const announcements = announcementList || [];
  
  // Only duplicate if we have many announcements for scrolling effect
  const shouldScroll = announcements.length > 5;
  const extendedAnnouncements = shouldScroll ? [...announcements, ...announcements] : announcements;

  return (
    <>
      <style>
        {`
          @keyframes scroll-vertical {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          .animate-scroll-vertical {
            display: inline-block;
            animation: scroll-vertical 20s linear infinite;
          }
          .animate-scroll-vertical.paused {
            animation-play-state: paused;
          }
          .no-scroll {
            transform: none;
            animation: none;
          }
        `}
      </style>

      <section className="bg-gray-50 pt-6 sm:pt-8 pb-6 sm:pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* LEFT Column: About VIIT */}
            <div className="lg:w-[40%] flex-shrink-0">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                About VIIT
              </h2>
              <div className="max-w-xl">
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
                <p className="text-base text-gray-700 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
                  Vignan's Institute of Information Technology (VIIT) has been a forerunner in delivering quality education. Consistently ranked among the top educational institutes in the country, the Vignan group of institutions have had a proud tradition of pursuing knowledge and excellence. In keeping with this tradition, the leadership at VIIT resonates a dynamic blend of academic initiative and industry partnership with a vision of creating one of the finest academic destinations in the world.
                </p>
              </div>
            </div>

            {/* RIGHT Column: Announcements - Fixed Height Container */}
            <div className="lg:w-[60%] flex flex-col">
              <h2
                className="text-2xl font-bold text-gray-900 tracking-tight mb-6 flex-shrink-0"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                ANNOUNCEMENTS
              </h2>

              {/* Fixed height container to match About section */}
              <div className="flex flex-col justify-between h-[350px] lg:h-[450px]"> {/* Reduced height */}
                {announcements.length === 0 ? (
                  <div className="text-gray-500 text-center py-8 flex-1 flex items-center justify-center">
                    No announcements available
                  </div>
                ) : (
                  <>
                    {/* Announcements list - takes available space but limited */}
                    <div className={`${shouldScroll ? 'overflow-hidden' : ''} flex-1`}>
                      <div className={`space-y-4 ${shouldScroll ? 'animate-scroll-vertical' : 'no-scroll'}`}>
                        {(shouldScroll ? extendedAnnouncements : announcements).map((item, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-300 pb-3"
                          >
                            <a href={item.path} className="group block">
                              <p className="text-xs font-medium text-gray-500 mb-1">
                                {item.date}
                              </p>
                              <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 leading-snug">
                                {item.title}
                              </p>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View More button - always at bottom of container */}
                    <div className="flex-shrink-0 pt-4 mt-auto">
                      <a
                        href="#"
                        className="inline-flex items-center font-bold text-red-700 hover:text-red-800 transition-colors text-sm"
                      >
                        View More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;