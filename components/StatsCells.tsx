import React from 'react';

const FirstRowCellsData = [
  {
    name: 'Discipline Cell',
    image: 'https://images.unsplash.com/photo-1591012911203-ec848605a3cc?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'ED Cell',
    image: 'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Green Club',
    image: 'https://images.unsplash.com/photo-1565118537953-2ad67f2ebf91?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Idea Lab',
    image: 'https://source.unsplash.com/featured/800x600/?innovation,ideas,workspace'
  },
  {
    name: 'IIC Cell',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'IPR Cell',
    image: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Intl. Student Cell',
    image: 'https://source.unsplash.com/featured/800x600/?students,group'
  },
  {
    name: 'IEEE Chapter',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Media Cell',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'NSS Unit',
    image: 'https://images.unsplash.com/photo-1516589178585-4ad534dce0af?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Research Cell',
    image: 'https://images.unsplash.com/photo-1532074205216-532a185fbd0c?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Skill Development Lab',
    image: 'https://images.unsplash.com/photo-1522202228336-8b2c58a8cd4d?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Student Activity Council',
    image: 'https://images.unsplash.com/photo-1496154706309-f9bf9e8a99f2?auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'WEP Cell',
    image: 'https://images.unsplash.com/photo-1503642551026-6d9042e1c94f?auto=format&fit=crop&w=800&q=60'
  },
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


        .marquee-right {
          animation-name: scrollRight;
          animation-duration: 40s;
        }

        

        @keyframes scrollRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 mt-10">
        <h2 className="text-5xl font-bold text-center text-gray-900 tracking-tight text-left font-serif">
          Our Cells & Councils
        </h2>
        <p className="mt-5 text-lg text-gray-700 text-left">
          Fostering innovation, leadership, and community engagement.
        </p>
      </div>

      {/* First Row - Right Scroll */}
      <div className="relative overflow-hidden w-full h-[90vh] mb-4 ">
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
    </section>
  );
};

export default StatsCells;