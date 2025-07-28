
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutT = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-2">
        <button
          onClick={() => navigate(-1)}
          className="mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          ← Back
        </button>
      </div>
      <section className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Career Guidance, Training & Placement Cell (CGTPC)
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Fostering Futures, Building Careers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
          
          <div className="order-2 lg:order-1 text-center">
            <img
              src="https://vignaniit.edu.in/images/t&p.jpg"
              alt="Students participating in a placement session"
              className="max-w-lg mx-auto h-auto rounded-lg shadow-xl object-cover"
            />
            
            <div className="mt-2">
              <h4 className="text-2xl font-semibold">Dr. B. Prasad</h4>
              <p className="mt-1 text-gray-600 text-lg">Dean – Training and Placements</p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold mb-2">Welcome to CGTPC</h2>
              <p className="mb-2 leading-relaxed">
                With a growing number of students pursuing various courses at Vignan's Institute of Information Technology, Visakhapatnam, the Career Guidance, Training & Placement Cell (CGTPC) is dedicated to bridging the gap between students and industry by organizing campus recruitment drives and career development programs.
              </p>
              <p className="leading-relaxed">
                The cell is led by a dedicated Training & Placement Officer, supported by departmental coordinators and student representatives. We take pride in offering seamless logistics and warm hospitality to visiting HR teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">Our Comprehensive Approach</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The CGTPC actively provides industry-aligned training to students, including Communication Skills, Technical and General Aptitude, Personality Development, Group Discussions, and more. Through continuous engagement with experts, the cell enhances student readiness and facilitates placement in national and multinational companies.
          </p>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white p-10 rounded-xl shadow-md">
          <h3 className="text-3xl font-bold text-center mb-4">
            Objectives of the Department
          </h3>
          <ul className="space-y-6">
            {[
              'Provide ample opportunities for placement of students to achieve cent percent placements.',
              'Manage centralized placement activities for all courses.',
              'Organize campus recruitment for students with national and multinational companies.',
              'Prepare students for campus recruitment through training in aptitude, group discussions, and interview techniques.',
              'Promote career counseling via guest lectures by industry professionals and alumni.'
            ].map((objective, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-600 flex-shrink-0 mt-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
                <p className="ml-3 text-gray-700">{objective}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      
    </div>
  );
};

export default AboutT;