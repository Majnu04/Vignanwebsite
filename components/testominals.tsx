import React from 'react';

// --- Data for VIIT, Vizag ---
const testimonials = [
  {
    id: 1,
    name: "Kiran Kumar S.",
    details: "B.Tech, Computer Science",
    quote: "VIIT's focus on industry-aligned curriculum and hands-on labs was a game-changer. The placement cell provided exceptional training that helped me secure a position at Amazon."
  },
  {
    id: 2,
    name: "Anusha Chowdary",
    details: "B.Tech, Electronics & Communication",
    quote: "The project-based learning approach at VIIT gave me a significant edge. The mentorship from faculty for our projects prepared me for the real-world engineering challenges I now tackle daily at Infosys."
  },
  {
    id: 3,
    name: "Prakash Varma",
    details: "B.E., Mechanical Engineering",
    quote: "Vignan's industry partnerships provided invaluable internship opportunities. The practical skills and professional network I built were key to starting my career at Tata Consultancy Services."
  },
  {
    id: 4,
    name: "Lakshmi Priya",
    details: "B.Tech, Information Technology",
    quote: "The vibrant campus life and the innovation hub at VIIT fostered my creative thinking. The skills I developed have been crucial for my success in my current role at Cognizant."
  },
  {
    id: 5,
    name: "Rahul Reddy",
    details: "M.Tech, Software Engineering",
    quote: "The advanced curriculum and research opportunities at VIIT were incredible. The faculty are experts in their fields and their guidance was instrumental in my placement at Google."
  },
  {
    id: 6,
    name: "Sneha G.",
    details: "B.Tech, Civil Engineering",
    quote: "It was a great experience studying at VIIT, a memory to cherish for a lifetime. The entire faculty and department leaves no stone unturned to shape one's future."
  }
];

// --- The Testimonials Component (with Ultra-Smooth CSS Animation) ---
const Testimonials: React.FC = () => {

  // We duplicate the testimonials to create a seamless loop for the animation
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <>

      {/* Section using your website's background color */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24 w-full overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Section Title using your website's text color */}
          <div className="text-left mb-12">
            <h2 className="text-4xl mt-0 md:text-5xl font-bold text-[#212529]">
              What our Students say...
            </h2>
          </div>

          {/* 
            The 'group' class allows us to pause the animation on hover.
            When you hover this container, the child with 'group-hover:animate-pause' will pause.
          */}
          <div className="group flex overflow-hidden">
            {/* This is the track that will be animated */}
            <div className="flex-shrink-0 flex items-stretch animate-scroll group-hover:animate-pause">
              {/* We map over the extended array to render the cards */}
              {extendedTestimonials.map((testimonial, i) => (
                <div key={i} className="flex-shrink-0 w-[90vw] md:w-[33vw] lg:w-[30vw] px-3">
                  {/* Card Styling */}
                  <div className="h-full bg-white rounded-lg p-6 flex flex-col justify-between shadow-sm border border-gray-200">
                    <p className="text-[#212529] text-lg italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="text-right mt-4">
                      <p className="font-bold text-[#212529]">{testimonial.name}</p>
                      <p className="text-sm text-[#6c757d]">{testimonial.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;