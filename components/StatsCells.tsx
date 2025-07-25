import React from 'react';

const FirstRowCellsData = [
  { name: 'Discipline Cell', image: '/images/cells/discipline.jpg' },
  { name: 'ED Cell', image: '/images/cells/ed-cell.jpg' },
  { name: 'Green Club', image: '/images/cells/green-club.jpg' },
  { name: 'Idea Lab', image: '/images/cells/idea-lab.jpg' },
  { name: 'IIC Cell', image: '/images/cells/iic-cell.jpg' },
  { name: 'IPR Cell', image: '/images/cells/ipr-cell.jpg' },
  { name: 'Intl. Student Cell', image: '/images/cells/international.jpg' },
];

const SecondRowCellsData = [
  { name: 'IEEE Chapter', image: '/images/cells/ieee.jpg' },
  { name: 'Media Cell', image: '/images/cells/media.jpg' },
  { name: 'NSS Unit', image: '/images/cells/nss.jpg' },
  { name: 'Research Cell', image: '/images/cells/research.jpg' },
  { name: 'Skill Development Lab', image: '/images/cells/skill-lab.jpg' },
  { name: 'Student Activity Council', image: '/images/cells/sac.jpg' },
  { name: 'WEP Cell', image: '/images/cells/wep-cell.jpg' },
];

const CellCard: React.FC<{ cell: { name: string; image: string } }> = ({ cell }) => (
  <div className="relative w-64 h-80 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg group cursor-pointer">
    <img
      src={cell.image}
      alt={cell.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
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

        .marquee-left {
          animation-name: scrollLeft;
          animation-duration: 40s;
        }

        .marquee-right {
          animation-name: scrollRight;
          animation-duration: 40s;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(50%); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-5xl font-bold text-gray-900 tracking-tight text-left font-serif">
          Our Cells & Councils
        </h2>
        <p className="mt-4 text-lg text-gray-700 text-left">
          Fostering innovation, leadership, and community engagement.
        </p>
      </div>

      {/* First Row - Right Scroll */}
      <div className="relative overflow-hidden w-full mb-5">
        <div className="marquee-right hover:[animation-play-state:paused]">
          {[...FirstRowCellsData, ...FirstRowCellsData].map((cell, index) => (
            <div key={index} className="mx-4">
              <CellCard cell={cell} />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 h-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Second Row - Left Scroll */}
      <div className="relative overflow-hidden w-full">
        <div className="marquee-left hover:[animation-play-state:paused]">
          {[...SecondRowCellsData, ...SecondRowCellsData].map((cell, index) => (
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