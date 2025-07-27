import React from 'react';
import ImageWithFallback from './ImageWithFallback';

const FirstRowCellsData = [
  {
    name: 'Discipline Cell',
    image: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzY2lwbGluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'ED Cell',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW50cmVwcmVuZXVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Green Club',
    image: 'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Idea Lab',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWRlYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'IIC Cell',
    image: 'https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5ub3ZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'IPR Cell',
    image: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGF0ZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Intl. Student Cell',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW50ZXJuYXRpb25hbCUyMHN0dWRlbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'IEEE Chapter',
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Media Cell',
    image: 'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'NSS Unit',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5JTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Research Cell',
    image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzZWFyY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Skill Development Lab',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2tpbGxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Student Activity Council',
    image: 'https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3R1ZGVudCUyMGFjdGl2aXRpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'WEP Cell',
    image: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwZW1wb3dlcm1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'
  },
];



const CellCard: React.FC<{ cell: { name: string; image: string } }> = ({ cell }) => (
  <div className="relative w-64 h-80 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg group cursor-pointer">
    <ImageWithFallback
      src={cell.image}
      alt={cell.name}
      fallbackCategory="cells"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      objectFit="cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1730]/90 via-[#0f1730]/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className="text-xl font-bold text-white drop-shadow-md">{cell.name}</h3>
    </div>
  </div>
);

const StatsCells: React.FC = () => {
  return (
    <section className="bg-white pt-0 pb-20 sm:pb-28 relative">
      <style>{`
        .marquee-left, .marquee-right {
          display: flex;
          width: max-content;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marquee-right {
          animation-name: scrollRight;
          animation-duration: 60s;
        }

        @keyframes scrollRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 mt-10">
        <h2 className="text-5xl font-bold text-center text-gray-900 tracking-tight font-serif">
          Our Cells & Councils
        </h2>
        <p className="mt-5 text-lg text-gray-700 text-center">
          Fostering innovation, leadership, and community engagement.
        </p>
      </div>

      {/* First Row - Right Scroll */}
      <div className="relative overflow-hidden w-full h-[400px] mb-4">
        <div className="marquee-right hover:[animation-play-state:paused]">
          {[...FirstRowCellsData, ...FirstRowCellsData].map((cell, index) => (
            <div key={index} className="mx-4">
              <CellCard cell={cell} />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default StatsCells;